const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({
  fromAddress: {
    type: String,
    require: [true, "Please provide sender address"],
  },
  toAddress: {
    type: String,
    require: [true, "Please provide receiver address"],
  },
  amount: {
    type: Number,
    require: [true, "Please provide transaction amount"],
  },
  timestamp: {
    type: String,
  },
  signature: {
    type: String,
    require: [true, "Please providee transaction signature"],
  },
})

module.exports = mongoose.model("Transaction", transactionSchema)
