const { model_name } = require("../utils/helper");
const mongoServices = require("../config/mongoServices");

const gteCart = async (query) => {
  try {
    const pipeline = [
      {
        $match: query,
      },
      {
        $unwind: "$order_items",
      },

      {
        $lookup: {
          from: "products",
          localField: "order_items.product_id",
          foreignField: "_id",
          as: "product_details",
        },
      },

      {
        $unwind: {
          path: "$product_details",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $group: {
          _id: "$_id",
          user_id: { $first: "$user_id" },
          added_by: { $first: "$added_by" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          order_items: {
            $push: {
              product_id: "$order_items.product_id",
              quantity: "$order_items.quantity",
              product_details: "$product_details",
            },
          },
        },
      },
    ];
    return await mongoServices.aggregation(model_name.CART, pipeline);
  } catch (error) {
    throw error;
  }
};

const findCartByIds = async (query) => {
  console.log("query", query);
  try {
    return await mongoServices.findOne(model_name.CART, query);
  } catch (error) {
    throw error;
  }
};

const registerCart = async (payload) => {
  try {
    return await mongoServices.createOne(model_name.CART, payload);
  } catch (error) {
    throw error;
  }
};

const updateCart = async (query, payload) => {
  try {
    return await mongoServices.updateOne(model_name.CART, query, payload, {});
  } catch (error) {
    throw error;
  }
};

module.exports = {
  gteCart,
  registerCart,
  updateCart,
  findCartByIds,
};
