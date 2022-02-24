const express = require("express")
const router = express.Router()
const {
  login,
  registration,
  /*dashboard,*/
} = require("../controllers/userController")

router.route("/register").post(registration)
router.route("/login").post(login)
//router.route("/dashboard").get(authMiddleware, dashboard)

module.exports = router
