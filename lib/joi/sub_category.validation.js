const Joi = require("joi");
const mongoose = require("mongoose");

const subCategoryValidationSchema = Joi.object({
  category_id: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message("category_id must be a valid ObjectId");
      }
      return value;
    }, "ObjectId validation"),
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

module.exports = { subCategoryValidationSchema };
