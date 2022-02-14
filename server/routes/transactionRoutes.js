const express = require("express")
const router = express.Router()

const {
  getAllTransactions,
  createTransactions,
  getTransaction,
} = require("../controllers/transactionController")

router.route("/").get(getAllTransactions).post(createTransactions)
router.route("/:id").get(getTransaction)

module.exports = router
