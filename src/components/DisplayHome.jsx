import React from "react";
import { useAuth } from "../context/AuthContext";

function DisplayHome() {
  const { logout } = useAuth();
  const handleLogout = () => {
    // Implement logout functionality here
    logout();
    console.log("Logout clicked");
  };
  return (
    <div>
      <div>Displaying the albums and songs</div>
      <button
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-full text-lg font-semibold hover:bg-red-700 transition-colors"
        onClick={handleLogout}
      >
        logout
      </button>
    </div>
  );
}

export default DisplayHome;
