const Transaction = require("../blockchain/transaction")
const TransactionModel = require("../models/transaction")
const { NotFoundError } = require("../errors")
const EC = require("elliptic").ec
const ec = new EC("secp256k1")

const getAllTransactions = async (req, res) => {
  // get all transactions history for a particular user
  const transactions = await TransactionModel.find({})
  res.status(200).json({ transactions })
}

const createTransactions = async (req, res) => {
  const { from, privateKey, to, amount } = req.body
  const key = ec.keyFromPrivate(privateKey)
  const tx = new Transaction(from, to, amount)
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

module.exports = {
  getAllTransactions,
  createTransactions,
  getTransaction,
}
