const SupplyChainModel = require("../models/supplychain")
const UserModel = require("../models/user")
const BlockModel = require("../models/block")
const TransactionModel = require("../models/transaction")
const ProductModel = require("../models/product")
const { NotFoundError, BadRequestError } = require("../errors")
const EC = require("elliptic").ec
const ec = new EC("secp256k1")
const { createHash } = require("crypto")
const CONSENSUS_THRESHOLD = 0.66
const MAX_RECORD = 2

const getPendingRecords = async (req, res) => {
  const { username } = req.user

  const records = await SupplyChainModel.find({
    status: "Pending",
    approvedBy: { $ne: username },
    rejectedBy: { $ne: username },
  })
  res.status(200).json({ records })
}

const getRecord = async (req, res) => {
  const { id: recordID } = req.params

  const record = await SupplyChainModel.findOne({ _id: recordID })
  if (!record) {
    throw new NotFoundError(`No supply-chain record with id ${recordID}`)
  }

  res.status(200).json({ record })
}

const getPreviousBatches = async (req, res) => {
  const { role } = req.user

  let previousBatches = []

  if (role === "Miller") {
    previousBatches = await SupplyChainModel.find({
      $and: [
        { batchId: /^PL/ },
        {
          $or: [
            { status: "Approved" },
            { status: "inBlock" },
            { status: "inChain" },
          ],
        },
      ],
    })
  } else if (role === "Refiner") {
    previousBatches = await SupplyChainModel.find({
      $and: [
        { batchId: /^MI/ },
        {
          $or: [
            { status: "Approved" },
            { status: "inBlock" },
            { status: "inChain" },
          ],
        },
      ],
    })
  } else if (role === "WarehouseManager") {
    previousBatches = await SupplyChainModel.find({
      $and: [
        { batchId: /^RE/ },
        {
          $or: [
            { status: "Approved" },
            { status: "inBlock" },
            { status: "inChain" },
          ],
        },
      ],
    })
  } else if (role === "Retailer") {
    previousBatches = await SupplyChainModel.find({
      $and: [
        { batchId: /^WA/ },
        {
          $or: [
            { status: "Approved" },
            { status: "inBlock" },
            { status: "inChain" },
          ],
        },
      ],
    })
  }

  let filteredPreviousBatches = []

  for (batch of previousBatches) {
    const alreadyBeenUsed = await SupplyChainModel.findOne({
      previousBatchId: batch.batchId,
    })

    if (!alreadyBeenUsed) {
      filteredPreviousBatches.push(batch)
    }
  }

  res.status(200).json({ filteredPreviousBatches })
}

const createRecord = async (req, res) => {
  const {
    fromAddress,
    privateKey,
    toAddress,
    products,
    prevBatchId,
    transactionId,
  } = req.body
  const { role, username } = req.user

  const sender = await UserModel.findOne({ publicKey: fromAddress })
  const receiver = await UserModel.findOne({ publicKey: toAddress })

  if (!sender) {
    throw new BadRequestError(
      "The public key for sender address is not recognized"
    )
  }

  if (sender.username !== username) {
    throw new BadRequestError("You are not using your own pair of keys")
  }

  if (!receiver) {
    throw new BadRequestError(`There's no user with the address ${to}`)
  }

  if (receiver.role === "Validator") {
    throw new BadRequestError(
      "Validators do not participate in supply-chain related activities"
    )
  }

  const transactionReceipt = await TransactionModel.findOne({
    _id: transactionId,
  })

  if (!transactionReceipt) {
    throw new NotFoundError("Transaction receipt cannot be found")
  }

  if (transactionReceipt.status == "Pending") {
    throw new BadRequestError("This transaction receipt hasn't been approved")
  } else if (transactionReceipt.status == "Rejected") {
    throw new BadRequestError("This transaction receipt is invalid")
  }

  //Only planter is allowed to have a null previous batch ID
  if (role !== "Planter") {
    const previousBatch = await SupplyChainModel.findOne({
      batchId: prevBatchId,
    })

    if (!previousBatch) {
      throw new NotFoundError("The previous batch ID cannot be found")
    }

    if (previousBatch.status === "Rejected") {
      throw new BadRequestError("Invalid previous batch ID")
    }
  }

  const key = ec.keyFromPrivate(privateKey)
  const batchID = await SupplyChainModel.collection.countDocuments()
  const batchId = role.substring(0, 2).toUpperCase() + batchID
  const timestamp = new Date().toLocaleString("en-GB")
  req.body.products = products
  req.body.batchId = batchId
  req.body.previousBatchId = prevBatchId
  req.body.transactionReceipt = transactionId
  req.body.timestamp = timestamp
  req.body.signature = signRecord(
    key,
    fromAddress,
    toAddress,
    products,
    batchId,
    prevBatchId,
    transactionId,
    timestamp
  )
  req.body.createdBy = username

  const record = await SupplyChainModel.create(req.body)
  res
    .status(201)
    .json({ msg: "Supply-chain record is created successfully", record })
}

