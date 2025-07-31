const { verifyToken } = require("../lib/jwt");
const { response401 } = require("../lib/response-messages");
const { user_services } = require("../services");
const { catchAsync } = require("../utils/common");
const { response_msg } = require("../utils/helper");

exports.isAuthenticated = catchAsync(async (req, res, next) => {
  const headers = req.headers.authorization;
  if (!headers) return response401(res, response_msg.headerMissing);

  const token = headers.split(" ")[1];
  if (!token) return response401(res, response_msg.invalidToken);

  const data = await verifyToken(token);

  const user = await user_services.findUser({ _id: data?.user_id });
  console.log("user", user);
  if (!user) return response401(res, response_msg.tokenExpired);
  if (!user.is_active) return response401(res, response_msg.accountInActivated);

  req.userId = user._id;
  req.user = user;

  next();
});
