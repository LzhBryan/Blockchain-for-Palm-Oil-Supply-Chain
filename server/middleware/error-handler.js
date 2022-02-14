const errorHandler = (err, req, res, next) => {
  console.log(err)
  if (err.statusCode) {
    return res.status(err.statusCode).json({ error: err.message })
  }
  return res.status(500).json({ error: err.message })
}

module.exports = errorHandler
