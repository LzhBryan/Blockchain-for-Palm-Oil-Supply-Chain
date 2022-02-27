const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide username"],
    minlength: 3,
    maxlength: 50,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
  },
  role: {
    type: String,
    required: [true, "Please provide user role"],
    enum: [
      "Planter",
      "Miller",
      "Refiner",
      "Transporter",
      "WarehouseManager",
      "Retailer",
      "Validator",
    ],
  },
  publicKey: {
    type: String,
    required: [true, "Please generate public key"],
    unique: true,
  },
  privateKey: {
    type: String,
    required: [true, "Please generate private key"],
    unique: true,
  },
})

// Registration
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// Create token to user
userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userID: this._id, username: this.username, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  )
}

// Login
userSchema.methods.comparePassword = async function (inputPassword) {
  const isMatch = await bcrypt.compare(inputPassword, this.password)
  return isMatch
}

module.exports = mongoose.model("User", userSchema)
