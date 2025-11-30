import React from "react";
import { Home, ArrowLeft, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function NotFound() {
  const navigate = useNavigate();

  React.useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-out-cubic" });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 relative overflow-hidden font-sans">
      
      {/* Background Decor (Subtle Grid & Blobs) */}
      <div className="absolute inset-0 z-0 opacity-[0.4]" 
           style={{ backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(to right, #cbd5e1 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-teal-100/50 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl opacity-60"></div>

      {/* Main Card */}
      <div 
        className="relative z-10 bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-10 sm:p-14 text-center border border-white/50 max-w-lg w-full"
        data-aos="zoom-in"
      >
        
        {/* Floating Icon Badge */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100">
             <AlertCircle size={40} className="text-teal-500" />
        </div>

        {/* 404 Big Text */}
        <div className="mt-6 mb-2">
            <h1 className="text-8xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-200 to-slate-400 select-none">
                404
            </h1>
        </div>

        {/* Message Content */}
        <h2 className="text-2xl font-bold text-slate-800 mb-3 -mt-4 relative z-10">
            Page Not Found
        </h2>
        <p className="text-slate-500 mb-10 text-base leading-relaxed max-w-xs mx-auto">
             The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p> 

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
             {/* Go Back Button */}
             <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold transition-all hover:-translate-y-0.5"
             >
                <ArrowLeft size={18} />
                Go Back
             </button>

             {/* Home Button */}
             <Link
                to="/"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-black text-white font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
             >
                <Home size={18} />
                Back to Home
             </Link>
        </div>
        
        {/* Footer help text */}
        <div className="mt-8 pt-8 border-t border-slate-100">
            <p className="text-xs text-slate-400">
                Need help? <a href="/contact" className="text-teal-600 hover:underline">Contact Support</a>
            </p>
        </div>

      </div>
    </div>
  );
}

export default NotFound;