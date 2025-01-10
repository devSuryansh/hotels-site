export const generateToken = (user, message, statusCode, res) => {
  // Generate a JSON Web Token for the user
  const token = user.generateJsonWebToken();

  // Determine the cookie name based on the user's role
  const cookieName = user.role === "admin" ? "adminToken" : "userToken";

  // Set the response status, cookie, and JSON response
  res
    .status(statusCode) // Set the HTTP status code
    .cookie(cookieName, token, {
      // Set a cookie with the token, expiring in 15 days
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    })
    .json({
      success: true, // Indicate success
      message, // Include a message
      token, // Include the token in the response
      user, // Include user information in the response
    });
};
