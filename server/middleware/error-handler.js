const errorHandler = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || 500,
    message: err.message || "Something went wrong, please try again later",
  }

  if (err.name === "ValidationError") {
    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ")

    customError.statusCode = 400
  }

  if (err.name === "CastError") {
    customError.message = `No item found with id ${err.value}`
    customError.statusCode = 404
  }

  if (err.code && err.code === 11000) {
    customError.message = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`
    customError.statusCode = 400
  }

  return res.status(customError.statusCode).json({ msg: customError.message })
}

module.exports = errorHandler
