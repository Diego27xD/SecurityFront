import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://localhost:7182"; // Reemplaza con la URL de tu API

const AuthContext = createContext({
  isAuthenticated: false,
  saveToken: (token) => {},
  getAccessToken: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  const saveSessionToken = async (token) => {
    setAccessToken(token);
    setIsAuthenticated(true);
    localStorage.setItem("token", JSON.stringify(token));
  };

  const saveToken = async (token) => {
    await saveSessionToken(token);
  };

  const getAccessToken = () => {
    const tokenData = localStorage.getItem("token");
    if (tokenData) {
      const token = JSON.parse(tokenData);
      return token;
    }
    return null;
  };

  const checkAuth = async () => {
    const isToken = await getAccessToken();

    if (isToken) {
      setIsAuthenticated(true);
      setAccessToken(isToken);
    } else {
      setIsAuthenticated(false);
      setAccessToken("");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, saveToken, getAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
