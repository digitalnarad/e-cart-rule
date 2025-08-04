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

// const handleApplyRule = async ({ event, almanac }) => {
//   try {
//     const cart = await almanac.factValue("cart");

//     if (event.type === "price-discount") {
//       const { discount_event, value } = event.params;
//       let finalTotal = cart.offer_amount
//         ? cart.offer_amount
//         : cart.total_amount;

//       if (discount_event === "min-item-price") {
//         const order_product_prices = await almanac.factValue(
//           "order_product_prices"
//         );
//         const min = order_product_prices.sort((a, b) => a - b);
//         finalTotal -= min;
//       } else if (discount_event === "fixed-discount") {
//         finalTotal -= value;
//       } else if (discount_event === "percentage-discount") {
//         finalTotal -= (finalTotal * value) / 100;
//       } else if (discount_event === "by-one-get-free") {
//         finalTotal -= finalTotal / 2;
//       } else if (discount_event === "one-item-free") {
//         const findItem = cart.order_items.find(
//           (e) => e.product_id.toString() === value
//         );
//         finalTotal -= findItem?.offer_price || 0;
//       } else if (discount_event === "many-item-free") {
//         if (value?.length <= 0) {
//           return new Error(
//             "Please enter at least one product id to apply rule"
//           );
//         }
//         value.forEach((id) => {
//           const findItem = cart.order_items.find(
//             (e) => e.product_id.toString() === id
//           );
//           finalTotal -= findItem?.offer_price || 0;
//         });
//       }
//       cart.apply_rule_amount = finalTotal.toFixed(2);
//     }
//     return cart;
//   } catch (error) {
//     throw error;
//   }
// };

const discountStrategies = {
  "min-item-price": async ({ cart, almanac }) => {
    const prices = await almanac.factValue("order_product_prices");
    if (!Array.isArray(prices) || prices.length === 0)
      throw new Error("No product prices found");
    const min = Math.min(...prices);
    return min;
  },
  "fixed-discount": ({ value }) => value,
  "percentage-discount": ({ base, value }) => (base * value) / 100,
  "by-one-get-free": ({ base }) => base / 2,
  "one-item-free": ({ cart, value }) => {
    const item = cart.order_items.find(
      (e) => e.product_id.toString() === value
    );
    return item?.offer_price || 0;
  },
  "many-item-free": ({ cart, value }) => {
    if (!Array.isArray(value) || value.length === 0)
      throw new Error("Provide at least one product id");
    return value.reduce((sum, id) => {
      const item = cart.order_items.find((e) => e.product_id.toString() === id);
      return sum + (item?.offer_price || 0);
    }, 0);
  },
};

const handleApplyRule = async ({ event, almanac }) => {
  try {
    const cart = await almanac.factValue("cart");
    if (event.type !== "price-discount") return cart;

    const { discount_event, value } = event.params;
    const baseTotal = cart.offer_amount ?? cart.total_amount;
    let finalTotal = baseTotal;

    if (discountStrategies[discount_event]) {
      const discountValue = await discountStrategies[discount_event]({
        cart,
        almanac,
        value,
        base: baseTotal,
      });
      finalTotal -= discountValue;
    }

    cart.apply_rule_amount = Math.max(finalTotal, 0).toFixed(2);
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
