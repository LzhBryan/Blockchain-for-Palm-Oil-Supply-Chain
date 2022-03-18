const TransactionModel = require("../models/transaction")
const UserModel = require("../models/user")
const BlockModel = require("../models/block")
const { NotFoundError, BadRequestError } = require("../errors")
const EC = require("elliptic").ec
const ec = new EC("secp256k1")
const { createHash } = require("crypto")
const CONSENSUS_THRESHOLD = 0.66
const MAX_RECORD = 2

const getPendingTransactions = async (req, res) => {
  // const { username } = req.user

  // const transactions = await TransactionModel.find({
  //   status: "Pending",
  //   approvedBy: { $ne: username },
  //   rejectedBy: { $ne: username },
  // })
  const transactions = await TransactionModel.find({})
  res.status(200).json({ transactions })
}

const getTransaction = async (req, res) => {
  const { id: transactionID } = req.params

  const transaction = await TransactionModel.findOne({ _id: transactionID })
  if (!transaction) {
    throw new NotFoundError(`No transaction with id ${transactionID}`)
  }

  res.status(200).json({ transaction })
}

const createTransactions = async (req, res) => {
  const { fromAddress: from, privateKey, toAddress: to, amount } = req.body

  const key = ec.keyFromPrivate(privateKey)
  const timestamp = new Date().toLocaleString("en-GB")

  req.body.createdBy = req.user.username
  req.body.timestamp = timestamp
  req.body.signature = signTransaction(key, from, to, amount, timestamp)

  const transaction = await TransactionModel.create(req.body)
  res.status(201).json({ transaction })
}

const validateTransaction = async (req, res) => {
  const { id: transactionID } = req.params

  const transaction = await TransactionModel.findOne({ _id: transactionID })
  if (!transaction) {
    throw new NotFoundError(`No transaction with id ${transactionID}`)
  }

  const isValid = checkTransactionValidity(transaction)
  res.status(200).json({ isValid })
}

const approveTransaction = async (req, res) => {
  const { id: transactionID } = req.params
  const { isApproved } = req.body
  const { username } = req.user

  // check if validators approved before
  const approveBefore = await TransactionModel.findOne({
    $and: [
      { _id: transactionID },
      { $or: [{ approvedBy: username }, { rejectedBy: username }] },
    ],
  })

  if (approveBefore) {
    throw new BadRequestError("You have rejected or approved this transaction")
  }

  let transaction = await TransactionModel.findOneAndUpdate(
    { _id: transactionID },
    {
      $addToSet: isApproved
        ? { approvedBy: username }
        : { rejectedBy: username },
    },
    { new: true }
  )

  if (!transaction) {
    throw new NotFoundError(`No transaction with id ${transactionID}`)
  }

  transaction = await transactionConsensus(transaction, transactionID)

  let message
  isApproved
    ? (message = "You have approved this transaction")
    : (message = "You have rejected this transaction")

  res.status(200).json({ msg: message, transaction })
}

function computeTransactionHash(fromAddress, toAddress, amount, timestamp) {
  return createHash("sha256")
    .update(fromAddress + toAddress + amount.toString() + timestamp)
    .digest("hex")
}

function signTransaction(
  signingKey,
  fromAddress,
  toAddress,
  amount,
  timestamp
) {
  if (signingKey.getPublic("hex") !== fromAddress) {
    throw new BadRequestError("Private and Public key do not match!")
  }

  const hashTx = computeTransactionHash(
    fromAddress,
    toAddress,
    amount,
    timestamp
  )
  const sign = signingKey.sign(hashTx, "base64")
  return sign.toDER("hex")
}

function checkTransactionValidity(transaction) {
  const {
    fromAddress: from,
    toAddress: to,
    amount,
    timestamp,
    signature,
  } = transaction

  if (!signature || signature.length === 0) {
    throw new BadRequestError("No signature in this transaction")
  }

  const publicKey = ec.keyFromPublic(from, "hex")
  return publicKey.verify(
    computeTransactionHash(from, to, amount, timestamp),
    signature
  )
}

async function transactionConsensus(transaction, id) {
  // only do consensus if consensus have not reached
  if (transaction.status === "Pending") {
    const validators = await UserModel.find({ role: "Validator" })

    const approvedPercentage =
      transaction.approvedBy.length / parseFloat(validators.length)

    const rejectedPercentage =
      transaction.rejectedBy.length / parseFloat(validators.length)

    if (approvedPercentage >= CONSENSUS_THRESHOLD) {
      transaction = await TransactionModel.findOneAndUpdate(
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
          transaction = await TransactionModel.findOneAndUpdate(
            { _id: id },
            { status: "inBlock" },
            { new: true }
          )
          await hibernatingBlock.updateOne({
            $addToSet: { records: transaction },
            timestamp: new Date().toLocaleString("en-GB"),
          })
        }
      }
    } else if (rejectedPercentage >= CONSENSUS_THRESHOLD) {
      transaction = await TransactionModel.findOneAndUpdate(
        { _id: id },
        { status: "Rejected" },
        { new: true }
      )
    }
    return transaction
  }
}

module.exports = {
  getPendingTransactions,
  getTransaction,
  createTransactions,
  validateTransaction,
  approveTransaction,
  computeTransactionHash,
  checkTransactionValidity,
}
