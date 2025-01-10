// Custom error handler class extending the built-in Error class
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message); // Call the parent class constructor with the message
    this.statusCode = statusCode; // Set the status code for the error
  }
}

// Middleware to handle errors and send appropriate responses
export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error"; // Default error message
  err.statusCode = err.statusCode || 500; // Default status code

  // Handle duplicate key errors (e.g., duplicate email)
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  // Handle invalid JSON Web Token errors
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, try again`;
    err = new ErrorHandler(message, 400);
  }

  // Handle expired JSON Web Token errors
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is expired, try again`;
    err = new ErrorHandler(message, 400);
  }

  // Handle invalid object ID errors (e.g., invalid MongoDB ID)
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Construct a detailed error message if validation errors are present
  const errorMessage = err.errors
    ? Object.values(err.errors)
        .map((value) => value.message)
        .join(" ")
    : err.message;

  // Send the error response
  return res.status(err.statusCode).json({
    success: false,
    message: errorMessage,
  });
};

export default ErrorHandler; // Export the custom error handler class
