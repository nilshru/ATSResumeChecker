import React from 'react';

function MainLoder() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm transition-opacity duration-300">
      
      {/* Spinner from your CSS */}
      <div className="mainLoader mb-6"></div>

      {/* Brand & Status Text */}
      <div className="text-center space-y-2">
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Resume<span className="text-teal-600">Qualify</span>
        </h2>
        <p className="text-sm text-slate-500 font-medium animate-pulse">
          Loading resources...
        </p>
      </div>

    </div>
  );
}

export default MainLoder;