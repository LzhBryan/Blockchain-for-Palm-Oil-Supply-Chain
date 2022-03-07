const mongoose = require("mongoose")

const blockSchema = new mongoose.Schema({
  blockId: {
    type: Number,
    default: null,
    unique: true,
  },
  prevHash: {
    type: String,
    default: null,
    unique: true,
  },
  hash: {
    type: String,
    default: null,
    unique: true,
  },
  timestamp: {
    type: String,
    required: [true, "Please provide the timestamp"],
  },
  transactions: {
    type: Array,
    default: [],
    required: [true, "Please provide a list of transactions"],
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected", "inChain", "Hibernation"],
    default: "Hibernation",
  },
  approvedBy: {
    type: Array,
  },
  rejectedBy: {
    type: Array,
  },
})

module.exports = mongoose.model("Block", blockSchema)
