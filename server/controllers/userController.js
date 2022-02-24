const UserModel = require("../models/user")

const registration = async (req, res) => {
  const user = await UserModel.create({ ...req.body })
  const token = user.createJWT()
  res.status(201).json({ name: user.username, token })
}

const login = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    res.status(400).json({ msg: "Please provide email or password" })
  }

  const user = await UserModel.findOne({ username: req.body.username })

  if (!user) {
    return res.status(401).json({ msg: "Invalid" })
  }

  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    return res.status(401).json({ msg: "Invalid" })
  }

  const token = user.createJWT()
  res.status(200).json({ name: user.username, token })
}

module.exports = {
  registration,
  login,
}
