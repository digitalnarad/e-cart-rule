const { cart_controller } = require("../controller");
const { validateRequest, cartValidation } = require("../lib/joi");
const router = require("express").Router();

// this create api not use its getting error already exist because cart is already created on signup
router.post(
  "/add",
  validateRequest(cartValidation.updateCart),
  cart_controller.createCart
);

router.get("/get-all", cart_controller.gteAllCart);
router.get("/get-by-user-id", cart_controller.getCartByUserId);
router.put(
  "/update",
  validateRequest(cartValidation.updateCart),
  cart_controller.updateCart
);
router.post("/reset-cart", cart_controller.resetCart);

module.exports = router;
