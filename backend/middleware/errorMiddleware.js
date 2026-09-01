const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err.code === 11000) {
    statusCode = 409;
    message = "An account with this email already exists";
  }

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((validationError) => validationError.message)
      .join(",");
  }
  const errors = message.split(",");

  res.status(statusCode).json({
    status: statusCode,
    success: false,
    message: errors,
  });
};

module.exports = errorMiddleware;
