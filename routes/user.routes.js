const { user_controller } = require("../controller");
const { validateRequest, userValidation } = require("../lib/joi");
const { response200 } = require("../lib/response-messages");
const { isAuthenticated } = require("../middleware/isAuthenticated");
const { response_msg } = require("../utils/helper");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("working done!").status(200);
});

router.post(
  "/sign-in",
  validateRequest(userValidation.signInValidationSchema),
  user_controller.userSignIn
);

router.post(
  "/sign-up",
  validateRequest(userValidation.signUpValidationSchema),
  user_controller.userSignUp
);

router.get("/token-verification", isAuthenticated, (req, res) => {
  const user = req.user;
  response200(res, response_msg.fetchSuccessfully, user);
});

module.exports = router;
