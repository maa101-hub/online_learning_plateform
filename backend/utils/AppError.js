// Custom error class with message + statusCode
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor); // keeps stack trace clean
  }
}

module.exports = AppError;
