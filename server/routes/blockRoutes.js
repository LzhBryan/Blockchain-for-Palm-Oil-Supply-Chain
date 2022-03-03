const express = require("express")
const router = express.Router()

const {
  getAllBlocks,
  getBlock,
  createBlock,
  approveBlock,
} = require("../controllers/blockController")

router.route("/").get(getAllBlocks).post(createBlock)
router.route("/:id").get(getBlock)
router.route("/approve/:id").put(approveBlock)

module.exports = router
