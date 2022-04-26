const mongoose = require("mongoose")

const supplyChainSchema = new mongoose.Schema(
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
    products: [
      {
        _id: false,
        name: {
          type: String,
          required: [true, "Please provide the product name"],
          enum: [
            "PALM FRUITS",
            "EMPTY FRUIT BUNCH",
            "CRUDE PALM OIL",
            "CRUDE PALM KERNEL OIL",
            "PALM OIL",
            "PALM KERNEL OIL",
            "BIOFUEL",
          ],
        },
        quantity: {
          type: Number,
          required: [true, "Please provide the product quantity"],
        },
      },
    ],
    batchId: {
      type: String,
      required: [true, "Please provide batch ID"],
      unique: true,
      minlength: [3, "Batch ID should have more than 2 characters"],
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

module.exports = mongoose.model("SupplyChain", supplyChainSchema)
