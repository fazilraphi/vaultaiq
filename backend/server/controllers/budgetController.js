const Budget = require("../models/Budget");
const Expense = require("../models/Expense");
const mongoose = require("mongoose");

const { budgetSchema } = require("../validators/budgetValidator");

// CREATE or UPDATE budget
exports.setBudget = async (req, res) => {
  try {
    // Joi validation
    const { error } = budgetSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { category, limit, month, year } = req.body;

    const existing = await Budget.findOne({
      user: req.user.userId,
      category,
      month,
      year,
    });

    // Update if exists
    if (existing) {
      existing.limit = limit;
      await existing.save();

      return res.json({
        message: "Budget updated",
        budget: existing,
      });
    }

    // Create new budget
    const budget = await Budget.create({
      user: req.user.userId,
      category,
      limit,
      month,
      year,
    });

    res.status(201).json({
      message: "Budget created",
      budget,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to set budget" });
  }
};

// GET budgets with calculated usage
exports.getBudgets = async (req, res) => {
  try {
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({
        message: "Month and year query parameters are required",
      });
    }

    const budgets = await Budget.find({
      user: req.user.userId,
      month: Number(month),
      year: Number(year),
    });

    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);

    const expenses = await Expense.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.userId),
          date: { $gte: start, $lt: end },
        },
      },
      {
        $group: {
          _id: "$category",
          spent: { $sum: "$amount" },
        },
      },
    ]);

    const spentMap = {};
    expenses.forEach((e) => {
      spentMap[e._id] = e.spent;
    });

    const result = budgets.map((b) => {
      const spent = spentMap[b.category] || 0;
      const remaining = b.limit - spent;
      const percentageUsed = ((spent / b.limit) * 100).toFixed(1);

      return {
        ...b.toObject(),
        spent,
        remaining,
        percentageUsed,
        exceeded: spent > b.limit,
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch budgets" });
  }
};
