const Joi = require("joi");

const signUpValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  user_name: Joi.string().optional().allow("").messages({
    "string.base": "User name must be a string",
  }),
  password: Joi.string()
    .min(6) // example minimum length, adjust as needed
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters long",
      "any.required": "Password is required",
    }),
  is_deleted: Joi.boolean().optional(),
  is_active: Joi.boolean().optional(),
});

const signInValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  password: Joi.string()
    .min(6) // example minimum length, adjust as needed
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters long",
      "any.required": "Password is required",
    }),
  is_deleted: Joi.boolean().optional(),
  is_active: Joi.boolean().optional(),
});

module.exports = { signUpValidationSchema, signInValidationSchema };
