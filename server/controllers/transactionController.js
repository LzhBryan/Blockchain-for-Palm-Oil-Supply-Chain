const Transaction = require("../blockchain/transaction")
const TransactionModel = require("../models/transaction")
const User = require("../models/user")
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors")
const EC = require("elliptic").ec
const ec = new EC("secp256k1")
const CONSENSUS_THRESHOLD = 0.66

const getAllTransactions = async (req, res) => {
  // const { username, role } = req.user

  // if (role === "Validator") {
  //   const transactions = await TransactionModel.find({ status: "Pending" })
  //   res.status(200).json({ transactions })
  // } else {
  //   const transactions = await TransactionModel.find({ createdBy: username })
  //   res.status(200).json({ transactions })
  // }

  const transactions = await TransactionModel.find({})
  res.status(200).json({ transactions })

  // get all transactions history for a particular user
}

const createTransactions = async (req, res) => {
  const { from, privateKey, to, amount } = req.body
  const { username } = req.user

  const key = ec.keyFromPrivate(privateKey)
  const tx = new Transaction(from, to, amount)
  tx.createdBy = username
  tx.signTransaction(key)

  const transaction = await TransactionModel.create(tx)
  res.status(201).json({ transaction })
}

const getTransaction = async (req, res) => {
  const { id: transactionID } = req.params

  const transaction = await TransactionModel.findOne({ _id: transactionID })
  if (!transaction) {
    throw new NotFoundError(`No transaction with id ${transactionID}`)
  }

  res.status(200).json({ transaction })
}

const validateTransaction = async (req, res) => {
  const { id: transactionID } = req.params

  const transaction = await TransactionModel.findOne({ _id: transactionID })
  if (!transaction) {
    throw new NotFoundError(`No transaction with id ${transactionID}`)
  }

  const isValid = transaction.checkValidity()
  res.status(200).json({ isValid, transaction })
}

const approveTransaction = async (req, res) => {
  const { id: transactionID } = req.params
  const { isApproved } = req.body
  const { username, role } = req.user

  if (role !== "Validator") {
    throw new UnauthenticatedError("Not authorized")
  }

  const hasApprovedBefore = await TransactionModel.findOne({
    _id: transactionID,
    approvedBy: username,
  })

  const hasRejectedBefore = await TransactionModel.findOne({
    _id: transactionID,
    rejectedBy: username,
  })

  if (hasApprovedBefore || hasRejectedBefore) {
    throw new BadRequestError("Already rejected or approved this transaction")
  }

  const transaction = await TransactionModel.findOneAndUpdate(
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
  const validators = await User.find({ role: "Validator" })

  const approvedPercentage =
    transaction.approvedBy.length / parseFloat(validators.length)

  if (approvedPercentage >= CONSENSUS_THRESHOLD) {
    const transaction = await TransactionModel.findOneAndUpdate(
      { _id: transactionID },
      { status: "Approved" },
      { new: true }
    )
    isApproved
      ? res
          .status(200)
          .json({ msg: "You have approved this transaction", transaction })
      : res
          .status(200)
          .json({ msg: "You have rejected this transaction", transaction })
  }

  const rejectedPercentage =
    transaction.rejectedBy.length / parseFloat(validators.length)

  if (rejectedPercentage >= CONSENSUS_THRESHOLD) {
    const transaction = await TransactionModel.findOneAndUpdate(
      { _id: transactionID },
      { status: "Rejected" },
      { new: true }
    )
    isApproved
      ? res
          .status(200)
          .json({ msg: "You have approved this transaction", transaction })
      : res
          .status(200)
          .json({ msg: "You have rejected this transaction", transaction })
  }

  isApproved
    ? res
        .status(200)
        .json({ msg: "You have approved this transaction", transaction })
    : res
        .status(200)
        .json({ msg: "You have rejected this transaction", transaction })
}

module.exports = {
  getAllTransactions,
  createTransactions,
  getTransaction,
  validateTransaction,
  approveTransaction,
}
