import React from "react";
import { assets } from "../assets/assets.js";
import toast from "react-hot-toast";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

function Login() {
  // create individual state for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // loader
  const [isLoading, setIsLoading] = useState(false);
  // error state
  const [error, setError] = useState("");
  const { login } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // handle login logic here
    // validation can be added similarly as in Register.jsx
    setError("");
    if (!email || !password) {
      setError("All fields are required");
      toast.error("All fields are required");
      return;
    }

    // basic validation
    setIsLoading(true);
    try {
      const result = await login(email, password);

      if (result.success) {
        toast.success(result.message);
        // navigate to login page after successful registration
        // navigate("/login");
      } else {
        console.log(result);

        toast.error(result.message);
        setError(result.message);
      }
    } catch (error) {
      console.log(error);

      toast.error("An unexpected error occurred. Please try again.");
      setError("An unexpected error occurred. Please try again.");
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

          <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-300">
            Sign in to continue your musical journey
          </p>
        </div>
        {/* Register form */}
        <div className="bg-gray-900/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-700">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {" "}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full  px-4 block  py-3 border border-gray-600 rounded-lg  bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                autoComplete="email"
                placeholder="Enter your email address"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full  px-4 block  py-3 border border-gray-600 rounded-lg  bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                autoComplete="new-password"
                placeholder="Enter your password"
              />
            </div>
            {/* submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4  border border-transparent rounded-lg  shadow-sm  text-sm text-white font-medium bg-green-500 hover:bg-green-600 focus:outline-none   focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
              {isLoading ? "Logging in..." : "Sign In"}
            </button>
          </form>
          {/* Switch to register */}
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">
              Don't have an account?{" "}
              <button className="text-green-400 hover:text-green-500 font-medium transition-colors  cursor-pointer">
                Sign up here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
