const express = require("express")
const router = express.Router()

const { searchProduct } = require("../controllers/productController")

router.route("/").get(searchProduct)

module.exports = router
