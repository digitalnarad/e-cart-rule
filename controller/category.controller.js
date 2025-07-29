const { response_msg } = require("../utils/helper");
const { category_services } = require("../services");
const { catchAsync } = require("../utils/common");
const {
  response201,
  response200,
  response400,
} = require("../lib/response-messages");

const gteAllCategory = catchAsync(async (req, res) => {
  const products = await category_services.gteAllCategory({
    is_deleted: false,
    is_active: true,
  });
  return response200(res, response_msg.fetchALL, products);
});

const createCategory = catchAsync(async (req, res) => {
  const user = req.user;
  const newProduct = await category_services.registerCategory({
    ...req.body,
    added_by: user._id,
  });
  return response201(res, response_msg.create, newProduct);
});

const updateCategory = catchAsync(async (req, res) => {
  const category_id = req.params.category_id;
  const category = await category_services.findCategory({
    _id: category_id,
  });
  if (!category) return response400(res, response_msg.notFound);

  const updatedCategory = await category_services.updateCategory(
    { _id: category_id },
    {
      ...req.body,
    }
  );

  return response201(res, response_msg.update_success, updatedCategory);
});

const deleteCategory = catchAsync(async (req, res) => {
  const category_id = req.params.category_id;
  const category = await category_services.findCategory({
    _id: category_id,
  });
  if (!category) return response400(res, response_msg.notFound);

  await category_services.updateCategory(
    { _id: category_id },
    {
      is_deleted: true,
    }
  );

  return response201(res, response_msg.delete_success, {});
});

module.exports = {
  gteAllCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
