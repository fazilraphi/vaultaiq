const Joi = require("joi");

exports.createExpenseSchema = Joi.object({
  amount: Joi.number().positive().required(),
  category: Joi.string().min(2).max(50).required(),
  merchant: Joi.string().allow("", null).max(100),
  note: Joi.string().allow("", null).max(200),
  date: Joi.date().optional(),
});

exports.updateExpenseSchema = Joi.object({
  amount: Joi.number().positive().optional(),
  category: Joi.string().min(2).max(50).optional(),
  merchant: Joi.string().allow("", null).max(100),
  note: Joi.string().allow("", null).max(200),
  date: Joi.date().optional(),
});
