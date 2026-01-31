import api from "./axios";

// CREATE or UPDATE budget
export function setBudget(data) {
  return api.post("/budgets", data);
}

// GET budgets for month/year
export function getBudgets(month, year) {
  return api.get("/budgets", {
    params: { month, year },
  });
}
