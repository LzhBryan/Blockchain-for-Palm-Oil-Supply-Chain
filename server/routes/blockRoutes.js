const express = require("express")
const router = express.Router()
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication")

const {
  getBlockchain,
  getBlock,
  getHibernateBlock,
  validateBlock,
  activateBlock,
  approveBlock,
} = require("../controllers/blockController")

router.route("/blockchain").get(authenticateUser, getBlockchain)

router.route("/").get(getHibernateBlock)

router
  .route("/:id")
  .get(authenticateUser, getBlock)
  .patch(authenticateUser, authorizePermissions("Validator"), activateBlock)

router
  .route("/approve/:id")
  .get(validateBlock)
  .put(authenticateUser, authorizePermissions("Validator"), approveBlock)

module.exports = router
