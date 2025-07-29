const { model_name, subCategoryIds, categoryIds } = require("../utils/helper");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    product_uid: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    actual_price: {
      type: Number,
      required: true,
      min: 0,
    },
    product_company: {
      type: String,
      required: true,
    },
    offer_price: {
      type: Number,
      required: true,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: model_name.CATEGORY,
      required: true,
    },
    sub_category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: model_name.SUB_CATEGORY,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    added_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: model_name.USER,
      required: true,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model(model_name.PRODUCT, productSchema);
