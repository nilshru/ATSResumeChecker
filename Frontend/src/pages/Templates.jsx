import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaLock, FaArrowRight, FaCheckCircle, FaClock, FaLayerGroup } from 'react-icons/fa';

const templatesData = [
  {
    id: 1,
    name: 'Modern Professional',
    category: 'Corporate',
    tags: ['ATS Friendly', 'Clean'],
    img: 'https://res.cloudinary.com/dxkm08ohf/image/upload/v1764440575/Gemini_Generated_Image_mxpoaymxpoaymxpo_l789gt.png',
    comingSoon: false,
  },
  {
    id: 2,
    name: 'Creative Minimalist',
    category: 'Design',
    tags: ['Portfolio', 'Graphic'],
    img: 'https://res.cloudinary.com/dxkm08ohf/image/upload/v1764440575/Gemini_Generated_Image_mxpoaymxpoaymxpo_l789gt.png', 
    comingSoon: true,
  }
];

function Templates() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState({});

  const handleClick = (id, isComingSoon) => {
    if (isComingSoon) return; 
    navigate(`/templates/${id}`);
  };

  // --- Background Component (Shared) ---
  const BackgroundLayer = () => (
    <div className="absolute inset-0 z-0 bg-slate-50 overflow-hidden pointer-events-none">
       {/* Gradient Mesh */}
       <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-indigo-50/60 via-teal-50/40 to-transparent"></div>
       
       {/* Animated Blobs */}
       <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-200/20 rounded-full blur-[100px] animate-pulse"></div>
       <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-indigo-200/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>

       {/* Grid Pattern */}
       <div className="absolute inset-0 opacity-[0.4]" 
            style={{ backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}>
       </div>
    </div>
  );

  // --- 1. LOCKED STATE (Logged Out) ---
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
        <BackgroundLayer />

        <div className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/60 max-w-lg w-full text-center relative z-10 transform transition-all hover:scale-[1.01]">
          <div className="w-20 h-20 bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-teal-600 text-3xl shadow-inner border border-teal-200">
            <FaLock />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-3 tracking-tight">Access Restricted</h2>
          <p className="text-slate-500 mb-8 leading-relaxed font-medium">
            Join thousands of professionals building their careers. <br/>Log in to access our premium ATS-friendly templates.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="group w-full bg-slate-900 hover:bg-black text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-2xl hover:-translate-y-1 active:translate-y-0"
          >
            Sign In to Unlock <FaArrowRight className="group-hover:translate-x-1 transition-transform text-teal-400" />
          </button>
        </div>
      </div>
    );
  }

  // --- 2. MAIN GALLERY (Logged In) ---
  return (
    <div className="min-h-screen font-sans selection:bg-teal-100 selection:text-teal-900 relative">
      <BackgroundLayer />

      {/* Header Section */}
      <div className="relative z-10 pt-24 pb-12 px-6 sm:px-12 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-teal-100 text-teal-700 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm backdrop-blur-sm">
            <FaLayerGroup /> Template Library
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight drop-shadow-sm">
            Designed for <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-600">Impact.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
            Select a template to begin. All designs are rigorously tested for ATS compatibility and readability by HR experts.
          </p>
        </div>
      </div>

      {/* Grid Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          
          {templatesData.map(({ id, name, category, tags, img, comingSoon }) => (
            <div
              key={id}
              onClick={() => handleClick(id, comingSoon)}
              className={`group relative bg-white/90 backdrop-blur-sm rounded-2xl flex flex-col transition-all duration-500 ease-out overflow-hidden
                ${comingSoon 
                  ? 'cursor-not-allowed opacity-80 border border-slate-200' 
                  : 'cursor-pointer hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-slate-100 hover:border-teal-500/30'
                }`}
            >
              
              {/* Image Container (A4 Ratio) */}
              <div className="relative w-full aspect-[210/297] bg-slate-100 overflow-hidden border-b border-slate-100">
                
                {/* Skeleton Loader */}
                {!loaded[id] && (
                  <div className="absolute inset-0 bg-slate-200 animate-pulse" />
                )}

                {/* Template Image */}
                <img
                  src={img}
                  alt={name}
                  loading="lazy"
                  className={`w-full h-full object-cover object-top transition-all duration-700 
                    ${loaded[id] ? 'opacity-100' : 'opacity-0'}
                    ${comingSoon ? 'grayscale brightness-90 blur-[1px]' : 'group-hover:scale-105 group-hover:brightness-105'}
                  `}
                  onLoad={() => setLoaded((prev) => ({ ...prev, [id]: true }))}
                />

                {/* --- OVERLAY: ACTIVE STATE --- */}
                {!comingSoon && (
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <button className="bg-white text-slate-900 font-bold py-3.5 px-8 rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 duration-300">
                       Use Template <FaArrowRight className="text-teal-600" />
                    </button>
                  </div>
                )}

                {/* --- OVERLAY: COMING SOON STATE --- */}
                {comingSoon && (
                  <div className="absolute inset-0 bg-slate-50/30 flex flex-col items-center justify-center z-10 backdrop-blur-[1px]">
                    <div className="bg-slate-900/90 text-white px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 shadow-xl border border-white/10 tracking-wide">
                      <FaClock className="text-amber-400" /> COMING SOON
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer Details */}
              <div className="p-6 relative z-20">
                {/* Header Row */}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border
                      ${comingSoon 
                        ? 'bg-slate-100 text-slate-400 border-slate-200' 
                        : 'bg-teal-50 text-teal-700 border-teal-100'}`}>
                      {category}
                    </span>
                    <h3 className={`text-lg font-bold mt-3 ${comingSoon ? 'text-slate-400' : 'text-slate-800 group-hover:text-teal-600'} transition-colors`}>
                      {name}
                    </h3>
                  </div>
                  
                  {/* Status Icons */}
                  {!comingSoon ? (
                    <div className="text-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
                      <FaCheckCircle className="text-xl" />
                    </div>
                  ) : (
                     <div className="text-slate-300">
                        <FaLock className="text-lg" />
                     </div>
                  )}
                </div>

                {/* Tags / Description */}
                <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-200/60">
                   {tags && tags.map((tag, idx) => (
                      <span key={idx} className="text-xs font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/60">
                        #{tag}
                      </span>
                   ))}
                </div>
              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default Templates;