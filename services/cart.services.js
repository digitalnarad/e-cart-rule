const { model_name } = require("../utils/helper");
const mongoServices = require("../config/mongoServices");

const findAllCart = async () => {
  try {
    return await mongoServices.findAll(model_name.CART, {});
  } catch (error) {
    throw error;
  }
};
const findCartByIds = async (query) => {
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
  findAllCart,
  registerCart,
  updateCart,
  findCartByIds,
};
