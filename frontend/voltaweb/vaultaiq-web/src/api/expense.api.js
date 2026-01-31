import api from "./axios";

// CREATE
export function addExpense(data) {
  return api.post("/expenses", data);
}

// READ (filters, pagination)
export function getExpenses(params) {
  return api.get("/expenses", { params });
}

// UPDATE
export function updateExpense(id, data) {
  return api.put(`/expenses/${id}`, data);
}

// DELETE
export function deleteExpense(id) {
  return api.delete(`/expenses/${id}`);
}
