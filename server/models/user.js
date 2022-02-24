const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
  },
})

//Registration
UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// Create token to user
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      id: this._id,
      username: this.name,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  )
}

// Login
UserSchema.methods.comparePassword = async function (userpwd) {
  const isMatch = await bcrypt.compare(userpwd, this.password)
  return isMatch
}

const model = mongoose.model("UserSchema", UserSchema)

module.exports = model
