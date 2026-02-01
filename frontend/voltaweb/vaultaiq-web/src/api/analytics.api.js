import api from "./axios";

// Monthly summary
export function getMonthlySummary(year, month) {
  return api.get("/analytics/monthly", {
    params: { year, month },
  });
}

// Spending trends (MONTH SCOPED)
export function getSpendingTrends(year, month) {
  return api.get("/analytics/trends", {
    params: { year, month },
  });
}

// Top merchants (MONTH SCOPED)
export function getTopMerchants(year, month) {
  return api.get("/analytics/top-merchants", {
    params: { year, month },
  });
}

// Insights (MONTH SCOPED)
export function getInsights(year, month) {
  return api.get("/analytics/insights", {
    params: { year, month },
  });
}
