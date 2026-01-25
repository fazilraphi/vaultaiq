const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Models
require("./models/User");

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const budgetRoutes = require("./routes/budgetRoutes");

// Middleware
app.use(express.json());

// Routes registration
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/budgets", budgetRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("VaultaIQ Backend is running");
});

// Error handler must come AFTER routes
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });

// Start server LAST
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
