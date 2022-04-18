const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      enum: ["PALM OIL", "PALM KERNEL OIL", "BIOFUEL"],
    },
    productId: {
      type: Number,
      required: true,
      unique: true,
      minlength: 3,
    },
    prevBatchId: {
      type: String,
      required: true,
    },
    timestamp: {
      type: String,
    },
  },
  { versionKey: false }
)

module.exports = mongoose.model("Product", itemSchema)
