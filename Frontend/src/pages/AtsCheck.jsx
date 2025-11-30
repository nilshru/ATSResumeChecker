import React, { useState, useCallback, useMemo } from "react";
import { 
  CloudUpload, 
  FileText, 
  CheckCircle, 
  BarChart, 
  ChevronRight, 
  Sparkles, 
  Lock, 
  ArrowRight,
  Target,
  AlertCircle,
  RefreshCw,
  FileSearch,
  Maximize2
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { extractTextFromFile } from "../utils/extractText";
import AtsLoader from "../components/Loader/AtsLoader";

// --- Constants & Config ---
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

// --- Sub-Component: Background Layer ---
const BackgroundLayer = () => (
  <div className="absolute inset-0 z-0 bg-slate-50 overflow-hidden pointer-events-none select-none">
    <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-indigo-50/60 via-teal-50/40 to-transparent" />
    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-teal-200/20 rounded-full blur-[120px] animate-pulse" />
    <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] bg-indigo-300/20 rounded-full blur-[120px] animate-pulse delay-1000" />
    <div className="absolute inset-0 opacity-[0.25] bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:32px_32px]" />
  </div>
);

// --- Sub-Component: Hero Section ---
const HeroSection = () => (
  <div className="relative z-10 max-w-3xl mx-auto text-center mb-8 pt-6 lg:mb-10 lg:pt-10 px-4">
    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-full px-4 py-1.5 mb-6 shadow-sm ring-1 ring-slate-200/50">
      <Sparkles size={14} className="text-amber-500 fill-amber-500" />
      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-slate-600">AI-Powered Optimization</span>
    </div>
    
    {/* Responsive Font Sizes */}
    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-[1.1]">
      Beat the Bots, <br className="md:hidden" />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-indigo-600">Land the Interview.</span>
    </h1>
    
    <p className="text-sm md:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
      Transform your resume into an interview magnet. Our AI analyzes your CV against job descriptions to ensure you pass the ATS filters.
    </p>
  </div>
);

// --- Sub-Component: Auth Guard ---
const AuthGuard = ({ onLogin }) => (
  <div className="min-h-screen flex flex-col items-center justify-center p-6 relative font-sans overflow-hidden">
    <BackgroundLayer />
    <div className="relative z-10 bg-white/80 backdrop-blur-2xl p-8 sm:p-14 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white/60 max-w-lg w-full text-center">
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-teal-600 text-3xl shadow-inner border border-teal-200/60">
        <Lock size={32} />
      </div>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Authentication Required</h2>
      <p className="text-slate-500 mb-8 leading-relaxed font-medium text-sm sm:text-base">
        Unlock our advanced <strong>AI ATS Scanner</strong> to verify your resume compatibility against job descriptions.
      </p>
      <button 
        onClick={onLogin} 
        className="group w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 sm:py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
      >
        Sign In to Analyze <ArrowRight className="group-hover:translate-x-1 transition-transform text-teal-400" />
      </button>
    </div>
  </div>
);

