const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  getMonthlySummary,
  getSpendingTrends,
  getTopMerchants,
  getInsights,
} = require("../controllers/analyticsController");

router.get("/monthly", auth, getMonthlySummary);
router.get("/trends", auth, getSpendingTrends);
router.get("/top-merchants", auth, getTopMerchants);
router.get("/insights", auth, getInsights);

module.exports = router;
