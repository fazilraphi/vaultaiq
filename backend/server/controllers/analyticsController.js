const Expense = require("../models/Expense");
const mongoose = require("mongoose");

/**
 * Helper: get month date range
 */
const getMonthRange = (year, month) => {
  const y = Number(year);
  const m = Number(month);

  const start = new Date(y, m - 1, 1);
  const end = new Date(y, m, 1);

  return { start, end };
};

/**
 * 1. Monthly Summary (Total + Category Breakdown)
 */
exports.getMonthlySummary = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { year, month } = req.query;

    if (!year || !month) {
      return res.status(400).json({ message: "Year and month are required" });
    }

    const { start, end } = getMonthRange(year, month);

    const summary = await Expense.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          date: { $gte: start, $lt: end },
        },
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
    ]);

    const totalSpent = summary.reduce((sum, c) => sum + c.total, 0);

    res.json({
      totalSpent,
      breakdown: summary,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to generate monthly summary" });
  }
};

/**
 * 2. Spending Trend (Daily trend for selected month)
 */
exports.getSpendingTrends = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { year, month } = req.query;

    if (!year || !month) {
      return res.status(400).json({ message: "Year and month are required" });
    }

    const { start, end } = getMonthRange(year, month);

    const trends = await Expense.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          date: { $gte: start, $lt: end },
        },
      },
      {
        $group: {
          _id: { $dayOfMonth: "$date" },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(trends);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch spending trends" });
  }
};

/**
 * 3. Top Merchants (MONTH SCOPED)
 */
exports.getTopMerchants = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { year, month } = req.query;

    if (!year || !month) {
      return res.status(400).json({ message: "Year and month are required" });
    }

    const { start, end } = getMonthRange(year, month);

    const topMerchants = await Expense.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          merchant: { $ne: null },
          date: { $gte: start, $lt: end },
        },
      },
      {
        $group: {
          _id: "$merchant",
          total: { $sum: "$amount" },
        },
      },
      { $sort: { total: -1 } },
      { $limit: 5 },
    ]);

    res.json(topMerchants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch top merchants" });
  }
};

/**
 * 4. Insights (MONTH SCOPED – FIXED BUG)
 */
exports.getInsights = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { year, month } = req.query;

    if (!year || !month) {
      return res.status(400).json({ message: "Year and month are required" });
    }

    const { start, end } = getMonthRange(year, month);

    const expenses = await Expense.find({
      user: userId,
      date: { $gte: start, $lt: end },
    });

    if (expenses.length === 0) {
      return res.json({
        insights: ["No spending recorded for this month yet."],
      });
    }

    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    const avg = total / expenses.length;

    const categoryTotals = {};
    expenses.forEach((e) => {
      categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
    });

    const insights = [];

    for (const [category, amount] of Object.entries(categoryTotals)) {
      if (amount > total * 0.4) {
        insights.push(
          `You are spending a large portion on ${category} this month.`,
        );
      }
    }

    if (avg > 500) {
      insights.push("Your average expense this month is quite high.");
    }

    if (insights.length === 0) {
      insights.push("Your spending looks balanced this month.");
    }

    res.json({ insights });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to generate insights" });
  }
};
