const mongoose = require("mongoose");

const findOne = async (
  model,
  where,
  projection = {},
  options = { lean: true }
) => {
  return await mongoose.model(model).findOne(where, projection, options);
};

const findOnePopulate = async (
  model,
  where,
  projection = {},
  options = { lean: true },
  populate = null
) => {
  try {
    let query = mongoose.model(model).findOne(where, projection, options);

    if (populate) {
      query = query.populate(populate);
    }

    return await query.exec();
  } catch (error) {
    throw new Error(`Error in findOne: ${error.message}`);
  }
};

const createOne = async (model, payload) => {
  return await mongoose.model(model).create(payload);
};

const createMany = async (model, payload) => {
  return await mongoose.model(model).create(payload);
};

const findAll = async (
  model,
  criteria,
  projection = {},
  options = { lean: true, populate: "" }
) => {
  options.lean = true;
  let query = mongoose.model(model).find(criteria, projection, options);

  if (options.populate) query = query.populate(options.populate);
  return await query.exec();
};

const updateOne = async (model, criteria, dataToSet, options = {}) => {
  options = { lean: true, new: true };

  return await mongoose
    .model(model)
    .findOneAndUpdate(criteria, dataToSet, options);
};

const updateMany = async (
  model,
  criteria,
  dataToSet,
  options = { new: false }
) => {
  return await mongoose.model(model).updateMany(criteria, dataToSet, options);
};

const aggregation = async (model, data) => {
  return await mongoose.model(model).aggregate(data);
};

const countDocument = async (modelName, criteria) => {
  return await mongoose.model(modelName).countDocuments(criteria);
};

const deleteDocument = async (model, criteria) => {
  return await mongoose.model(model).findOneAndDelete(criteria);
};

const deleteManyDocument = async (model, criteria) => {
  return await mongoose.model(model).deleteMany(criteria);
};

module.exports = {
  findOne,
  findOnePopulate,
  createOne,
  createMany,
  findAll,
  updateOne,
  updateMany,
  aggregation,
  countDocument,
  deleteDocument,
  deleteManyDocument,
};
