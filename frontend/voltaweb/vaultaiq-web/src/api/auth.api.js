import api from "./axios";

// REGISTER
export function registerUser(data) {
  return api.post("/auth/register", data);
}

// LOGIN
export function loginUser(data) {
  return api.post("/auth/login", data);
}

// GET CURRENT USER
export function getCurrentUser() {
  return api.get("/users/me");
}
