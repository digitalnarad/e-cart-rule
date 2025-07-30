const Joi = require("joi");
const mongoose = require("mongoose");

const objectIdValidator = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message("must be a valid ObjectId");
  }
  return value;
};

const eventValidationSchema = Joi.object({
  type: Joi.string().required().messages({
    "string.empty": "Event type is required",
    "any.required": "Event type is required",
  }),

  params: Joi.object({
    message: Joi.string().optional().allow("").messages({
      "string.base": "Message must be a string",
    }),

    discount_event: Joi.string().required().messages({
      "string.empty": "Discount event is required",
      "any.required": "Discount event is required",
    }),

    value: Joi.number().optional().messages({
      "number.base": "Value must be a number",
    }),
  })
    .required()
    .messages({
      "any.required": "Event params are required",
    }),
});

const addRule = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Rule name is required",
    "any.required": "Rule name is required",
  }),

  rule_description: Joi.string().required().allow("").messages({
    "string.base": "Rule description must be a string",
  }),

  priority: Joi.number().required().default(0).messages({
    "number.base": "Priority must be a number",
    "any.required": "Priority is required",
  }),

  is_active: Joi.boolean().required().default(true),

  is_deleted: Joi.boolean().optional().default(false),

  conditions: Joi.any().required().messages({
    "any.required": "Conditions are required",
  }),

  event: eventValidationSchema.required(),
});

const updateRule = Joi.object({
  name: Joi.string().optional().allow("").messages({
    "string.base": "Name must be a string",
  }),
  rule_description: Joi.string().optional().allow("").messages({
    "string.base": "Description must be a string",
  }),
  priority: Joi.number().optional().default(0).messages({
    "number.base": "Priority must be a number",
  }),
  is_active: Joi.boolean().optional().default(true),
  is_deleted: Joi.boolean().optional().default(false),
  conditions: Joi.any().optional(),
  event: eventValidationSchema.optional(),
});

module.exports = { addRule, updateRule };
