const express = require("express")
const router = express.Router()

const {
  getAllBlocks,
  getBlock,
  approveBlock,
  activateBlock,
} = require("../controllers/blockController")

router.route("/").get(getAllBlocks)
router.route("/:id").get(getBlock).patch(activateBlock)
router.route("/approve/:id").put(approveBlock)

module.exports = router
