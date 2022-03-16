const mongoose = require("mongoose")

const approvedRecord = new mongoose.Schema({
  records: {
    type: Object,
  },
})

module.exports = mongoose.model("ApprovedRecordButNotInBlock", approvedRecord)
