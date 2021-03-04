function errorHandler(err, req, res, next) {
  if (err.name === "UnauthorizedError")
    return res.status(401).send({
      message: "user not authen",
    });
  return res.status(500).send({
    message: err,
  });
}

module.exports = errorHandler;
