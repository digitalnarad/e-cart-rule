const { model_name } = require("../utils/helper");
const mongoServices = require("../config/mongoServices");

const createRule = async (rule) => {
  try {
    return await mongoServices.createOne(model_name.RULE, rule);
  } catch (error) {
    throw error;
  }
};

const getAllRule = async (query) => {
  try {
    return await mongoServices.findAll(model_name.RULE, query);
  } catch (error) {
    throw error;
  }
};

const findRule = async (query) => {
  try {
    return await mongoServices.findOne(model_name.RULE, query);
  } catch (error) {
    throw error;
  }
};

const update = async (query, payload) => {
  try {
    return await mongoServices.updateOne(model_name.RULE, query, payload, {});
  } catch (error) {
    throw error;
  }
};

const handleApplyRule = async ({ event, almanac }) => {
  try {
    const cart = await almanac.factValue("cart");

    if (event.type === "price-discount") {
      const { discount_event, value } = event.params;
      console.log("discount_event", discount_event);
      let finalTotal = cart.offer_amount || cart.total_amount;

      if (discount_event === "min-item-price") {
        const cart = await almanac.factValue("cart");
        const order_product_prices = await almanac.factValue(
          "order_product_prices"
        );
        const min = order_product_prices.sort((a, b) => a - b);
        finalTotal -= min;
      } else if (discount_event === "fixed-discount") {
        finalTotal -= value;
      } else if (discount_event === "percentage-discount") {
        finalTotal -= (finalTotal * value) / 100;
      } else if (discount_event === "by-one-get-free") {
        finalTotal -= finalTotal / 2;
      }
      cart.apply_rule_amount = finalTotal.toFixed(2);
    }
    return cart;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createRule,
  getAllRule,
  handleApplyRule,
  update,
  findRule,
};
