const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Something is wrong";

  if (err.name === "CastError") {
    const message = `Resource not found.Invalid :${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  if (err.code == "11000") {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.message,
  });
};
