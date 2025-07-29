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

  price: Joi.number().required().messages({
    "number.base": "Price must be a number",
    "any.required": "Price is required",
  }),

  offer_price: Joi.number().required().messages({
    "number.base": "Offer price must be a number",
    "any.required": "Offer price is required",
  }),

  category_id: Joi.string()
    .required()
    .custom(objectIdValidator, "ObjectId validation"),

  sub_category_id: Joi.string()
    .required()
    .custom(objectIdValidator, "ObjectId validation"),
});

const cartValidationSchema = Joi.object({
  order_items: Joi.array()
    .items(orderItemValidationSchema)
    .min(0)
    .required()
    .messages({
      "array.base": "order_items must be an array",
      "array.min": "order_items are not alow negative values",
      "any.required": "order_items is required",
    }),

  total_amount: Joi.number().min(0).required().messages({
    "number.base": "total_amount must be a number",
    "array.min": "total_amount are not alow negative values",
    "any.required": "total_amount is required",
  }),

  offer_amount: Joi.number().min(0).required().messages({
    "number.base": "offer_amount must be a number",
    "array.min": "offer_amount are not alow negative values",
    "any.required": "offer_amount is required",
  }),

  total_order: Joi.number().min(0).required().messages({
    "number.base": "total_order must be a number",
    "any.required": "total_order is required",
    "array.min": "total_order are not alow negative values",
  }),

  total_product: Joi.number().min(0).required().messages({
    "number.base": "total_product must be a number",
    "any.required": "total_product is required",
    "array.min": "total_product are not alow negative values",
  }),
});

module.exports = {
  cartValidationSchema,
};
