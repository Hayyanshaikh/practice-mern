const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errors = err.message.split(",");

  res.status(statusCode).json({
    status: statusCode,
    success: false,
    message: errors || "Internal Server Error",
  });
};

module.exports = errorMiddleware;
