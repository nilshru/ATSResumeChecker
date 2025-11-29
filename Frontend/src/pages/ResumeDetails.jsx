import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";



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
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";
function ResumeDetails() {
  const { id } = useParams();
  const { profile, updateProfile } = useAuth();

  const [resumeData, setResumeData] = useState({
    personal: { name: "", email: "", phone: "", address: "", profileImage: "", website: "", linkedin: "", github: "" },
    summary: "",
    education: [],
    experience: [],
    skills: [], // Can be Array or Object based on your backend
    projects: [],
    achievements: [],
  });

  useEffect(() => {
    if (!profile) return;
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
      // Keep raw data from DB here
      skills: profile.skills || [], 
      projects: Array.isArray(profile.projects) ? profile.projects : [],
      achievements: Array.isArray(profile.achievements) ? profile.achievements : [],
    });
  }, [profile]);

  const steps = [
    { title: "Personal Details", component: PersonalDetails },
    { title: "Summary", component: SummaryDetails },
    { title: "Education", component: EducationDetails },
    { title: "Experience", component: ExperienceDetails },
    { title: "Skills", component: SkillsDetails },
    { title: "Projects", component: ProjectsDetails },
    { title: "Achievements", component: AchievementsDetails },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);

  const CurrentComponent = steps[currentStep].component;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setIsSaved(false);
    }
  };
  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSave = async () => {
    try {
      setLoadingSave(true);
      const payload = {
        username: resumeData.personal.name,
        email: resumeData.personal.email,
        phone: resumeData.personal.phone,
        address: resumeData.personal.address,
        profileImage: resumeData.personal.profileImage,
        website: resumeData.personal.website,
        linkedin: resumeData.personal.linkedin,
        github: resumeData.personal.github,
        summary: resumeData.summary,
        education: resumeData.education,
        experience: resumeData.experience,
        skills: resumeData.skills,
        projects: resumeData.projects,
        achievements: resumeData.achievements,
      };
      await updateProfile(payload);
      setIsSaved(true);
      alert("✅ Saved successfully!");
    } catch (err) {
      console.error("Save error:", err.message);
      alert("❌ Failed to save, please try again.");
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
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ resumeData }),
      });

      const data = await res.json();

      if (data.success) {
        alert("📨 Resume sent to your email!");
      } else {
        alert("❌ Failed: " + data.error);
      }
    } catch (err) {
      alert("⚠️ Error sending resume");
    } finally {
      setLoadingDownload(false);
    }
  };

  // --- ADAPTER FOR NEW HTML TEMPLATE LOGIC ---
  // The HTML template you provided expects skills to be an object (Categories).
  // If your state is a flat array, we wrap it so the Preview renders it correctly.
  const previewData = {
    ...resumeData,
    skills: Array.isArray(resumeData.skills) && resumeData.skills.length > 0
      ? { "Technical Skills": resumeData.skills } // Default category if array
      : resumeData.skills
  };

  if (loadingDownload) {
    return (
      <div className="flex justify-center items-center h-screen">
        <MainLoder />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 font-sans">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-teal-500 mb-6">
        Building Resume Template #{id}
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        {/* Left Form */}
        <div className="w-full lg:w-1/2 bg-white shadow-lg rounded-xl p-4 sm:p-6 border border-teal-300 overflow-hidden h-fit">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-teal-500">
            {steps[currentStep].title}
          </h2>
          <div className="overflow-x-auto">
            <CurrentComponent data={resumeData} setData={setResumeData} />
          </div>

          <div className="flex justify-between mt-6">
            <button
              className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-400 transition"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              Back
            </button>

            {!isSaved ? (
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600 transition"
                onClick={handleSave}
                disabled={loadingSave}
              >
                {loadingSave ? "Saving..." : "Save"}
              </button>
            ) : (
              <button
                className="px-4 py-2 bg-teal-500 text-white rounded-lg disabled:opacity-50 hover:bg-teal-600 transition"
                onClick={nextStep}
                disabled={currentStep === steps.length - 1}
              >
                Next
              </button>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-3 items-center">

            <button
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              onClick={handleSendToEmail}
              disabled={loadingDownload}
            >
         {loadingDownload ? "Generating..." : "Send to Email"}
            </button>
          </div>
        </div>

        {/* Right Preview - UPDATED FOR TEMPLATE */}
        <div
          id="resume-preview"
          // Changes explained below:
          // 1. h-[calc(100vh-120px)]: Iski height screen ki height minus header rakhi hai.
          // 2. overflow-y-auto: Taki agar resume lamba ho to is div ke andar scrollbar aaye.
          // 3. sticky top-6: Taki ye box screen par tika rahe.
          className="w-full lg:w-1/2 bg-gray-200 shadow-inner rounded-xl border border-gray-300 overflow-y-auto p-4 flex justify-center h-[calc(100vh-120px)] sticky top-6"
        >
          {/* NOTE: 'resume-content' represents the A4 page. 
             Styles here ensure the captured image looks exactly like paper.
          */}
          <div 
            id="resume-content" 
            className="bg-white shadow-2xl"
            style={{
               width: "210mm",  // A4 Width
               minHeight: "297mm", // A4 Height
               padding: "0",    // Padding handled inside ResumePreview component styles
               margin: "0 auto",
               boxSizing: "border-box"
            }}
          >
            {/* Pass the formatted data (handled skills) to the component */}
            <ResumePreview data={previewData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeDetails;