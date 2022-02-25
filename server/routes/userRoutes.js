const express = require("express")
const router = express.Router()

const {
  login,
  register,
  generateKeys,
} = require("../controllers/userController")

router.route("/register").post(register).get(generateKeys)
router.route("/login").post(login)
//router.route("/dashboard").get(authMiddleware, dashboard)

module.exports = router
