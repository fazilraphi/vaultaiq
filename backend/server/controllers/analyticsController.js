const Expense = require("../models/Expense");
const mongoose = require("mongoose");

// 1. Monthly Summary (Total + Category Breakdown)
exports.getMonthlySummary = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { year, month } = req.query;

    if (!year || !month) {
      return res.status(400).json({ message: "Year and month are required" });
    }

    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);

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
    res.status(500).json({ message: "Failed to generate monthly summary" });
  }
};

// 2. Spending Trend (Last 6 months)
exports.getSpendingTrends = async (req, res) => {
  try {
    const userId = req.user.userId;

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const trends = await Expense.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          date: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    res.json(trends);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch trends" });
  }
};

// 3. Top Merchants
exports.getTopMerchants = async (req, res) => {
  try {
    const userId = req.user.userId;

    const topMerchants = await Expense.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          merchant: { $ne: null },
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
    res.status(500).json({ message: "Failed to fetch top merchants" });
  }
};

// 4. Basic AI-style Insights
exports.getInsights = async (req, res) => {
  try {
    const userId = req.user.userId;

    const expenses = await Expense.find({ user: userId });

    if (expenses.length === 0) {
      return res.json({ insights: ["No spending data available yet."] });
    }

    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    const avg = total / expenses.length;

    const foodTotal = expenses
      .filter((e) => e.category === "Food")
      .reduce((sum, e) => sum + e.amount, 0);

    const insights = [];

    if (foodTotal > total * 0.4) {
      insights.push("You are spending a large portion on Food.");
    }

    if (avg > 500) {
      insights.push("Your average expense is quite high.");
    }

    if (insights.length === 0) {
      insights.push("Your spending looks balanced.");
    }

    res.json({ insights });
  } catch (err) {
    res.status(500).json({ message: "Failed to generate insights" });
  }
};
