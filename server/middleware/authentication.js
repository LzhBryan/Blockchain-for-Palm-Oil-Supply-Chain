const jwt = require("jsonwebtoken")
const { UnauthenticatedError } = require("../errors")

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("No token provided, invalid authentication")
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { userID, username, role } = decoded
    req.user = { userID, username, role }
    next()
  } catch (error) {
    throw new UnauthenticatedError("Not authorized to access this route")
  }
}

module.exports = authenticationMiddleware
