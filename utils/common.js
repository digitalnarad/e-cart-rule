const bcrypt = require("bcrypt");

const catchAsync = (theFunc) => (req, res, next) => {
  Promise.resolve(theFunc(req, res, next)).catch(next);
};

const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

const PasswordValidation = (inputPassword, storedPassword) => {
  return bcrypt.compareSync(inputPassword, storedPassword);
};

module.exports = {
  catchAsync,
  hashPassword,
  PasswordValidation,
};
