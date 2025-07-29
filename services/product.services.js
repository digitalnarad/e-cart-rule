const { model_name } = require("../utils/helper");
const mongoServices = require("../config/mongoServices");

const createProduct = async (product) => {
  try {
    return await mongoServices.createOne(model_name.PRODUCT, product);
  } catch (error) {
    throw error;
  }
};

const getProduct = async (query) => {
  try {
    return await mongoServices.findAll(model_name.PRODUCT, query);
  } catch (error) {
    throw error;
  }
};

const findProduct = async (query) => {
  try {
    return await mongoServices.findOne(model_name.PRODUCT, query);
  } catch (error) {
    throw error;
  }
};

const updateProduct = async (query, payload) => {
  try {
    return await mongoServices.updateOne(
      model_name.PRODUCT,
      query,
      payload,
      {}
    );
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createProduct,
  findProduct,
  updateProduct,
  getProduct,
};
