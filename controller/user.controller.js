const { create_token } = require("../lib/jwt");
const { response400, response200 } = require("../lib/response-messages");
const { user_services } = require("../services");
const {
  catchAsync,
  hashPassword,
  PasswordValidation,
} = require("../utils/common");
const { response_msg } = require("../utils/helper");

// user sign in
const userSignIn = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await user_services.findUser({ email, is_deleted: false });
  if (!user) return response400(res, response_msg.invalidCredentials);

  const validPassword = PasswordValidation(password, user.password);
  if (!validPassword) return response400(res, response_msg.invalidCredentials);

  const token = await user_services.create_jwt_token(user);
  return response200(res, response_msg.loginSuccess, {
    ...user,
    token,
  });
});

// user sign up
const userSignUp = catchAsync(async (req, res) => {
  let { email, password } = req.body;

  const user = await user_services.findUser({
    email,
    is_deleted: false,
  });
  if (user) return response400(res, response_msg.emailIsExists);

  req.body.password = hashPassword(password);

  const newUser = await user_services.registerUser(req.body);

  await cart_services.registerCart({
    user_id: newUser._id,
    order_items: [],
    total_amount: 0,
    offer_amount: 0,
    total_order: 0,
    total_product: 0,
  });

  return response200(res, response_msg.signupSuccess, newUser);
});

module.exports = {
  userSignIn,
  userSignUp,
};
