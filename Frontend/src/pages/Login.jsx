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




          // <div className="flex items-center justify-center gap-3">
          //   <hr className="flex-grow border-teal-300" />
          //   <span className="text-teal-400">or</span>
          //   <hr className="flex-grow border-teal-300" />
          // </div>

          
          // <button
          //   type="button"
          //   className="w-full text-teal-500 flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-md hover:border-teal-400 hover:shadow-md shadow-teal-200 hover:bg-gray-50 transition"
          //   onClick={() =>
          //     alert("Google Sign-in clicked! (Implement logic)")
          //   }
          // >
          //   <svg
          //     className="w-6 h-6"
          //     viewBox="0 0 533.5 544.3"
          //     xmlns="http://www.w3.org/2000/svg"
          //   >
          //     <path
          //       d="M533.5 278.4c0-17.4-1.4-34-4.2-50.2H272v95.1h146.9c-6.3 34-25.3 62.9-54.1 82v68h87.4c51.1-47 80.3-116.4 80.3-194.9z"
          //       fill="#4285F4"
          //     />
          //     <path
          //       d="M272 544.3c73.2 0 134.6-24.1 179.4-65.5l-87.4-68c-24.3 16.3-55.3 25.9-92 25.9-70.7 0-130.7-47.8-152.2-111.8H31.3v70.3C76.1 486.5 168.8 544.3 272 544.3z"
          //       fill="#34A853"
          //     />
          //     <path
          //       d="M119.8 325.9c-5.4-16-8.5-33.1-8.5-50.9 0-17.8 3.1-34.9 8.5-50.9V153.8H31.3c-17.4 34.9-27.4 74-27.4 115.7s10 80.8 27.4 115.7l88.5-59.3z"
          //       fill="#FBBC05"
          //     />
          //     <path
          //       d="M272 107.7c39.6 0 75.1 13.6 103.2 40.3l77.4-77.4C403.7 24.7 344.6 0 272 0 168.8 0 76.1 57.8 31.3 153.8l88.5 59.3c21.5-64 81.5-111.8 152.2-111.8z"
          //       fill="#EA4335"
          //     />
          //   </svg>
          //   Sign in with Google
          // </button>