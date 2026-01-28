const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();

/* -------------------- CORS (FIXED FOR BROWSERS) -------------------- */
app.use(
  cors({
    origin: "*", // allow all frontends for now (safe for dev)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Important: respond to preflight explicitly
app.options("*", cors());

/* -------------------- MIDDLEWARE -------------------- */
app.use(express.json());

/* -------------------- MODELS -------------------- */
require("./models/User");

/* -------------------- ROUTES -------------------- */
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const budgetRoutes = require("./routes/budgetRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/budgets", budgetRoutes);

/* -------------------- TEST ROUTE -------------------- */
app.get("/", (req, res) => {
  res.send("VaultaIQ Backend is running");
});

/* -------------------- ERROR HANDLER -------------------- */
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

/* -------------------- DATABASE -------------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB error:", err.message));

/* -------------------- SERVER -------------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
