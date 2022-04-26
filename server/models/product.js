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
      required: [true, "Please provide product ID"],
      unique: true,
      minlength: [3, "Product ID should have 2 characters"],
    },
    prevBatchId: {
      type: String,
      required: [true, "Please provide previous batch ID"],
    },
    timestamp: {
      type: String,
    },
  },
  { versionKey: false }
)

module.exports = mongoose.model("Product", itemSchema)
