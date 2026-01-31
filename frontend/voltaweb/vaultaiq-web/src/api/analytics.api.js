import api from "./axios";

// Monthly summary (total + category breakdown)
export function getMonthlySummary(year, month) {
  return api.get("/analytics/monthly", {
    params: { year, month },
  });
}

// Spending trends (last 6 months)
export function getSpendingTrends() {
  return api.get("/analytics/trends");
}

// Top merchants
export function getTopMerchants() {
  return api.get("/analytics/top-merchants");
}

// AI-style insights
export function getInsights() {
  return api.get("/analytics/insights");
}
