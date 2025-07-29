const { rule_controller } = require("../controller");

const routes = require("express").Router();

routes.get("/get-all", rule_controller.gteAllRule);
routes.post("/add", rule_controller.createRule);
routes.put("/update/:_id", rule_controller.updateRule);
routes.delete("/delete/:_id", rule_controller.deleteRule);

routes.get("/apply-rule/:_id", rule_controller.ApplyRule);

module.exports = routes;
