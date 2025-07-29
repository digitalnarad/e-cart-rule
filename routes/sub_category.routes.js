const { sub_category_controller } = require("../controller");
const { validateRequest, subCategoryValidation } = require("../lib/joi");

const router = require("express").Router();

router.get("/get-all", sub_category_controller.gteAllSubCategory);

router.get(
  "/get-by-category/:category_id",
  sub_category_controller.getSubCategoryByCategory
);

router.post(
  "/add",
  validateRequest(subCategoryValidation.subCategoryValidationSchema),
  sub_category_controller.createSubCategory
);

router.put(
  "/update/:_id",
  validateRequest(subCategoryValidation.subCategoryValidationSchema),
  sub_category_controller.updateSubCategory
);

router.delete("/delete/:_id", sub_category_controller.deleteSubCategory);

module.exports = router;
