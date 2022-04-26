const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema(
  {
    fromAddress: {
      type: String,
      required: [true, "Please provide sender address"],
      minlength: [
        130,
        "The sender address must has the exact length of 130 characters",
      ],
      maxlength: [
        130,
        "The sender address must has the exact length of 130 characters",
      ],
    },
    toAddress: {
      type: String,
      required: [true, "Please provide receiver address"],
      minlength: [
        130,
        "The receiver address must has the exact length of 130 characters",
      ],
      maxlength: [
        130,
        "The receiver address must has the exact length of 130 characters",
      ],
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
      required: [true, "Please provide the created by field"],
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
