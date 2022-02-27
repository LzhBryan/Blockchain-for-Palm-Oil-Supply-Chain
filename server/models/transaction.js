const mongoose = require("mongoose")
const Transaction = require("../blockchain/transaction")

const transactionSchema = new mongoose.Schema({
  fromAddress: {
    type: String,
    required: [true, "Please provide sender address"],
  },
  toAddress: {
    type: String,
    required: [true, "Please provide receiver address"],
  },
  amount: {
    type: Number,
    required: [true, "Please provide transaction amount"],
  },
  timestamp: {
    type: String,
  },
  signature: {
    type: String,
    required: [true, "Please provide transaction signature"],
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  createdBy: {
    type: String,
    required: true,
  },
  approvedBy: {
    type: Array,
  },
  rejectedBy: {
    type: Array,
  },
})

transactionSchema.methods.checkValidity = function () {
  const transaction = new Transaction(
    this.fromAddress,
    this.toAddress,
    this.amount
  )
  transaction.timestamp = this.timestamp
  transaction.signature = this.signature
  return transaction.isValid()
}

module.exports = mongoose.model("Transaction", transactionSchema)
