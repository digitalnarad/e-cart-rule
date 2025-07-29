const { model_name } = require("../utils/helper");
const mongoose = require("mongoose");

const orderItemsSchema = new mongoose.Schema(
  {
    product_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    quantity: {
      type: Number,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    offer_price: {
      type: Number,
      required: true,
      trim: true,
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
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: model_name.USER,
      required: true,
    },
    order_items: {
      type: [orderItemsSchema],
      required: true,
    },
    total_amount: {
      type: Number,
      required: true,
      trim: true,
    },
    offer_amount: {
      type: Number,
      required: true,
      trim: true,
    },
    total_order: {
      type: Number,
      required: true,
      trim: true,
    },
    total_product: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model(model_name.CART, cartSchema);
