const express = require("express")
const router = express.Router()

const {
  login,
  register,
  generateKeys,
} = require("../controllers/authController")

router.route("/register").post(register).get(generateKeys)
router.route("/login").post(login)

module.exports = router
