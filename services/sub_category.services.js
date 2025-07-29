const { model_name } = require("../utils/helper");
const mongoServices = require("../config/mongoServices");

const findSubCategory = async (payload) => {
  try {
    return await mongoServices.findOne(model_name.SUB_CATEGORY, payload);
  } catch (error) {
    throw error;
  }
};

const findAllSubCategory = async (query) => {
  try {
    return await mongoServices.findAll(model_name.SUB_CATEGORY, query);
  } catch (error) {
    throw error;
  }
};

const registerSubCategory = async (payload) => {
  try {
    return await mongoServices.createOne(model_name.SUB_CATEGORY, payload);
  } catch (error) {
    throw error;
  }
};

const updateSubCategory = async (query, payload) => {
  try {
    return await mongoServices.updateOne(
      model_name.SUB_CATEGORY,
      query,
      payload,
      {}
    );
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findSubCategory,
  findAllSubCategory,
  registerSubCategory,
  updateSubCategory,
};
