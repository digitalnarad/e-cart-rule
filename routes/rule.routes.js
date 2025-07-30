const { rule_controller } = require("../controller");
const { validateRequest, ruleValidation } = require("../lib/joi");

const routes = require("express").Router();

routes.get("/get-all", rule_controller.gteAllRule);
routes.post(
  "/add",
  validateRequest(ruleValidation.addRule),
  rule_controller.createRule
);
routes.put(
  "/update/:_id",
  validateRequest(ruleValidation.updateRule),
  rule_controller.updateRule
);
routes.delete("/delete/:_id", rule_controller.deleteRule);

routes.get("/apply-rule/:_id", rule_controller.ApplyRule);

module.exports = routes;
