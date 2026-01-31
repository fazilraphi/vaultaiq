import api from "./axios";

export function getDashboardData(year, month) {
  return Promise.all([
    api.get("/analytics/monthly", { params: { year, month } }),
    api.get("/budgets", { params: { year, month } }),
    api.get("/analytics/insights"),
  ]);
}
