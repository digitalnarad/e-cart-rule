const { Engine } = require("json-rules-engine");

class RuleEngineService {
  constructor() {
    this.engine = new Engine();
  }

  addOrderItemsFact(factName, processorFn) {
    this.engine.addFact(factName, async (params, almanac) => {
      const cart = await almanac.factValue("cart");
      return processorFn(cart);
    });
  }

  async initialize(rules) {
    for (const rule of rules) {
      if (rule) {
        rule.event.params.rule_id = rule._id.toString();
        rule.event.params.priority = rule.priority;
        this.engine.addRule({ ...rule });
      }
    }

    this.addOrderItemsFact("order_item_ids", (cart) =>
      cart.order_items.map((item) => item.product_id.toString())
    );

    this.addOrderItemsFact("order_product_prices", (cart) =>
      cart.order_items.map((item) => item.offer_price / item.quantity)
    );
  }

  async run(facts) {
    if (!this.engine) {
      throw new Error("Engine not initialized");
    }
    const res = await this.engine.run(facts);
    return { events: res.events, almanac: res.almanac };
  }
}

module.exports = RuleEngineService;