const validateRecord = async (req, res) => {
  const { id: recordID } = req.params

  const record = await SupplyChainModel.findOne({ _id: recordID })
  if (!record) {
    throw new NotFoundError(`No supply-chain record with id ${recordID}`)
  }

  const isValid = checkRecordValidity(record)
  res.status(200).json({ isValid })
}

const approveRecord = async (req, res) => {
  const { id: recordID } = req.params
  const { isApproved } = req.body
  const { username } = req.user

  // check if validators approved before
  const approveBefore = await SupplyChainModel.findOne({
    $and: [
      { _id: recordID },
      { $or: [{ approvedBy: username }, { rejectedBy: username }] },
    ],
  })

  if (approveBefore) {
    throw new BadRequestError(
      "Already rejected or approved this supply-chain record"
    )
  }

  let record = await SupplyChainModel.findOneAndUpdate(
    { _id: recordID },
    {
      $addToSet: isApproved
        ? { approvedBy: username }
        : { rejectedBy: username },
    },
    { new: true }
  )

  if (!record) {
    throw new NotFoundError(`No supply-chain record with id ${recordID}`)
  }

  record = await recordConsensus(record, recordID)

  let message
  isApproved
    ? (message = "You have approved this supply-chain record")
    : (message = "You have rejected this supply-chain record")

  if (record.batchId.substring(0, 2) === "WA") {
    if (record.status === "Approved" || record.status === "inBlock") {
      for (i = 0; i < record.products.length; i++) {
        for (j = 0; j < record.products[i].quantity; j++) {
          await ProductModel.create({
            productName: record.products[i].name,
            productId: await ProductModel.collection.countDocuments(),
            prevBatchId: record.batchId,
            timestamp: new Date().toLocaleString("en-GB"),
          })
        }
      }
    }
  }

  res.status(200).json({ msg: message, transaction: record })
}

function signRecord(
  signingKey,
  fromAddress,
  toAddress,
  product,
  batchId,
  prevBatchId,
  transactionReceipt,
  timestamp
) {
  if (signingKey.getPublic("hex") !== fromAddress) {
    throw new BadRequestError("Private and Public key do not match!")
  }

  const hashRecord = computeRecordHash(
    fromAddress,
    toAddress,
    product,
    batchId,
    prevBatchId,
    transactionReceipt,
    timestamp
  )
  const sign = signingKey.sign(hashRecord, "base64")
  return sign.toDER("hex")
}

function computeRecordHash(
  fromAddress,
  toAddress,
  products,
  batchId,
  prevBatchId,
  transactionReceipt,
  timestamp
) {
  return createHash("sha256")
    .update(
      fromAddress +
        toAddress +
        JSON.stringify(products) +
        batchId +
        prevBatchId +
        transactionReceipt +
        timestamp
    )
    .digest("hex")
}

function checkRecordValidity(record) {
  const {
    fromAddress,
    toAddress,
    products,
    batchId,
    previousBatchId,
    transactionReceipt,
    timestamp,
    signature,
  } = record

  const parsedTransactionReceipt = transactionReceipt.toString().match([])
  const transactionReceiptId = parsedTransactionReceipt.input

  if (!signature || signature.length === 0) {
    throw new BadRequestError("No signature in this supply-chain record")
  }

  const publicKey = ec.keyFromPublic(fromAddress, "hex")
  return publicKey.verify(
    computeRecordHash(
      fromAddress,
      toAddress,
      products,
      batchId,
      previousBatchId,
      transactionReceiptId,
      timestamp
    ),
    signature
  )
}

async function recordConsensus(record, id) {
  // only do consensus if consensus have not reached
  if (record.status === "Pending") {
    const validators = await UserModel.find({ role: "Validator" })

    const approvedPercentage =
      record.approvedBy.length / parseFloat(validators.length)

    const rejectedPercentage =
      record.rejectedBy.length / parseFloat(validators.length)

    if (approvedPercentage >= CONSENSUS_THRESHOLD) {
      record = await SupplyChainModel.findOneAndUpdate(
        { _id: id },
        { status: "Approved" },
        { new: true }
      )

      const hibernatingBlock = await BlockModel.findOne({
        status: "Hibernating",
      })

      // only push records to hibernating block, not pending block
      if (hibernatingBlock) {
        if (hibernatingBlock.records.length < MAX_RECORD) {
          record = await SupplyChainModel.findOneAndUpdate(
            { _id: id },
            { status: "inBlock" },
            { new: true }
          )
          await hibernatingBlock.updateOne({
            $addToSet: { records: record },
            timestamp: new Date().toLocaleString("en-GB"),
          })
        }
      }
    } else if (rejectedPercentage >= CONSENSUS_THRESHOLD) {
      record = await SupplyChainModel.findOneAndUpdate(
        { _id: id },
        { status: "Rejected" },
        { new: true }
      )
    }
    return record
  }
}

module.exports = {
  getPendingRecords,
  getRecord,
  getPreviousBatches,
  createRecord,
  validateRecord,
  approveRecord,
  checkRecordValidity,
  computeRecordHash,
}
