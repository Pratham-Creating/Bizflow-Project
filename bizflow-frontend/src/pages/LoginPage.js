import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import googleLogo from "./google.png"; // Import the image

const LoginPage = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleGoogleSignIn = () => {
    console.log("Google Sign-In clicked");
  };

  const handleSignUp = () => {
    console.log("Redirecting to sign-up page...");
  };

  const handleLogin = () => {
    window.alert("Login Successful"); // Display success message
    navigate("/"); // Navigate to the Home page
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(to right, #74c2e6, #2be3e9)",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      {/* Main Container */}
      <div className="flex w-full max-w-4xl shadow-lg rounded-lg overflow-hidden">
        {/* Left Section - Login Form */}
        <div className="w-1/2 bg-[#2b3e50] p-8">
          <h2 className="text-4xl text-white font-bold mb-6 text-center">
            Login
          </h2>

          {/* Input Fields */}
          <div className="mb-4">
            <label className="text-white block mb-2">Username</label>
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full p-3 rounded-lg border-none bg-white text-black placeholder-gray-400"
            />
          </div>

          <div className="mb-4">
            <label className="text-white block mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full p-3 rounded-lg border-none bg-white text-black placeholder-gray-400"
            />
          </div>

          <div className="mb-4">
            <label className="text-white block mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full p-3 rounded-lg border-none bg-white text-black placeholder-gray-400"
            />
          </div>

          {/* Login Button */}
          <button
            className="w-full bg-[#e74c3c] text-white py-3 rounded-lg hover:bg-[#c0392b] transition"
            onClick={handleLogin} // Call handleLogin function
          >
            Login
          </button>

          {/* Divider */}
          <div className="text-center text-white my-4">OR</div>

          {/* Google Sign-In */}
          <button
            className="w-full bg-[#e74c3c] text-white py-3 rounded-lg flex items-center justify-center hover:bg-[#c0392b] transition"
            onClick={handleGoogleSignIn}
          >
            <img
              src={googleLogo}
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Sign in with Google
          </button>
        </div>

        {/* Right Section - Welcome */}
        <div className="w-1/2 bg-[#34495e] p-8 flex flex-col items-center justify-center text-white">
          <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-center mb-8">
            Login to access your account and explore new features.
          </p>

          <h3 className="text-2xl font-semibold mb-4">Not a Member Yet?</h3>
          <p className="text-center mb-8 px-6">
            Sign up today and start achieving your goals! Whether it's improving
            your skills, staying organized, or reaching your targets, we're here
            to help.
          </p>

          {/* Sign Up Button */}
          <button
            className="bg-[#e74c3c] py-3 px-6 rounded-lg hover:bg-[#c0392b] transition"
            onClick={handleSignUp}
          >
            Sign Up Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
