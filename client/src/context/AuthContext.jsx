import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const url = "http://localhost:5000";

  const checkStatus = async () => {
    try {
      const response = await axios.get(`${url}/api/auth/validate-token`, {
        withCredentials: true,
      });

      if (response.data.isAuthenticated) {
        const userResponse = await axios.get(`${url}/api/auth/get-user`, {
          withCredentials: true,
        });
        setUser(userResponse.data.user);
      }

      setIsAuthenticated(response.data.isAuthenticated);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const logout = async () => {
    try {
      await axios.post(`${url}/api/auth/logout`, {}, { withCredentials: true });
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, logout, url ,setIsAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
