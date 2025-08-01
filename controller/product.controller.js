const { response_msg } = require("../utils/helper");
const {
  product_services,
  category_services,
  sub_category_services,
} = require("../services");
const { catchAsync } = require("../utils/common");
const {
  response200,
  response201,
  response400,
} = require("../lib/response-messages");

const gteAllProduct = catchAsync(async (req, res) => {
  const products = await product_services.getProduct({
    is_deleted: false,
    is_active: true,
  });
  return response200(res, response_msg.fetchALL, products);
});

const createProduct = catchAsync(async (req, res) => {
  const user = req.user;
  const { category_id, sub_category_id } = req.body;

  const category = await category_services.findCategory({ _id: category_id });
  if (!category) return response400(res, response_msg.notFound);

  const sub_category = await sub_category_services.findSubCategory({
    _id: sub_category_id,
  });
  if (!sub_category) return response400(res, response_msg.notFound);

  const newProduct = await product_services.createProduct({
    ...req.body,
    added_by: user._id,
  });
  return response201(res, response_msg.create, newProduct);
});

const getProductById = catchAsync(async (req, res) => {
  const product_id = req.params.product_id;
  const product = await product_services.findProduct({
    _id: product_id,
  });
  return response200(res, response_msg.fetchALL, product);
});

const updateProduct = catchAsync(async (req, res) => {
  const product_id = req.params.product_id;
  const { category_id, sub_category_id } = req.body;

  const product = await product_services.findProduct({
    _id: product_id,
  });
  if (!product) return response400(res, response_msg.notFound);

  if (category_id) {
    const category = await category_services.findCategory({ _id: category_id });
    if (!category) return response400(res, response_msg.notFound);
  }

  if (sub_category_id) {
    const sub_category = await sub_category_services.findSubCategory({
      _id: sub_category_id,
    });
    if (!sub_category) return response400(res, response_msg.notFound);
  }

  const newProduct = await product_services.updateProduct(
    { _id: product_id },
    {
      ...req.body,
    }
  );
  return response201(res, response_msg.update_success, newProduct);
});

const deleteProduct = catchAsync(async (req, res) => {
  const product_id = req.params.product_id;
  const product = await product_services.findProduct({
    _id: product_id,
  });
  if (!product) return response400(res, response_msg.notFound);

  await product_services.updateProduct(
    { _id: product_id },
    {
      is_deleted: true,
    }
  );

  return response201(res, response_msg.delete_success, {});
});

module.exports = {
  gteAllProduct,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
