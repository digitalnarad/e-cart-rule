const mongoServices = require("../config/mongoServices");
const { create_token } = require("../lib/jwt");
const { model_name } = require("../utils/helper");

const findUser = async (payload) => {
  try {
    return await mongoServices.findOne(model_name.USER, payload);
  } catch (error) {
    throw error;
  }
};

const registerUser = async (payload) => {
  try {
    return await mongoServices.createOne(model_name.USER, payload);
  } catch (error) {
    throw error;
  }
};

const create_jwt_token = async (payload) => {
  try {
    return await create_token(payload);
  } catch (error) {
    throw error;
  }
};

const updateUser = async (query, payload) => {
  try {
    return await mongoServices.updateOne(model_name.USER, query, payload, {});
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findUser,
  registerUser,
  create_jwt_token,
  updateUser,
};
