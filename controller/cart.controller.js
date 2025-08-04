const {
  response_msg,
  categoryIds,
  subCategoryIds,
} = require("../utils/helper");
const { cart_services, product_services } = require("../services");
const { catchAsync } = require("../utils/common");
const {
  response201,
  response200,
  response400,
} = require("../lib/response-messages");

// get all cart
const gteAllCart = catchAsync(async (req, res) => {
  const carts = await cart_services.findAllCart();
  return response200(res, response_msg.fetchALL, carts);
});

// get cart by user
const getCartByUserId = catchAsync(async (req, res) => {
  const user = req.user;
  const cart = await cart_services.findCartByIds({
    user_id: user._id,
  });
  if (!cart) return response400(res, response_msg.notFound);
  return response200(res, response_msg.fetchSuccessfully, cart);
});

// create cart
const createCart = catchAsync(async (req, res) => {
  const user = req.user;
  const order_items = req.body.order_items;
  const objectIdArray = order_items.map((item) => item.product_id);

  const cart = await cart_services.findCartByIds({
    user_id: user._id,
  });
  if (cart) return response400(res, response_msg.cartAlreadyExist);

  if (!order_items.length) {
    const newCart = await cart_services.registerCart({
      user_id: user._id,
      order_items: [],
      total_amount: 0,
      offer_amount: 0,
      total_order: 0,
      total_product: 0,
    });
    return response201(res, response_msg.create, newCart);
  }

  const findAllProduct = await product_services.getProduct({
    _id: { $in: objectIdArray },
  });

  const newOrderItems = order_items.map((item) => {
    const product = findAllProduct.find(
      (product) => product._id.toString() === item.product_id
    );
    return {
      ...item,
      price: product.price * item.quantity,
      offer_price: product.offer_price * item.quantity,
      category_id: product.category_id,
      sub_category_id: product.sub_category_id,
    };
  });

  const { total_amount, offer_amount, total_order } = newOrderItems.reduce(
    (acc, item) => {
      acc.total_amount += item.price;
      acc.offer_amount += item.offer_price;
      acc.total_order += item.quantity;
      return acc;
    },
    { total_amount: 0, offer_amount: 0, total_order: 0 }
  );

  const total_product = newOrderItems.length;

  const newCart = await cart_services.registerCart({
    user_id: user._id,
    order_items: newOrderItems,
    total_amount,
    offer_amount,
    total_order,
    total_product,
  });
  return response201(res, response_msg.create, newCart);
});

// update cart
const updateCart = catchAsync(async (req, res) => {
  const user = req.user;
  const order_items = req.body.order_items;
  const objectIdArray = order_items.map((item) => item.product_id);
  const cart = await cart_services.findCartByIds({
    user_id: user._id,
  });
  if (!cart) return response400(res, response_msg.notFound);

  const findAllProduct = await product_services.getProduct({
    _id: { $in: objectIdArray },
  });

  const newOrderItems = order_items.map((item) => {
    const product = findAllProduct.find(
      (product) => product._id.toString() === item.product_id
    );
    return {
      ...item,
      price: product.price * item.quantity,
      offer_price: product.offer_price * item.quantity,
      category_id: product.category_id,
      sub_category_id: product.sub_category_id,
    };
  });

  const { total_amount, offer_amount, total_order } = newOrderItems.reduce(
    (acc, item) => {
      acc.total_amount += item.price;
      acc.offer_amount += item.offer_price;
      acc.total_order += item.quantity;
      return acc;
    },
    { total_amount: 0, offer_amount: 0, total_order: 0 }
  );

  const total_product = newOrderItems.length;

  const newCart = await cart_services.updateCart(
    {
      user_id: user._id,
    },
    {
      order_items: newOrderItems,
      total_amount,
      offer_amount,
      total_order,
      total_product,
    }
  );

  return response201(res, response_msg.update_success, newCart);
});

// reset cart
const resetCart = catchAsync(async (req, res) => {
  const user = req.user;

  const cart = await cart_services.findCartByIds({
    user_id: user._id,
  });
  if (!cart) return response400(res, response_msg.notFound);

  await cart_services.updateCart(
    {
      user_id: user._id,
    },
    {
      order_items: [],
      total_amount: 0,
      offer_amount: 0,
      total_order: 0,
      total_product: 0,
    }
  );
  return response201(res, response_msg.resetCart, {});
});

module.exports = {
  gteAllCart,
  createCart,
  updateCart,
  resetCart,
  getCartByUserId,
};
