const express = require("express")
const router = express.Router()

const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication")

const {
  getPendingRecords,
  getRecord,
  getPreviousBatches,
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

router.route("/:id").get(authenticateUser, getRecord)

router
  .route("/validate/:id")
  .get(authenticateUser, authorizePermissions("Validator"), validateRecord)
  .patch(authenticateUser, authorizePermissions("Validator"), approveRecord)

router
  .route("/records/previousBatches")
  .get(
    authenticateUser,
    authorizePermissions(["Miller", "Refiner", "WarehouseManager", "Retailer"]),
    getPreviousBatches
  )

module.exports = router
