const mongoose = require("mongoose")

const blockSchema = new mongoose.Schema({
  blockId: {
    type: Number,
  },
  prevHash: {
    type: String,
  },
  hash: {
    type: String,
  },
  timestamp: {
    type: String,
    required: [true, "Please provide the timestamp"],
  },
  transactions: {
    type: Array,
    required: [true, "Please provide a list of transactions"],
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected", "inChain"],
  },
  approvedBy: {
    type: Array,
  },
  rejectedBy: {
    type: Array,
  },
})

module.exports = mongoose.model("Block", blockSchema)
