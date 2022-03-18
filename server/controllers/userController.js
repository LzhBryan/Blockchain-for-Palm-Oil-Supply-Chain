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

  const transactions = await TransactionModel.find({
    createdBy: username,
  })
  res.status(200).json({ transactions })
}

const getUserRecords = async (req, res) => {
  const { username } = req.user

  const transactions = await SupplyChainModel.find({
    createdBy: username,
  })
  res.status(200).json({ transactions })
}

module.exports = {
  getAllUsers,
  showCurrentUserProfile,
  getUserTransactions,
  getUserRecords,
}
