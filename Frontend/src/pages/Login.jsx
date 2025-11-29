import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MainLoder from "../components/Loader/MainLoder";

function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  if (user) return <Navigate to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try { 
      await login({ email, password });
      navigate("/"); // redirect to homepage/dashboard
    } catch (err) {
      setError(err.response.data.error);
      // console.error(err);
      // console.error(err.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  
  

  if (loading){
    return(
      <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100">
        <MainLoder/>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl shadow-teal-200 p-8 space-y-6">
        <h2 className="text-center text-2xl font-extrabold text-black sm:text-3xl">
          Login to your account
        </h2>

        {/* Email and Password Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          

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

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-teal-400">
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <button
              type="button" className="absolute mt-3 right-2 top-1/2 transform -translate-y-1/2 bg-transparent cursor-pointer" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "👁" : "👁"}</button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-400 text-white py-3 rounded-md border-2 hover:shadow-md shadow-teal-200 hover:border-white hover:bg-teal-300 transition"
            style={loading ? { cursor: "not-allowed", backgroundColor: "gray"} : {}}
          >
            {loading ? "Login..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-black">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-teal-400 hover:underline"
          >
            Create a new one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

