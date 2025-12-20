import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
export const API_BASE_URL = "http://localhost:8080";

const AuthContext = createContext(null);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("userToken") || null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // setLoading(true);
    const storedToken = localStorage.getItem("userToken");
    const storedUserData = localStorage.getItem("userData");
    if (storedToken && storedUserData) {
      setToken(storedToken);
      setUser(JSON.parse(storedUserData));
    }
    setLoading(false);
  }, []);
  const register = async (email, password) => {
    // registration logic here
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        email,
        password,
      });
      console.log(response);

      console.log("Registration successful:", response.data);
      if (response.status === 201) {
        // Registration successful
        return {
          success: true,
          message: "Registration successful",
        };
        return true;
      } else {
        return {
          success: false,
          message: response.data.message || "Registration failed",
        };
      }
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Network error , please try again later !",
      };
    }
  };
  // login logic here
  const login = async (email, password) => {
    // implement login logic
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password,
        portal: "user",
      });
      console.log(response);
      if (response.status === 200) {
        // Login successful
        setToken(response.data.token);
        setUser({ email: response.data.email, role: response.data.role });
        localStorage.setItem("userToken", response.data.token);
        localStorage.setItem(
          "userData",
          JSON.stringify({
            email: response.data.email,
            role: response.data.role,
          })
        );
        return {
          success: true,
          message: "Login successful",
        };
      } else {
        return {
          success: false,
          message: response.data.message || "Login failed",
        };
      }
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Network error , please try again later !",
      };
    }
  };
  const isAuthenticated = () => {
    return !!token && !!user;
  };
  const getAuthHeaders = () => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  };
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    toast.success("Logged out successfully");
  };
  const contextValue = {
    register,
    login,
    isAuthenticated,
    loading,
    logout,
    user,
    token,
    getAuthHeaders,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
