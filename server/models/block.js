const mongoose = require("mongoose")

const blockSchema = new mongoose.Schema({
  blockId: {
    type: Number,
    default: null,
    index: {
      unique: true,
      partialFilterExpression: { blockId: { $type: "number" } },
    },
  },
  prevHash: {
    type: String,
    default: null,
    index: {
      unique: true,
      partialFilterExpression: { prevHash: { $type: "string" } },
    },
  },
  hash: {
    type: String,
    default: null,
    index: {
      unique: true,
      partialFilterExpression: { prevHash: { $type: "string" } },
    },
  },
  timestamp: {
    type: String,
    required: [true, "Please provide the timestamp"],
  },
  records: {
    type: Array,
    default: [],
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected", "inChain", "Hibernating"],
    default: "Hibernating",
  },
  approvedBy: {
    type: Array,
  },
  rejectedBy: {
    type: Array,
  },
})

module.exports = mongoose.model("Block", blockSchema)
