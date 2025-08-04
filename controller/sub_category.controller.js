const { sub_category_services } = require("../services");
const { catchAsync } = require("../utils/common");
const {
  response201,
  response200,
  response400,
} = require("../lib/response-messages");
const { response_msg } = require("../utils/helper");

// get all product
const gteAllSubCategory = catchAsync(async (req, res) => {
  const products = await sub_category_services.findAllSubCategory({
    is_deleted: false,
    is_active: true,
  });
  return response200(res, response_msg.fetchALL, products);
});

// create product
const createSubCategory = catchAsync(async (req, res) => {
  const user = req.user;
  const { category_id } = req.body;

  const category = await sub_category_services.findSubCategory({
    _id: category_id,
    is_deleted: false,
    is_active: true,
  });
  if (!category) return response400(res, response_msg.notFound);

  const newProduct = await sub_category_services.registerSubCategory({
    ...req.body,
    added_by: user._id,
  });
  return response201(res, response_msg.create, newProduct);
});

// get all product
const getSubCategoryByCategory = catchAsync(async (req, res) => {
  const category_id = req.params.category_id;
  const product = await sub_category_services.findAllSubCategory({
    category_id,
  });
  return response200(res, response_msg.fetchALL, product);
});

// update product
const updateSubCategory = catchAsync(async (req, res) => {
  const _id = req.params._id;
  const { category_id } = req.body;
  if (category_id) {
    const category = await sub_category_services.findSubCategory({
      _id: category_id,
    });
    if (!category) return response400(res, response_msg.notFound);
  }

  const updatedCategory = await sub_category_services.updateSubCategory(
    { _id: _id },
    {
      ...req.body,
    }
  );
  return response201(res, response_msg.update_success, updatedCategory);
});

// delete product
const deleteSubCategory = catchAsync(async (req, res) => {
  const _id = req.params._id;
  const subCategory = await sub_category_services.findSubCategory({
    _id: _id,
  });
  if (!subCategory) return response400(res, response_msg.notFound);

  await sub_category_services.updateSubCategory(
    { _id: _id },
    {
      is_deleted: true,
    }
  );

  return response201(res, response_msg.delete_success, {});
});

module.exports = {
  gteAllSubCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getSubCategoryByCategory,
};
