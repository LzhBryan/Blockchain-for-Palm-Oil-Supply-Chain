const mongoose = require("mongoose")

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
    required: [true, "Please providee transaction signature"],
  },
})

module.exports = mongoose.model("Transaction", transactionSchema)
