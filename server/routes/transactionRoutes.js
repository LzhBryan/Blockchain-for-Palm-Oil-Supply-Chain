const express = require("express")
const router = express.Router()
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication")

const {
  getPendingTransactions,
  getUserTransactions,
  getTransaction,
  createTransactions,
  validateTransaction,
  approveTransaction,
} = require("../controllers/transactionController")

router
  .route("/")
  .get(
    authenticateUser,
    authorizePermissions("Validator"),
    getPendingTransactions
  )
  .post(
    authenticateUser,
    authorizePermissions([
      "Planter",
      "Miller",
      "Refiner",
      "Transporter",
      "WarehouseManager",
      "Retailer",
    ]),
    createTransactions
  )

router.route("/:id").get(authenticateUser, getTransaction)

router
  .route("/validate/:id")
  .get(authenticateUser, authorizePermissions("Validator"), validateTransaction)
  .patch(
    authenticateUser,
    authorizePermissions("Validator"),
    approveTransaction
  )

router
  .route("/user/transactions")
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

module.exports = router
