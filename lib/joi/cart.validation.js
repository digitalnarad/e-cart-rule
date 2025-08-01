const Joi = require("joi");
const mongoose = require("mongoose");

const objectIdValidator = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message(`${value} is not a valid ObjectId`);
  }
  return value;
};

const orderItemValidationSchema = Joi.object({
  product_id: Joi.string()
    .required()
    .custom(objectIdValidator, "ObjectId validation"),

  quantity: Joi.number().required().messages({
    "number.base": "Quantity must be a number",
    "any.required": "Quantity is required",
  }),
});

const updateCart = Joi.object({
  order_items: Joi.array()
    .items(orderItemValidationSchema)
    .min(1)
    .required()
    .messages({
      "array.base": "order_items must be an array",
      "array.min": "order_items must have at least one item",
      "any.required": "order_items is required",
    }),
});

module.exports = {
  updateCart,
};
