import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MainLoder from "../components/Loader/MainLoder";

function SignUp() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // 1. New state to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signup({ email, password, username: fullname });
      alert("Account created successfully! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100">
        <MainLoder />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl shadow-teal-200 p-8 space-y-6">
        <h2 className="text-center text-2xl font-extrabold text-black sm:text-3xl ">
          Create your account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label htmlFor="fullname" className="block text-sm font-medium text-teal-400">
              Full Name
            </label>
            <input
              id="fullname"
              name="fullname"
              type="text"
              autoComplete="name"
              required
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-teal-400">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          {/* Password Section with Eye Button */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-teal-400">
              Password
            </label>
            
            {/* 2. Added relative wrapper */}
            <div className="relative mt-1">
              <input
                id="password"
                name="password"
                // 3. Toggle between 'text' and 'password'
                type={showPassword ? "text" : "password"} 
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // Added pr-10 (padding-right) so text doesn't go behind the eye icon
                className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              
              {/* 4. Eye Toggle Button */}
              <button
                type="button" // Important: preventing form submission
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-teal-500 transition-colors"
              >
                {showPassword ? (
                   // Eye Slash Icon (Hide)
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                   // Eye Icon (Show)
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-400 text-white py-3 rounded-md border-2 hover:shadow-md shadow-teal-200 hover:border-white hover:bg-teal-300 transition"
            style={loading ? { cursor: "not-allowed", backgroundColor: "gray" } : {}}
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-black">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-teal-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;