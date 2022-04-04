const mongoose = require("mongoose")

const supplyChainSchema = new mongoose.Schema(
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
      required: true,
      unique: true,
      minlength: 3,
    },
    previousBatchId: {
      type: String,
      minlength: 3,
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

module.exports = mongoose.model("SupplyChain", supplyChainSchema)
