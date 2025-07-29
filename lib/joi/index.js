const { response400 } = require("../response-messages");

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return response400(res, error.details[0].message, {});
    }
    next();
  };
};

module.exports = { validateRequest };
module.exports.userValidation = require("./user.validation");
module.exports.categoryValidation = require("./category.validation");
module.exports.subCategoryValidation = require("./sub_category.validation");
module.exports.productValidation = require("./product.validation");
module.exports.ruleValidation = require("./rule.validation");
module.exports.cartValidation = require("./cart.validation");
