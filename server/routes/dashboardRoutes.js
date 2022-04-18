const express = require("express")
const router = express.Router()

const { authenticateUser } = require("../middleware/authentication")

const {
  getApprovedRejectPercentage,
  getWeeklyCreatedBlocks,
  getWeeklyCreatedTransactions,
  getWeeklyCreatedRecords,
  getWeeklyCreatedProducts,
  getUsers,
} = require("../controllers/dashboardController")

router
  .route("/approveReject")
  .get(authenticateUser, getApprovedRejectPercentage)

router.route("/weeklyBlocks").get(authenticateUser, getWeeklyCreatedBlocks)

router
  .route("/weeklyTransactions")
  .get(authenticateUser, getWeeklyCreatedTransactions)

router.route("/weeklyRecords").get(authenticateUser, getWeeklyCreatedRecords)

router.route("/weeklyProducts").get(authenticateUser, getWeeklyCreatedProducts)

router.route("/users").get(authenticateUser, getUsers)

module.exports = router
