const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const registration = async (req, res) => {
  const HASHED_PASSWORD = await bcrypt.hash(req.body.password, 10)

  const user = await User.create({
    username: req.body.username,
    password: HASHED_PASSWORD,
  })
  res.status(201).json({ user })
}

const login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username }).lean()

  if (bcrypt.compare(req.body.password, user.password)) {
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET
    )
    console.log("Success: ", token)
    res.status(200).json({ user })
  }
}

module.exports = {
  registration,
  login,
}
