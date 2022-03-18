const express = require("express")
const router = express.Router()

const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication")

const {
  getAllUsers,
  showCurrentUserProfile,
  getUserTransactions,
  getUserRecords,
} = require("../controllers/userController")

router.route("/").get(authenticateUser, getAllUsers)

router.route("/:id").get(authenticateUser, showCurrentUserProfile)

router
  .route("/transactions/history")
  .get(
    authenticateUser,
    authorizePermissions([
      "Planter",
      "Miller",
      "Refiner",
      "Transporter",
      "WarehouseManager",
      "Retailer",
    ]),
    getUserTransactions
  )

router
  .route("/records/history")
  .get(
    authenticateUser,
    authorizePermissions([
      "Planter",
      "Miller",
      "Refiner",
      "Transporter",
      "WarehouseManager",
      "Retailer",
    ]),
    getUserRecords
  )

module.exports = router
