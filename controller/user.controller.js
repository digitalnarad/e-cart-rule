const { create_token } = require("../lib/jwt");
const { response400, response200 } = require("../lib/response-messages");
const { user_services } = require("../services");
const {
  catchAsync,
  hashPassword,
  PasswordValidation,
} = require("../utils/common");
const { response_msg } = require("../utils/helper");

const userSignIn = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await user_services.findUser({ email, is_deleted: false });
  console.log("user", user);
  if (!user) return response400(res, response_msg.invalidCredentials);

  const validPassword = PasswordValidation(password, user.password);
  if (!validPassword) return response400(res, response_msg.invalidCredentials);

  const token = await user_services.create_jwt_token(user);
  return response200(res, response_msg.loginSuccess, {
    ...user,
    token,
  });
});

const userSignUp = catchAsync(async (req, res) => {
  let { email, password, user_name } = req.body;

  const user = await user_services.findUser({
    $or: [{ email }, { user_name }],
    is_deleted: false,
  });
  if (user) return response400(res, response_msg.emailIsExists);

  req.body.password = hashPassword(password);

  const newUser = await user_services.registerUser(req.body);

  return response200(res, response_msg.signupSuccess, newUser);
});

module.exports = {
  userSignIn,
  userSignUp,
};
