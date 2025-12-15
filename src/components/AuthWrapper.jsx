import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Register from "./Register";
import Login from "./Login";

function AuthWrapper({ children }) {
  const [showRegister, setShowRegister] = useState(false);
  const { isAuthenticated, loading } = useAuth(); // Ensure authentication context is initialized
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }
  if (!isAuthenticated()) {
    return showRegister ? (
      <Register onSwitchToLogin={() => setShowRegister(false)} />
    ) : (
      <Login onSwitchToRegister={() => setShowRegister(true)} />
    );
  }
  return children;
}

export default AuthWrapper;