// --- Main Component ---
function AtsCheck() {
  const navigate = useNavigate();
  const { user, authFetch } = useAuth();

  const [data, setData] = useState({
    jobDesc: "",
    file: null,
    resumeText: "",
    score: null,
    suggestions: [],
    loading: false,
    error: null
  });

  const updateState = (updates) => setData(prev => ({ ...prev, ...updates }));

  const getScoreColor = (s) => {
    if (s >= 80) return { text: "text-emerald-600", stroke: "text-emerald-500", bg: "bg-emerald-50", label: "Excellent Match" };
    if (s >= 50) return { text: "text-amber-600", stroke: "text-amber-500", bg: "bg-amber-50", label: "Moderate Match" };
    return { text: "text-rose-600", stroke: "text-rose-500", bg: "bg-rose-50", label: "Needs Improvement" };
  };

  const scoreMeta = useMemo(() => data.score !== null ? getScoreColor(data.score) : {}, [data.score]);

  const callAtsScore = async (text, jd) => {
    if (!jd.trim()) return;
    updateState({ loading: true, error: null });
    try {
      const response = await authFetch(`${API_BASE}/api/ats-score`, {
        method: "POST",
        body: JSON.stringify({ resumeText: text, jobDesc: jd }),
      });
      if (response.success) {
        updateState({ score: response.score, suggestions: response.suggestions || [], loading: false });
      } else {
        throw new Error(response.error || "Failed to calculate ATS score");
      }
    } catch (err) {
      updateState({ error: err.message, loading: false });
    }
  };

  const handleProcessFile = async (selectedFile) => {
    if (!selectedFile) return;
    try {
      updateState({ loading: true, file: selectedFile, error: null });
      const text = await extractTextFromFile(selectedFile);
      updateState({ resumeText: text });
      await callAtsScore(text, data.jobDesc);
    } catch (err) { 
      updateState({ error: err.message, loading: false });
    } 
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    if (data.jobDesc.trim()) handleProcessFile(e.dataTransfer.files[0]);
  }, [data.jobDesc]);

  if (!user) return <AuthGuard onLogin={() => navigate("/login")} />;

  if (data.loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative font-sans">
        <BackgroundLayer />
        <div className="relative z-10 scale-110"><AtsLoader /></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 font-sans relative flex flex-col items-center text-slate-800 bg-slate-50/50">
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #cbd5e1;
            border-radius: 20px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: #94a3b8;
          }
        `}
      </style>
      <BackgroundLayer />
      <HeroSection />

      {/* --- Main Container --- */}
      {/* Mobile: h-auto (grows with content), Desktop: lg:h-[80vh] (fixed app-like feel) */}
      <div className="relative z-10 w-full max-w-7xl 
            flex flex-col lg:flex-row 
            h-auto lg:h-[80vh] lg:max-h-[900px] lg:min-h-[600px]
            lg:overflow-hidden 
            mb-12 rounded-3xl
            bg-white/80 backdrop-blur-2xl                   
            border border-white/60                          
            shadow-[0_30px_100px_-10px_rgba(0,0,0,0.12)]    
            ring-1 ring-slate-900/5                         
        ">
        
        {/* Top Gradient Accent Line */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-400 via-indigo-500 to-teal-400 z-20"></div>

        {/* --- LEFT COLUMN: Input --- */}
        <div className="w-full lg:w-4/12 p-5 sm:p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-slate-200/60 bg-slate-50/50 flex flex-col relative z-10 lg:h-full h-auto">
          <div className="mb-4 flex items-center justify-between shrink-0">
             <div className="flex items-center gap-2">
                <div className="p-1.5 bg-teal-50 rounded-lg border border-teal-100 shadow-sm"><FileSearch className="text-teal-600" size={18} /></div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Scanner Input</h2>
             </div>
          </div>

          {/* JD Box: Fixed height on mobile so it doesn't collapse, Flex-1 on desktop */}
          <div className="flex-col mb-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-teal-500/20 focus-within:border-teal-400 transition-all
              flex h-64 lg:h-auto lg:flex-1">
             <div className="bg-slate-50/80 border-b border-slate-100 px-4 py-2 flex items-center justify-between shrink-0">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  1. Job Description
                </label>
                <Maximize2 size={12} className="text-slate-400" />
             </div>
             <textarea
              className="flex-1 w-full p-4 text-sm text-slate-700 placeholder-slate-400 focus:outline-none resize-none bg-transparent custom-scrollbar"
              placeholder="Paste the full job description here..."
              value={data.jobDesc}
              onChange={(e) => updateState({ jobDesc: e.target.value })}
            />
          </div>

          {/* Upload Box */}
          <div className="shrink-0">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">
              2. Resume Document
            </label>
            <div
                className={`relative group rounded-xl border-2 border-dashed transition-all duration-300 h-24 lg:h-28 flex flex-col items-center justify-center text-center px-4
                ${data.jobDesc.trim() 
                    ? "border-slate-300 bg-white hover:bg-teal-50/30 hover:border-teal-400 cursor-pointer shadow-sm hover:shadow-md" 
                    : "border-slate-200 bg-slate-50/50 opacity-60 cursor-not-allowed"
                }`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
            >
                <label className={`absolute inset-0 flex flex-col items-center justify-center ${data.jobDesc.trim() ? "cursor-pointer" : ""}`}>
                    <div className="flex items-center gap-2 mb-1 group-hover:scale-105 transition-transform">
                      <CloudUpload size={20} className={data.jobDesc.trim() ? "text-teal-600" : "text-slate-300"} />
                      <span className="text-sm font-semibold text-slate-700">Upload PDF</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Drag & drop or click to browse</span>
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={(e) => handleProcessFile(e.target.files[0])}
                        disabled={!data.jobDesc.trim()}
                    />
                </label>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Results --- */}
        <div className="w-full lg:w-8/12 bg-white/40 flex flex-col relative z-10 lg:h-full h-auto lg:overflow-hidden">
          
          {/* 1. Header (Sticky on Mobile, Fixed on Desktop) */}
          <div className="p-5 sm:p-6 lg:p-8 pb-4 border-b border-slate-200/60 bg-white/50 backdrop-blur-sm z-20 shrink-0 sticky lg:static top-0">
            {!data.file ? (
                 <div className="flex items-center gap-3 opacity-50">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center"><BarChart className="text-slate-400" size={20}/></div>
                    <div>
                        <h3 className="text-sm font-bold text-slate-700">Waiting for data...</h3>
                        <p className="text-xs text-slate-400">Upload a file to begin analysis</p>
                    </div>
                 </div>
            ) : (
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-teal-600 shadow-sm shrink-0">
                            <FileText size={20} className="sm:hidden" />
                            <FileText size={24} className="hidden sm:block" />
                        </div>
                        <div className="min-w-0">
                            <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate max-w-[150px] sm:max-w-xs">{data.file.name}</h3>
                            <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span> 
                                Analysis Complete
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={() => updateState({ file: null, score: null, suggestions: [] })} 
                        className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 px-3 py-2 rounded-lg transition-all shadow-sm shrink-0"
                    >
                        <RefreshCw size={12} /> <span className="hidden sm:inline">New Scan</span>
                    </button>
                </div>
            )}
          </div>

          {/* Content Area */}
          {data.error && (
            <div className="m-5 sm:m-6 mb-0 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 text-red-700 text-sm shrink-0">
                <AlertCircle size={18} /> {data.error}
            </div>
          )}

          {!data.file ? (
            /* Empty State */
            <div className="flex-1 flex flex-col items-center justify-center opacity-40 select-none pb-10 min-h-[300px] lg:min-h-0">
                <div className="w-48 h-48 bg-teal-100/40 rounded-full blur-3xl absolute animate-pulse"></div>
                <FileText size={64} className="text-slate-300 relative z-10 mb-4" />
                <p className="text-slate-400 text-sm font-medium relative z-10">Results will appear here</p>
            </div>
          ) : (
            /* Results View */
            <div className="flex flex-col lg:h-full lg:overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {/* 2. STATS SECTION */}
                <div className="px-5 sm:px-6 lg:px-8 pt-6 pb-2 shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Radial Score */}
                        <div className="col-span-1 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden">
                            <div className="relative w-24 h-24 mb-3">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="48" cy="48" r="40" stroke="#f1f5f9" strokeWidth="8" fill="transparent" />
                                    <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent"
                                        strokeDasharray={251}
                                        strokeDashoffset={251 - (251 * data.score) / 100}
                                        className={`${scoreMeta.stroke} transition-all duration-1000 ease-out`}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center flex-col">
                                    <span className="text-3xl font-black text-slate-800 tracking-tight">{data.score}%</span>
                                </div>
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full ${scoreMeta.bg} ${scoreMeta.text}`}>
                                {scoreMeta.label}
                            </span>
                        </div>

                        {/* AI Insight */}
                        <div className="col-span-1 md:col-span-2 bg-slate-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden group flex flex-col justify-center">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-teal-500 to-indigo-600 rounded-full blur-[80px] opacity-20 -mr-16 -mt-16 group-hover:opacity-30 transition-opacity duration-700" />
                            <div className="relative z-10">
                                <h3 className="text-sm font-bold mb-2 flex items-center gap-2 text-white/90">
                                    <Sparkles size={14} className="text-amber-400 fill-amber-400"/> AI Executive Summary
                                </h3>
                                <p className="text-slate-300 text-sm leading-relaxed line-clamp-4">
                                    {data.score >= 80 
                                        ? "Outstanding optimization! Your professional profile exhibits a high degree of semantic correlation with the target role." 
                                        : "Optimization required. The algorithmic assessment indicates a divergence between your profile keywords and the role requirements. Please address the checklist points below."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. CHECKLIST HEADER */}
                <div className="px-5 sm:px-6 lg:px-8 py-3 shrink-0 flex items-center justify-between mt-4 border-b border-slate-100 bg-white/50 backdrop-blur-md sticky top-[73px] lg:static z-10">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                        <Target size={14} className="text-teal-600" /> Optimization Checklist
                    </h3>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
                        {data.suggestions.length} ISSUES FOUND
                    </span>
                </div>

                {/* 4. SCROLLABLE LIST */}
                <div className="lg:flex-1 lg:overflow-y-auto px-5 sm:px-6 lg:px-8 pt-4 pb-6 custom-scrollbar scroll-smooth overscroll-contain">
                    {data.suggestions.length > 0 ? (
                        <div className="space-y-3">
                            {data.suggestions.map((s, idx) => {
                                const parts = s.split(/(".*?")/g);
                                return (
                                    <div key={idx} className="group bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm flex gap-4 transition-all hover:shadow-md hover:border-teal-200/60">
                                        <div className="mt-0.5 w-6 h-6 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 group-hover:bg-teal-100 transition-colors">
                                            <ChevronRight size={14} className="text-teal-600" />
                                        </div>
                                        <p className="text-sm text-slate-600 leading-relaxed pt-0.5">
                                            {parts.map((part, i) =>
                                                part.startsWith('"') && part.endsWith('"') ? (
                                                    <span key={i} className="font-bold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded text-xs mx-0.5 border border-slate-200">
                                                        {part.replace(/"/g, "")}
                                                    </span>
                                                ) : (
                                                    <span key={i}>{part}</span>
                                                )
                                            )}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="h-40 lg:h-full flex flex-col items-center justify-center text-center opacity-60">
                            <CheckCircle className="text-slate-300 mb-2" size={32} />
                            <span className="text-slate-500 text-sm font-medium">No critical missing keywords detected.</span>
                        </div>
                    )}
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AtsCheck;