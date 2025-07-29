const Joi = require("joi");
const mongoose = require("mongoose");

// custom mongodbIds validator
const objectIdValidator = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message(`${value} is not a valid ObjectId`);
  }
  return value;
};

const productValidationSchema = Joi.object({
  product_uid: Joi.string().required().messages({
    "string.empty": "Product UID is required",
    "any.required": "Product UID is required",
  }),

  name: Joi.string().trim().required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is not alow empty",
    "any.required": "Name is required",
  }),

  description: Joi.string().required().messages({
    "string.empty": "Description is not alow empty",
    "any.required": "Description is required",
  }),

  actual_price: Joi.number().min(0).required().messages({
    "number.base": "Actual price must be a number",
    "number.min": "Actual price cannot be negative",
    "any.required": "Actual price is required",
  }),

  product_company: Joi.string().required().messages({
    "string.empty": "Product company is not alow empty",
    "any.required": "Product company is required",
  }),

  offer_price: Joi.number().min(0).required().messages({
    "number.base": "Offer price must be a number",
    "number.min": "Offer price cannot be negative",
    "any.required": "Offer price is required",
  }),

  price: Joi.number().min(0).required().messages({
    "number.base": "Price must be a number",
    "number.min": "Price cannot be negative",
    "any.required": "Price is required",
  }),

  category_id: Joi.string()
    .required()
    .custom(objectIdValidator, "ObjectId validation"),

  sub_category_id: Joi.string()
    .required()
    .custom(objectIdValidator, "ObjectId validation"),

  stock: Joi.number().min(0).default(0).messages({
    "number.base": "Stock must be a number",
    "number.min": "Stock cannot be negative",
  }),

  is_deleted: Joi.boolean().optional(),
  is_active: Joi.boolean().optional(),
});

module.exports = { productValidationSchema };
