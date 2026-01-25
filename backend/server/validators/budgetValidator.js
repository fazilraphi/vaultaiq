const Joi = require("joi");

exports.budgetSchema = Joi.object({
  category: Joi.string().min(2).max(50).required(),
  limit: Joi.number().positive().required(),
  month: Joi.number().min(1).max(12).required(),
  year: Joi.number().min(2020).required(),
});
