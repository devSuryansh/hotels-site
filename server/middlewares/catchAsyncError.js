// Middleware to catch and handle asynchronous errors
export const catchAsyncError = (fn) => {
  return (req, res, next) => {
    // Resolve the promise returned by the async function and catch any errors
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
