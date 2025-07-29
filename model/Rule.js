const mongoose = require("mongoose");
const { model_name } = require("../utils/helper");

const eventSchema = new mongoose.Schema({
  type: { type: String, required: true },
  params: {
    message: {
      type: String,
    },
    discount_event: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
    },
  },
});

const ruleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rule_description: { type: String, required: true, default: "" },
    priority: {
      type: Number,
      required: true,
      default: 0,
    },
    is_active: { type: Boolean, required: true, default: true },
    is_deleted: { type: Boolean, default: false },
    added_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: model_name.USER,
      required: true,
    },
    conditions: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    event: { type: eventSchema, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model(model_name.RULE, ruleSchema);

const data = {
  all: [
    {
      any: [
        {
          type: "event",
          params: {
            discount_event: "total_amount",
            value: 100,
          },
        },
        {
          all: [
            {
              fact: "cart",
              path: "$.total_amount",
              operator: "greaterThanInclusive",
              value: 100,
            },
            {
              fact: "cart",
              path: "$.total_amount",
              operator: "lessThanInclusive",
              value: 200,
            },
          ],
        },
      ],
    },
  ],
};
