const Joi = require("joi");

const addCategory = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Name must be a string",
    "any.required": "Name is required",
    "string.empty": "Name cannot be empty",
  }),
  description: Joi.string().optional().allow("").messages({
    "string.base": "Description must be a string",
  }),
  is_deleted: Joi.boolean().optional(),
  is_active: Joi.boolean().optional(),
});

const updateCategory = Joi.object({
  name: Joi.string().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name cannot be empty",
  }),
  description: Joi.string().optional().allow("").messages({
    "string.base": "Description must be a string",
  }),
  is_deleted: Joi.boolean().optional(),
  is_active: Joi.boolean().optional(),
});

module.exports = { addCategory, updateCategory };
