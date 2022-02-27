const express = require("express")
const router = express.Router()

const {
  getAllTransactions,
  createTransactions,
  getTransaction,
  validateTransaction,
  approveTransaction,
} = require("../controllers/transactionController")

router.route("/").get(getAllTransactions).post(createTransactions)
router.route("/:id").get(getTransaction)
router.route("/validate/:id").get(validateTransaction).patch(approveTransaction)

module.exports = router
