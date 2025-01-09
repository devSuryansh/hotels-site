export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  const cookieName = user.role === "admin" ? "adminToken" : "userToken";
  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    })
    .json({
      success: true,
      message,
      token,
      user,
    });
};
