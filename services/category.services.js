const { model_name } = require("../utils/helper");
const mongoServices = require("../config/mongoServices");

const findCategory = async (payload) => {
  try {
    return await mongoServices.findOne(model_name.CATEGORY, payload);
  } catch (error) {
    throw error;
  }
};

const gteAllCategory = async (query) => {
  try {
    return await mongoServices.findAll(model_name.CATEGORY, query);
  } catch (error) {
    throw error;
  }
};

const registerCategory = async (payload) => {
  try {
    return await mongoServices.createOne(model_name.CATEGORY, payload);
  } catch (error) {
    throw error;
  }
};

const updateCategory = async (query, payload) => {
  try {
    return await mongoServices.updateOne(
      model_name.CATEGORY,
      query,
      payload,
      {}
    );
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findCategory,
  registerCategory,
  updateCategory,
  gteAllCategory,
};
