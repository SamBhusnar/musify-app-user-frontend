import React from "react";
import { assets } from "../assets/assets.js";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Register({ onSwitchToLogin }) {
  // create individual state for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // loader
  const [isLoading, setIsLoading] = useState(false);
  // error state
  const [error, setError] = useState("");
  const { register } = useAuth();
  // const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // basic validation
    if (!email || !password || !confirmPassword) {
      setError("All fields are required");
      toast.error("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      const result = await register(email, password);
      setIsLoading(false);
      if (result.success) {
        toast.success(result.message);
        // navigate to login page after successful registration
        // navigate("/login");
        onSwitchToLogin();
      } else {
        toast.error(result.message);
        setError(result.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-black- to-green-900 flex items-center justify-center">
      <div className="max-w-md w-full  space-y-8">
        {/* Header */}
        <div className="text-center ">
          <div className="flex items-center justify-center mb-6 ">
            <img src={assets.logo} alt="logo" className="h-16 w-16   " />
            <h1 className="ml-3 text-3xl font-bold text-white">Musify</h1>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">Join Musify</h2>
          <p className="text-gray-300">
            Create an account to start your musical journey
          </p>
        </div>
        {/* Registration form */}
        <div className="bg-gray-900/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-700">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* error state */}
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-300 p-3  rounded-lg text-sm">
                {error}
              </div>
            )}
            {/* email field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full  px-4 block  py-3 border border-gray-600 rounded-lg  bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                autoComplete="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* password field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full  px-4 block  py-3 border border-gray-600 rounded-lg  bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                autoComplete="new-password"
                placeholder="create your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* confirm password field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                className="w-full  px-4 block  py-3 border border-gray-600 rounded-lg  bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                autoComplete="new-password"
                placeholder=" Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {/* submit button */}
            <button
              type="submit"
              className="w-full py-3 px-4  border border-transparent rounded-lg  shadow-sm  text-sm text-white font-medium bg-green-500 hover:bg-green-600 focus:outline-none   focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center ">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-3"></div>
                  Creating Account...
                </div>
              ) : (
                <>Create Account</>
              )}
            </button>
          </form>
          {/* Switch to login */}
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <button
                className="text-green-400 hover:text-green-500 font-medium transition-colors  cursor-pointer"
                onClick={onSwitchToLogin}
              >
                "Sign in here"
              </button>
            </p>
          </div>
          {/* terms and conditions */}
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">
              By registering, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
