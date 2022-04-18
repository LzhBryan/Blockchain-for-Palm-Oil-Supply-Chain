const express = require("express")
const router = express.Router()

const { authenticateUser } = require("../middleware/authentication")

const { searchProduct } = require("../controllers/productController")

router.route("/:id").get(authenticateUser, searchProduct)

module.exports = router
