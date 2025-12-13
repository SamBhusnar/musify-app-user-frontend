import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Register from "./Register";
import Login from "./Login";

function AuthWrapper({ children }) {
  const [showRegister, setShowRegister] = useState(false);
  const { isAuthenticated } = useAuth(); // Ensure authentication context is initialized
  if (!isAuthenticated) {
    return showRegister ? <Register /> : <Login />;
  }
  return children;
}

export default AuthWrapper;
