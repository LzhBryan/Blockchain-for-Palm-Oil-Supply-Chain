const express = require("express")
const router = express.Router()

const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication")

const {
  getPendingRecords,
  createRecord,
  validateRecord,
  approveRecord,
} = require("../controllers/supplyChainController")

router
  .route("/")
  .get(authenticateUser, authorizePermissions("Validators"), getPendingRecords)
  .post(
    authenticateUser,
    authorizePermissions([
      "Planter",
      "Miller",
      "Refiner",
      "WarehouseManager",
      "Retailer",
    ]),
    createRecord
  )

router
  .route("/validate/:id")
  .get(authenticateUser, authorizePermissions("Validator"), validateRecord)
  .patch(authenticateUser, authorizePermissions("Validator"), approveRecord)

module.exports = router
