const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();

// ✅ SIMPLE + SAFE
app.use(cors());

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/expenses", require("./routes/expenseRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));
app.use("/api/budgets", require("./routes/budgetRoutes"));

app.get("/", (req, res) => {
  res.send("VaultaIQ Backend is running");
});

// Error handler
app.use(require("./middleware/errorHandler"));

// DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(console.error);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
