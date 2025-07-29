const mongoose = require("mongoose");
const { model_name } = require("../utils/helper");

const subCategorySchema = mongoose.Schema(
  {
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: model_name.CATEGORY,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    added_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: model_name.USER,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(model_name.SUB_CATEGORY, subCategorySchema);
