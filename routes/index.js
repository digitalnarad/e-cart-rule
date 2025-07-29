const router = require("express").Router();
const productRoutes = require("./product.routes");
const ruleRoutes = require("./rule.routes");
const userRoutes = require("./user.routes");
const categoryRoutes = require("./category.routes");
const subCategoryRoutes = require("./sub_category.routes");
const cartRoutes = require("./cart.routes");
const { isAuthenticated } = require("../middleware/isAuthenticated");

router.use(`/user`, userRoutes);

// with auth
router.use(`/product`, isAuthenticated, productRoutes);
router.use(`/category`, isAuthenticated, categoryRoutes);
router.use(`/sub-category`, isAuthenticated, subCategoryRoutes);
router.use(`/cart`, isAuthenticated, cartRoutes);
router.use(`/rule`, isAuthenticated, ruleRoutes);

module.exports = router;
