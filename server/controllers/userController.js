const UserModel = require("../models/user")
const TransactionModel = require("../models/transaction")
const SupplyChainModel = require("../models/supplychain")

const getAllUsers = async (req, res) => {
  const users = await UserModel.find({}).select("-password -privateKey")
  res.status(200).json({ users })
}

const showCurrentUserProfile = async (req, res) => {
  const { username } = req.user
  const user = await UserModel.find({ username: username }).select("-password")

  res.status(200).json({ user })
}

const getUserTransactions = async (req, res) => {
  const { username } = req.user

  const createdTransactions = await TransactionModel.find({
    createdBy: username,
  })

  const user = await UserModel.find({ username: username })

  const receivedTransactions = await TransactionModel.find({
    toAddress: user[0].publicKey,
  })

  let transactions = []
  transactions = transactions.concat(createdTransactions, receivedTransactions)

  transactions.sort(function (a, b) {
    if (a.timestamp < b.timestamp) return -1
    else if (a.timestamp > b.timestamp) return 1
    return 0
  })

  res.status(200).json({ transactions, username })
}

const getUserRecords = async (req, res) => {
  const { username } = req.user

  const createdRecords = await SupplyChainModel.find({
    createdBy: username,
  })

  const user = await UserModel.find({ username: username })

  const receivedRecords = await SupplyChainModel.find({
    toAddress: user[0].publicKey,
  })

  let records = []
  records = records.concat(createdRecords, receivedRecords)

  records.sort(function (a, b) {
    if (a.timestamp < b.timestamp) return -1
    else if (a.timestamp > b.timestamp) return 1
    return 0
  })

  res.status(200).json({ records })
}

module.exports = {
  getAllUsers,
  showCurrentUserProfile,
  getUserTransactions,
  getUserRecords,
}
