const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productId: {
    type: Number,
    required: true,
    unique: true,
  },
  prevBatchId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
  },
})

module.exports = mongoose.model("Product", itemSchema)
