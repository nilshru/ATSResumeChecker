import React from "react";
import { Home, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function NotFound() {
  React.useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out" });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div
        className="bg-white shadow-lg rounded-2xl p-8 text-center border border-transparent bg-clip-border"
        style={{
          borderImage: "linear-gradient(to right, #2dd4bf, #22d3ee) 1",
          borderWidth: "2px",
        }}
        data-aos="fade-up"
      >
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <AlertTriangle size={70} className="text-teal-500" />
        </div>

        {/* Error Code */}
        <h1 className="text-6xl font-extrabold text-teal-500 mb-2">404</h1>

        {/* Message */}
        <p className="text-gray-600 mb-6 text-lg">
          Oops! The page you're looking for doesn't exist.
        </p> 

        {/* Back Home Button */}
        <Link
          to="/"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg 
                     bg-gradient-to-r from-teal-400 to-cyan-400 
                     hover:from-teal-500 hover:to-cyan-500 text-white font-medium shadow-md"
        >
          <Home size={20} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
