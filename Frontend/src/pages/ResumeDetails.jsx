import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;

// Step Components
import PersonalDetails from "../components/resumeSteps/PersonalDetails";
import SummaryDetails from "../components/resumeSteps/SummaryDetails";
import EducationDetails from "../components/resumeSteps/EducationDetails";
import ExperienceDetails from "../components/resumeSteps/ExperienceDetails";
import SkillsDetails from "../components/resumeSteps/SkillsDetails";
import ProjectsDetails from "../components/resumeSteps/ProjectsDetails";
import AchievementsDetails from "../components/resumeSteps/AchievementsDetails";
import ResumePreview from "../components/resumeSteps/ResumePreview";

function ResumeDetails() { 
  const { id } = useParams();
  const { profile, updateProfile } = useAuth();

  const [resumeData, setResumeData] = useState({
    personal: { name: "", email: "", phone: "", address: "", profileImage: "" },
    summary: "",
    education: [],
    experience: [],
    skills: [],
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
      },
      summary: profile.summary || "",
      education: Array.isArray(profile.education) ? profile.education : [],
      experience: Array.isArray(profile.experience) ? profile.experience : [],
      skills: Array.isArray(profile.skills) ? profile.skills : [],
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

  const handleDownload = async () => {
    if (!profile) return;
    try {
      setLoadingDownload(true);

      const input = document.getElementById("resume-content");

      // Generate PNG at higher resolution to keep PDF quality
      const canvas = await toPng(input, { quality: 1.0, pixelRatio: 2 });
      const pdf = new jsPDF("p", "pt", "a4");
      const imgProps = pdf.getImageProperties(canvas);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(canvas, "PNG", 0, 0, pdfWidth, pdfHeight);

      const pdfBlob = pdf.output("blob");

      // Use unique public_id to ensure latest file updates database
      const timestamp = new Date().getTime();
      const publicId = `resume_${profile.uid}_${timestamp}`;

      const formData = new FormData();
      formData.append("file", pdfBlob, `${profile.username}_ResumeQualify.pdf`);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("public_id", publicId);
      formData.append("resource_type", "raw");

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`,
        { method: "POST", body: formData }
      );

      const data = await res.json();

      if (!data.secure_url) throw new Error(data.error?.message || "Upload failed");

      // Update profile database with the latest URL
      await updateProfile({ resumePdf: data.secure_url });

      alert("✅ Resume uploaded successfully!");
      console.log("Cloudinary PDF URL:", data.secure_url);

      // Download locally
      pdf.save(`${profile.username}_ResumeQualify.pdf`);
    } catch (err) {
      console.error("❌ Error generating/uploading PDF:", err);
      alert("Failed to generate/upload PDF");
    } finally {
      setLoadingDownload(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-teal-500 mb-6">
        Building Resume Template #{id}
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        {/* Left Form */}
        <div className="w-full lg:w-1/2 bg-white shadow-lg rounded-xl p-4 sm:p-6 border border-teal-300 overflow-hidden">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-teal-500">
            {steps[currentStep].title}
          </h2>
          <div className="overflow-x-auto">
            <CurrentComponent data={resumeData} setData={setResumeData} />
          </div>

          <div className="flex justify-between mt-6">
            <button
              className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              Back
            </button>

            {!isSaved ? (
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
                onClick={handleSave}
                disabled={loadingSave}
              >
                {loadingSave ? "Saving..." : "Save"}
              </button>
            ) : (
              <button
                className="px-4 py-2 bg-teal-500 text-white rounded-lg disabled:opacity-50"
                onClick={nextStep}
                disabled={currentStep === steps.length - 1}
              >
                Next
              </button>
            )}
          </div>

          <div className="mt-6 flex gap-3 items-center">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
              onClick={handleDownload}
              disabled={loadingDownload}
            >
              {loadingDownload ? "Downloading..." : "Download PDF"}
            </button>
          </div>
        </div>

        {/* Right Preview */}
        <div
          id="resume-preview"
          className="w-full lg:w-1/2 h-full bg-white shadow-lg rounded-xl border border-gray-300 overflow-auto break-words whitespace-pre-wrap"
        >
          <div id="resume-content" className="resume-container py-7 px-6">
            <ResumePreview data={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeDetails;
