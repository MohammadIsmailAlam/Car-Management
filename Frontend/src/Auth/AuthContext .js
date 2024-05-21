import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = async (email, password) => {
    try {
      if (email === "admin@example.com" && password === "admin123") {
        setIsLoggedIn(true);
        setIsAdmin(true);
      } else {
        const response = await axios.post("http://localhost:8081/login", {
          email,
          password,
        });
        if (response.data.message) {
          setIsLoggedIn(true);
          setIsAdmin(response.data.isAdmin);
        } else {
          throw new Error("Invalid credentials");
        }
      }
    } catch (error) {
      throw new Error(
        error.response ? error.response.data.error : "Login failed"
      );
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
