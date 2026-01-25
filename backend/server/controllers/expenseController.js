const Expense = require("../models/Expense");
const {
  createExpenseSchema,
  updateExpenseSchema,
} = require("../validators/expenseValidator");

// CREATE EXPENSE
exports.addExpense = async (req, res) => {
  try {
    const { error } = createExpenseSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { amount, category, merchant, note, date } = req.body;

    const expense = await Expense.create({
      user: req.user.userId,
      amount,
      category,
      merchant,
      note,
      date,
    });

    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: "Failed to create expense" });
  }
};

// GET EXPENSES (Filters + Pagination + Search + Sort)
exports.getExpenses = async (req, res) => {
  try {
    const userId = req.user.userId;

    const {
      category,
      minAmount,
      maxAmount,
      from,
      to,
      search,
      sort = "date",
      order = "desc",
      page = 1,
      limit = 10,
    } = req.query;

    let filter = { user: userId };

    // Category filter
    if (category) filter.category = category;

    // Amount filter
    if (minAmount || maxAmount) {
      filter.amount = {};
      if (minAmount) filter.amount.$gte = Number(minAmount);
      if (maxAmount) filter.amount.$lte = Number(maxAmount);
    }

    // Date filter
    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = new Date(from);
      if (to) filter.date.$lte = new Date(to);
    }

    // Search
    if (search) {
      filter.$or = [
        { merchant: { $regex: search, $options: "i" } },
        { note: { $regex: search, $options: "i" } },
      ];
    }

    // Sorting
    const sortOption = {};
    sortOption[sort] = order === "asc" ? 1 : -1;

    // Pagination
    const skip = (page - 1) * limit;

    const expenses = await Expense.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const total = await Expense.countDocuments(filter);

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      results: expenses,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
};

// UPDATE EXPENSE
exports.updateExpense = async (req, res) => {
  try {
    const { error } = updateExpenseSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    const { amount, category, merchant, note, date } = req.body;

    if (amount !== undefined) expense.amount = amount;
    if (category !== undefined) expense.category = category;
    if (merchant !== undefined) expense.merchant = merchant;
    if (note !== undefined) expense.note = note;
    if (date !== undefined) expense.date = date;

    await expense.save();

    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: "Failed to update expense" });
  }
};

// DELETE EXPENSE
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Expense deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete expense" });
  }
};
