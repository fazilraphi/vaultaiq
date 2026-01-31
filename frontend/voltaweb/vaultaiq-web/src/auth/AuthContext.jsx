import { createContext, useContext, useState } from "react";
import { loginUser } from "../api/auth.api";
import { getToken, setToken, removeToken } from "../utils/token";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setAuthToken] = useState(getToken());

  const login = async (credentials) => {
    const res = await loginUser(credentials);
    setToken(res.data.token);
    setAuthToken(res.data.token);
  };

  const logout = () => {
    removeToken();
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};
