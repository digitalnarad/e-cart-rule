const { response_msg } = require("../utils/helper");
const { rule_services, cart_services } = require("../services");
const {
  response201,
  response200,
  response400,
} = require("../lib/response-messages");
const { catchAsync } = require("../utils/common");
const RuleEngineService = require("../lib/rules-engine");

const gteAllRule = catchAsync(async (req, res) => {
  const rules = await rule_services.getAllRule({});
  response200(res, response_msg.fetchALL, rules);
});

// create rule
const createRule = catchAsync(async (req, res) => {
  const newRule = await rule_services.createRule({
    ...req.body,
    added_by: req.user._id,
  });
  response201(res, response_msg.create, { ...newRule.toObject() });
});

// update rule
const updateRule = catchAsync(async (req, res) => {
  const _id = req.params._id;

  const rule = await rule_services.findRule({ _id });
  if (!rule) return response400(res, response_msg.notFound);

  const newRule = await rule_services.update({ _id }, { ...req.body });
  response201(res, response_msg.update_success, { ...newRule });
});

// delete rule
const deleteRule = catchAsync(async (req, res) => {
  const _id = req.params._id;
  const rule = await rule_services.findRule({ _id });
  if (!rule) return response400(res, response_msg.notFound);

  await rule_services.update({ _id }, { is_deleted: true });
  response201(res, response_msg.delete_success, {});
});

// apply rule
const ApplyRule = catchAsync(async (req, res) => {
  const _id = req.params._id;

  const ruleEngineService = new RuleEngineService();

  const cart = await cart_services.findCartByIds({ _id });
  if (!cart) return response400(res, response_msg.notFound);

  const category_ids = [
    ...new Set(cart.order_items.map((item) => item.category_id.toString())),
  ];

  const sub_category_ids = [
    ...new Set(cart.order_items.map((item) => item.sub_category_id.toString())),
  ];

  cart.category_ids = category_ids;
  cart.sub_category_ids = sub_category_ids;

  const rules = await rule_services.getAllRule({
    is_active: true,
    is_deleted: false,
  });

  await ruleEngineService.initialize(rules);

  const { events, almanac } = await ruleEngineService.run({ cart });

  if (!events.length) {
    response200(res, "No discount applied", {
      cart: {
        ...cart,
        apply_rule_amount: cart.offer_amount,
      },
      discount_message: "No discount applied",
    });
    return;
  }

  events.sort((a, b) => b.params.priority - a.params.priority);
  const event = events[0];

  const updatedCart = await rule_services.handleApplyRule({ event, almanac });

  delete updatedCart.category_ids;
  delete cart.sub_category_ids;

  response200(res, "apply rule", {
    cart: updatedCart,
    discount_message: event?.params?.message,
  });
});

module.exports = {
  gteAllRule,
  createRule,
  ApplyRule,
  updateRule,
  deleteRule,
};
