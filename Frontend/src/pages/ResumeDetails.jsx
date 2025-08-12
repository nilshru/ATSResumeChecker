import React, { useState } from "react";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

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

  const [resumeData, setResumeData] = useState({
    personal: { name: "", email: "", phone: "", address: "" },
    summary: "",
    education: [],
    experience: [],
    skills: [],
    projects: [],
    achievements: []
  });

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
  const [downloadType, setDownloadType] = useState("pdf");
  const CurrentComponent = steps[currentStep].component;

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };
  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleDownload = async () => {
    const previewElement = document.getElementById("resume-preview");

    if (downloadType === "pdf") {
      const canvas = await html2canvas(previewElement, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("resume.pdf");
    }

    if (downloadType === "docx") {
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: previewElement.innerText,
                    font: "Arial",
                    size: 24,
                  }),
                ],
              }),
            ],
          },
        ],
      });

      const buffer = await Packer.toBlob(doc);
      saveAs(buffer, "resume.docx");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-teal-500 mb-6">
        Building Resume Template #{id}
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        
        {/* Left Side Form */}
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
            <button
              className="px-4 py-2 bg-teal-500 text-white rounded-lg disabled:opacity-50"
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
            >
              Next
            </button>
          </div>

          {/* Download Options */}
          <div className="mt-6 flex gap-3 items-center">
            <select
              value={downloadType}
              onChange={(e) => setDownloadType(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            >
              <option value="pdf">PDF</option>
              <option value="docx">DOCX</option>
            </select>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
              onClick={handleDownload}
            >
              Download
            </button>
          </div>
        </div>

        {/* Right Side Resume Preview */}
        <div
          id="resume-preview"
          className="w-full lg:w-1/2 bg-white shadow-lg rounded-xl p-4 sm:p-6 border border-gray-300 overflow-auto break-words whitespace-pre-wrap"
        >
          <ResumePreview data={resumeData} />
        </div>
      </div>
    </div>
  );
}

export default ResumeDetails;
