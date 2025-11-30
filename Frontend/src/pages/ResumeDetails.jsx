import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Step Components
import PersonalDetails from "../components/resumeSteps/PersonalDetails";
import SummaryDetails from "../components/resumeSteps/SummaryDetails";
import EducationDetails from "../components/resumeSteps/EducationDetails";
import ExperienceDetails from "../components/resumeSteps/ExperienceDetails";
import SkillsDetails from "../components/resumeSteps/SkillsDetails";
import ProjectsDetails from "../components/resumeSteps/ProjectsDetails";
import AchievementsDetails from "../components/resumeSteps/AchievementsDetails";
import ResumePreview from "../components/resumeSteps/ResumePreview";
import MainLoder from "../components/Loader/MainLoder";

// Icons
import { FaUser, FaFileAlt, FaGraduationCap, FaBriefcase, FaCode, FaLaptopCode, FaTrophy, FaCheck, FaEye, FaEdit, FaChevronRight, FaChevronLeft, FaSave, FaPaperPlane } from "react-icons/fa";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

function ResumeDetails() {
  const { id } = useParams();
  const { profile, updateProfile } = useAuth();
  const previewContainerRef = useRef(null);
  const [scale, setScale] = useState(1);
  
  // Mobile Tab State
  const [mobileTab, setMobileTab] = useState("editor"); 

  // --- Logic Refs & State ---
  const isDataLoaded = useRef(false);
  // NEW: Ref to measure actual content height for dynamic preview sizing
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(1123); // Default A4 height

  const [resumeData, setResumeData] = useState({
    personal: { name: "", email: "", phone: "", address: "", profileImage: "", website: "", linkedin: "", github: "" },
    summary: "",
    education: [],
    experience: [],
    skills: [],
    projects: [],
    achievements: [],
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);

  // --- 1. Load Data (Run only once) ---
  useEffect(() => {
    if (!profile || isDataLoaded.current) return;

    setResumeData({
      personal: {
        name: profile.username || "",
        email: profile.email || "",
        phone: profile.phone || "",
        address: profile.address || "",
        profileImage: profile.profileImage || "",
        website: profile.website || "",
        linkedin: profile.linkedin || "",
        github: profile.github || "",
      },
      summary: profile.summary || "",
      education: Array.isArray(profile.education) ? profile.education : [],
      experience: Array.isArray(profile.experience) ? profile.experience : [],
      skills: profile.skills || [],
      projects: Array.isArray(profile.projects) ? profile.projects : [],
      achievements: Array.isArray(profile.achievements) ? profile.achievements : [],
    });
    
    isDataLoaded.current = true;
  }, [profile]);

  // --- 2. Detect Changes ---
  useEffect(() => {
    if (isDataLoaded.current) {
        setIsSaved(false);
    }
  }, [resumeData]);

  // --- 3. Measure Content Height Automatically ---
  useEffect(() => {
     if (contentRef.current) {
         // Get scrollHeight, default to A4 (1123px) if smaller
         const height = Math.max(1123, contentRef.current.scrollHeight);
         setContentHeight(height);
     }
  }, [resumeData, scale]); 

  // --- 4. Scaling Logic ---
  useEffect(() => {
    const handleResize = () => {
      if (previewContainerRef.current) {
        const containerWidth = previewContainerRef.current.offsetWidth;
        if (containerWidth === 0) return;

        const targetWidth = 794; 
        const padding = window.innerWidth < 768 ? 4 : 30; 
        const availableWidth = containerWidth - padding;
        
        const newScale = Math.max(0.1, availableWidth / targetWidth);
        setScale(window.innerWidth < 768 ? newScale : Math.min(newScale, 1));
      }
    };

    handleResize();
    setTimeout(handleResize, 100); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileTab]);

  const steps = [
    { title: "Personal", icon: <FaUser />, component: PersonalDetails },
    { title: "Summary", icon: <FaFileAlt />, component: SummaryDetails },
    { title: "Education", icon: <FaGraduationCap />, component: EducationDetails },
    { title: "Exp.", icon: <FaBriefcase />, component: ExperienceDetails },
    { title: "Skills", icon: <FaCode />, component: SkillsDetails },
    { title: "Projects", icon: <FaLaptopCode />, component: ProjectsDetails },
    { title: "Awards", icon: <FaTrophy />, component: AchievementsDetails },
  ];

  const CurrentComponent = steps[currentStep].component;

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSave = async () => {
    try {
      setLoadingSave(true);
      const payload = { ...resumeData, username: resumeData.personal.name };
      await updateProfile(payload);
      setIsSaved(true); 
      alert("✅ Saved successfully!");
    } catch (err) {
      console.error("Save error:", err);
      alert("❌ Failed to save.");
    } finally {
      setLoadingSave(false);
    }
  };

  const handleSendToEmail = async () => {
    try {
      setLoadingDownload(true);
      const token = localStorage.getItem("idToken");
      const res = await fetch(`${API_BASE}/api/send-resume`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ resumeData }),
      });
      const data = await res.json();
      if (data.success) alert("📨 Sent to email!");
      else alert("❌ " + data.error);
    } catch (err) {
      alert("⚠️ Error sending resume");
    } finally {
      setLoadingDownload(false);
    }
  };

  const previewData = {
    ...resumeData,
    skills: Array.isArray(resumeData.skills) && resumeData.skills.length > 0
      ? { "Technical Skills": resumeData.skills }
      : resumeData.skills
  };

  if (loadingDownload) return <div className="h-screen flex items-center justify-center bg-gray-50"><MainLoder /></div>;

  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="h-screen bg-gray-100 font-sans overflow-hidden flex flex-col">
      
      {/* Global Header - HIDDEN ON DESKTOP (lg:hidden), Only shows Toggle Buttons on Mobile */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 shadow-sm shrink-0 z-30 flex justify-center items-center h-16 lg:hidden">
        
        {/* Mobile Tabs Only */}
        <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
          <button 
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              mobileTab === 'editor' ? 'bg-white text-teal-700 shadow-sm ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setMobileTab("editor")}
          >
            <FaEdit className="text-xs" /> Editor
          </button>
          <button 
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              mobileTab === 'preview' ? 'bg-white text-teal-700 shadow-sm ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setMobileTab("preview")}
          >
            <FaEye className="text-xs" /> Preview
          </button>
        </div>
      </div>

      {/* Main Workspace - Adjusted height for desktop vs mobile */}
      <div className="flex-1 max-w-[1600px] mx-auto w-full p-2 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-8 lg:h-screen h-[calc(100vh-64px)]">
        
        {/* --- LEFT PANEL: EDITOR --- */}
        <div className={`w-full lg:w-5/12 h-full flex flex-col bg-white rounded-2xl shadow-xl border border-gray-200/60 overflow-hidden transition-all duration-300
            ${mobileTab === 'editor' ? 'flex' : 'hidden lg:flex'}`}>
          
          {/* Stepper Header */}
          <div className="bg-white border-b border-gray-100 p-5 shrink-0">
            {/* Progress Bar */}
            <div className="flex justify-between items-center mb-6 relative px-2">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-0 rounded-full"></div>
              <div 
                className="absolute top-1/2 left-0 h-1 bg-teal-500 -z-0 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              ></div>
              
              {steps.map((step, index) => {
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                return (
                  <div 
                    key={index} 
                    className="z-10 cursor-pointer group relative" 
                    onClick={() => setCurrentStep(index)}
                    title={step.title}
                  >
                    <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm border-[3px] transition-all duration-300 
                      ${isActive ? 'bg-teal-600 border-teal-100 text-white scale-110 shadow-lg shadow-teal-200' : 
                        isCompleted ? 'bg-teal-500 border-white text-white' : 'bg-white border-gray-200 text-gray-300 hover:border-gray-300'}`}>
                      {isCompleted ? <FaCheck /> : step.icon}
                    </div>
                    {/* Tooltip for steps */}
                    <div className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap transition-opacity duration-300
                        ${isActive ? 'text-teal-700 opacity-100' : 'text-gray-400 opacity-0 group-hover:opacity-100'}`}>
                        {step.title}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Current Step Title */}
            <div className="flex items-center gap-3 mt-2">
              <div className="p-2 bg-teal-50 text-teal-600 rounded-lg text-lg">
                 {steps[currentStep].icon}
              </div>
              <div>
                 <h2 className="text-lg font-bold text-gray-800 leading-tight">{steps[currentStep].title}</h2>
                 <p className="text-xs text-gray-500 font-medium">Step {currentStep + 1} of {steps.length}</p>
              </div>
            </div>
          </div>

          {/* Form Content Area */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-8 custom-scrollbar bg-white">
            <CurrentComponent data={resumeData} setData={setResumeData} />
          </div>

          {/* Footer Actions */}
          <div className="bg-white p-5 border-t border-gray-100 shrink-0 flex justify-between items-center shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
            <button 
              onClick={prevStep} 
              disabled={currentStep === 0} 
              className="flex items-center gap-2 cursor-pointer px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            >
              <FaChevronLeft className="text-xs"/> Back
            </button>

            <div className="flex gap-3">
              {!isLastStep ? (
                <button 
                  onClick={nextStep} 
                  className="flex items-center cursor-pointer gap-2 px-7 py-2.5 rounded-xl text-sm font-semibold text-white bg-gray-900 hover:bg-black shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Next Step <FaChevronRight className="text-xs"/>
                </button>
              ) : (
                <>
                  {!isSaved ? (
                    <button 
                      onClick={handleSave} 
                      disabled={loadingSave} 
                      className="flex items-center cursor-pointer gap-2 px-7 py-2.5 rounded-xl text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 shadow-lg shadow-teal-200 transition-all transform hover:-translate-y-0.5"
                    >
                      {loadingSave ? "Saving..." : <><FaSave/> Save Resume</>}
                    </button>
                  ) : (
                    <button 
                      onClick={handleSendToEmail} 
                      disabled={loadingDownload} 
                      className="flex items-center cursor-pointer gap-2 px-7 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 animate-pulse hover:animate-none transition-all"
                    >
                      <FaPaperPlane/> Email PDF
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* --- RIGHT PANEL: PREVIEW --- */}
        <div className={`w-full lg:w-7/12 h-full bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-2xl flex-col overflow-hidden border border-slate-700/50
             ${mobileTab === 'preview' ? 'flex' : 'hidden lg:flex'}`}>
          
          {/* Preview Toolbar */}
          <div className="bg-slate-900/50 text-white px-6 py-4 shrink-0 flex justify-between items-center border-b border-slate-700/50 backdrop-blur-md">
             <div className="flex items-center gap-3 font-semibold text-sm tracking-wide text-slate-200">
                <FaEye className="text-teal-400 text-lg"/> Live Preview
             </div>
             <div className="flex items-center gap-3">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest bg-slate-800 px-3 py-1 rounded-full border border-slate-700">A4 Format</div>
             </div>
          </div>

          {/* Scrollable Canvas */}
          <div 
             ref={previewContainerRef}
             className="flex-1 overflow-y-auto overflow-x-hidden flex justify-center bg-slate-100/90 custom-scrollbar relative pt-8 pb-20"
            //  style={{
            //     backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
            //     backgroundSize: '20px 20px'
            //  }}
          >
             {/* Height Wrapper */}
             <div
                className="transition-all duration-300 ease-out"
                style={{
                  width: `${794 * scale}px`,  
                  height: `${contentHeight * scale}px`, 
                  position: 'relative',
                }}
             >
               {/* Scaled Page */}
               <div
                  className="origin-top-left bg-white shadow-2xl"
                  style={{
                    width: "794px", 
                    minHeight: "1123px",
                    transform: `scale(${scale})`,
                  }}
               >
                  <ResumePreview ref={contentRef} data={previewData} />
               </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ResumeDetails;