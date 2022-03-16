const mongoose = require("mongoose")

const supplychainSchema = new mongoose.Schema({
  fromAddress: {
    type: String,
    required: [true, "Please provide sender address"],
  },
  toAddress: {
    type: String,
    required: [true, "Please provide receiver address"],
  },
  product: [
    {
      _id: false,
      name: {
        type: String,
        required: [true, "Please provide the product name"],
      },
      quantity: {
        type: Number,
        required: [true, "Please provide the product quantity"],
      },
    },
  ],
  batchId: {
    type: String,
    required: true,
    unique: true,
  },
  previousBatchId: {
    type: String,
  },
  transactionReceipt: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please provide the transaction receipt"],
    unique: true,
    ref: "Transaction",
  },
  timestamp: {
    type: String,
    required: [true, "Please provide the timestamp"],
  },
  signature: {
    type: String,
    required: [true, "Please provide transaction signature"],
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected", "inBlock", "inChain"],
    default: "Pending",
  },
  approvedBy: {
    type: Array,
  },
  rejectedBy: {
    type: Array,
  },
})

module.exports = mongoose.model("SupplyChain", supplychainSchema)
