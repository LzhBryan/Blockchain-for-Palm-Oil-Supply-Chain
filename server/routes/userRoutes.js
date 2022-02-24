const express = require("express")
const router = express.Router()
const { login, registration } = require("../controllers/user")

router.route("/register").post(registration)
router.route("/login").post(login)

module.exports = router
