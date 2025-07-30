const { category_controller } = require("../controller");
const { validateRequest, categoryValidation } = require("../lib/joi");
const router = require("express").Router();

router.get("/get-all", category_controller.gteAllCategory);
router.delete("/delete/:category_id", category_controller.deleteCategory);

router.post(
  "/add",
  validateRequest(categoryValidation.addCategory),
  category_controller.createCategory
);
router.put(
  "/update/:category_id",
  validateRequest(categoryValidation.updateCategory),
  category_controller.updateCategory
);

module.exports = router;
