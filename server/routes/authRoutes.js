const express = require("express")
const router = express.Router()

const {
  login,
  register,
  generateKeys,
  logout,
} = require("../controllers/authController")

router.route("/register").post(register).get(generateKeys)
router.route("/login").post(login)
router.route("/logout").get(logout)

module.exports = router
