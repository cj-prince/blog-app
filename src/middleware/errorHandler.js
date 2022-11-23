const errorHandler = (Error,req, res, next) => {
  res.status(Error.status || 500)
  res.send({"error": true, "message": Error.message || "internal Server Error"})
  next()
}

module.exports = errorHandler