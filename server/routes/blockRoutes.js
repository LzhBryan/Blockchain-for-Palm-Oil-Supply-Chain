const express = require("express")
const router = express.Router()
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication")

const {
  getBlockchain,
  getBlock,
  getWaitingBlock,
  activateBlock,
  validateBlock,
  approveBlock,
} = require("../controllers/blockController")

router.route("/blockchain").get(authenticateUser, getBlockchain)

router
  .route("/")
  .get(authenticateUser, authorizePermissions("Validator"), getWaitingBlock)

router
  .route("/:id")
  .get(authenticateUser, getBlock)
  .patch(authenticateUser, authorizePermissions("Validator"), activateBlock)

router
  .route("/approve/:id")
  .get(authenticateUser, authorizePermissions("Validator"), validateBlock)
  .put(authenticateUser, authorizePermissions("Validator"), approveBlock)

module.exports = router
