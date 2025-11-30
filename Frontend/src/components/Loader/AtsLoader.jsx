import React from "react";
import { Loader2, Sparkles } from "lucide-react";

const AtsLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-100 max-w-sm w-full mx-auto">
      
      {/* Icon Animation */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-teal-400 blur-xl opacity-20 rounded-full animate-pulse"></div>
        <div className="relative bg-white p-4 rounded-full shadow-lg border border-slate-100">
           <Loader2 className="animate-spin text-teal-600" size={32} />
        </div>
        <div className="absolute -top-2 -right-2">
            <Sparkles className="text-amber-400 animate-bounce" size={20} />
        </div>
      </div>

      {/* Scrolling Text Container */}
      <div className="loader-container h-10 overflow-hidden relative w-full flex justify-center">
        {/* Gradients for fading effect */}
        <div className="absolute top-0 w-full h-2 bg-gradient-to-b from-white to-transparent z-10"></div>
        <div className="absolute bottom-0 w-full h-2 bg-gradient-to-t from-white to-transparent z-10"></div>
        
        <div className="loader-text-wrapper flex flex-col items-center">
          <span className="loader-word">Analyzing Resume</span>
          <span className="loader-word">Parsing Keywords</span>
          <span className="loader-word">Calculating Score</span>
          <span className="loader-word">AI Optimization</span>
          <span className="loader-word">Finalizing Result</span>
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-400 font-medium uppercase tracking-widest">
        Please Wait
      </p>
    </div>
  );
};

export default AtsLoader;