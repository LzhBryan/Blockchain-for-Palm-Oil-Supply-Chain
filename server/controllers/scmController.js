const SupplyChainModel = require("../models/supplychain")
const UserModel = require("../models/user")
const BlockModel = require("../models/block")
const TransactionModel = require("../models/transaction")
const ApprovedRecordModel = require("../models/approvedRecord")
const ProductModel = require("../models/product")
const { NotFoundError, BadRequestError } = require("../errors")
const EC = require("elliptic").ec
const ec = new EC("secp256k1")
const { createHash } = require("crypto")
const CONSENSUS_THRESHOLD = 0.66
const MAX_RECORD = 2

const getAllRecords = async (req, res) => {
  const records = await SupplyChainModel.find({})
  res.status(200).json({ Records: records })
}

const createRecord = async (req, res) => {
  const { from, privateKey, to, product, prevBatchId, transactionID } = req.body
  const { role } = req.user

  const transactionReceipt = await TransactionModel.findOne({
    _id: transactionID,
  })

  if (!transactionReceipt) {
    throw new NotFoundError("Transaction receipt cannot be found")
  }
  if (transactionReceipt.status == "Pending") {
    throw new BadRequestError("This transaction hasn't been approved")
  } else if (transactionReceipt.status == "Rejected") {
    throw new BadRequestError("This transaction is invalid")
  }

  const previousBatchId = await SupplyChainModel.findOne({
    batchId: prevBatchId,
  })

  //Only planter is allowed to have a null previous batch ID
  if (role !== "Planter") {
    if (!previousBatchId) {
      throw new NotFoundError("The previous batch ID cannot be found")
    } else {
      //Previous supply chain record has been rejected
      if (previousBatchId.status === "Rejected") {
        throw new BadRequestError("Invalid previous batch ID")
      }
    }
  }

  const key = ec.keyFromPrivate(privateKey)
  const batchID = await SupplyChainModel.collection.countDocuments()
  const timestamp = new Date().toLocaleString("en-GB")

  const new_record = await SupplyChainModel.create({
    fromAddress: from,
    toAddress: to,
    product: product,
    batchId: role.substring(0, 2).toUpperCase() + batchID,
    previousBatchId: prevBatchId,
    transactionReceipt: transactionID,
    timestamp: timestamp,
    signature: signRecord(key, from, to, product, timestamp),
  })
  res.status(201).json({ msg: "Record is created successfully", new_record })
}

const validateRecord = async (req, res) => {
  const { id: recordID } = req.params

  const record = await SupplyChainModel.findOne({ _id: recordID })
  if (!record) {
    throw new NotFoundError(`No record with id ${recordID}`)
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
    throw new BadRequestError("Already rejected or approved this record")
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
    throw new NotFoundError(`No record with id ${recordID}`)
  }

  record = await recordConsensus(record, recordID)

  let message
  isApproved
    ? (message = "You have approved this transaction")
    : (message = "You have rejected this transaction")

  if (record.batchId.substring(0, 2) === "WA") {
    if (record.status === "Approved" || "inBlock") {
      for (i = 0; i < record.product.length; i++) {
        for (j = 0; j < record.product[i].quantity; j++) {
          await ProductModel.create({
            productName: record.product[i].name,
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

function signRecord(signingKey, fromAddress, toAddress, product, timestamp) {
  if (signingKey.getPublic("hex") !== fromAddress) {
    throw new BadRequestError("Private and Public key do not match!")
  }

  const hashTx = computeRecordHash(fromAddress, toAddress, product, timestamp)
  const sign = signingKey.sign(hashTx, "base64")
  return sign.toDER("hex")
}

function computeRecordHash(fromAddress, toAddress, product, timestamp) {
  return createHash("sha256")
    .update(fromAddress + toAddress + product.toString() + timestamp)
    .digest("hex")
}

function checkRecordValidity(record) {
  const {
    fromAddress: from,
    toAddress: to,
    product,
    timestamp,
    signature,
  } = record

  if (!signature || signature.length === 0) {
    throw new BadRequestError("No signature in this transaction")
  }

  const publicKey = ec.keyFromPublic(from, "hex")
  return publicKey.verify(
    computeTransactionHash(from, to, product, timestamp),
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
      } else {
        await ApprovedRecordModel.create({
          records: record,
        })
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
  getAllRecords,
  createRecord,
  validateRecord,
  approveRecord,
  checkRecordValidity,
  computeRecordHash,
}
