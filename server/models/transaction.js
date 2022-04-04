const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema(
  {
    fromAddress: {
      type: String,
      required: [true, "Please provide sender address"],
      minlength: 130,
      maxlength: 130,
    },
    toAddress: {
      type: String,
      required: [true, "Please provide receiver address"],
      minlength: 130,
      maxlength: 130,
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
      enum: ["Pending", "Approved", "Rejected", "inBlock", "inChain"],
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
  },
  { versionKey: false }
)

module.exports = mongoose.model("Transaction", transactionSchema)
