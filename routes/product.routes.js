const { product_controller } = require("../controller");
const { validateRequest, productValidation } = require("../lib/joi");

// const routes = express.Router()
const routes = require("express").Router();

routes.post(
  "/add",
  validateRequest(productValidation.productValidationSchema),
  product_controller.createProduct
);
routes.get("/get-all", product_controller.gteAllProduct);
routes.get("/get-one/:product_id", product_controller.getProductById);
routes.put(
  "/update/:product_id",
  validateRequest(productValidation.productValidationSchema),
  product_controller.updateProduct
);
routes.delete("/delete/:product_id", product_controller.deleteProduct);

module.exports = routes;
