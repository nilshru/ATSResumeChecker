import React, { useState, useEffect } from "react";
import { CloudUpload, FileText } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

function AtsCheck() {
  const [jobDesc, setJobDesc] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out" });
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div
        className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl mx-auto 
                   rounded-lg overflow-hidden bg-white shadow-lg p-4
                   border-2 border-teal-400 shadow-teal-200  bg-clip-border"
        
        data-aos="fade-up"
      >
        {/* Upload Area */}
        <div
          className="flex flex-col items-center justify-center p-6 w-full md:w-1/2"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            if (jobDesc.trim()) handleDrop(e);
          }}
        >
          {/* Job Description Title */}
          <h2 className="text-lg font-semibold text-teal-600 mb-2 w-full text-left">
            Job Description
          </h2>

          {/* Job Description Input */}
          <textarea
            className="w-full border border-teal-400 rounded-lg p-3 text-sm mb-4 
                       focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent 
                       shadow-sm"
            rows="5"
            placeholder="Paste or type the job description here to analyze your resume compatibility..."
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
          />

          {/* File Upload Box */}
          <div
            className={`flex flex-col items-center justify-center p-6 rounded-lg w-full 
                       border-2 border-dashed transition-all ${
                         jobDesc.trim()
                           ? "border-teal-400 bg-white hover:shadow-md"
                           : "border-gray-300 bg-gray-100 opacity-50 cursor-not-allowed"
                       }`}
          >
            <CloudUpload size={50} className="text-teal-500 mb-3" />
            <p className="text-gray-700 text-center font-semibold mb-1">
              Drag & Drop your resume
            </p>
            <p className="text-gray-500 text-sm mb-3">or</p>

            <label
              className={`cursor-pointer px-4 py-2 rounded-lg text-sm mb-2 ${
                jobDesc.trim()
                  ? "bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-500 hover:to-cyan-500 text-white"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              Upload from Device
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleFileChange}
                disabled={!jobDesc.trim()}
              />
            </label>

            <button
              className={`px-4 py-2 rounded-lg border text-sm ${
                jobDesc.trim()
                  ? "bg-teal-100 text-teal-600 border-teal-300 hover:bg-teal-200"
                  : "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
              }`}
              onClick={() =>
                jobDesc.trim()
                  ? alert("Google Drive integration baad me add hoga")
                  : null
              }
              disabled={!jobDesc.trim()}
            >
              Upload from Google Drive
            </button>
          </div>
        </div>

        {/* Divider for PC & Mobile */}
       
<div className="hidden md:block w-px bg-gradient-to-b from-teal-400 to-cyan-400 mx-4 self-stretch"></div>

<div className="block md:hidden h-px bg-gradient-to-r from-teal-400 to-cyan-400 my-4 w-full"></div>

        {/* ATS Result */}
        <div className="flex flex-col items-center justify-center p-6 w-full md:w-1/2">
          {!file ? (
            <p className="text-gray-500 text-center">
              Upload your resume to check ATS score
            </p>
          ) : (
            <>
              {/* File Info */}
              <div className="flex items-center gap-2 mb-4">
                <FileText className="text-teal-500" />
                <span className="text-gray-700 font-medium text-sm">
                  {file.name}
                </span>
              </div>

              {/* ATS Score */}
              <div
                className="w-20 h-20 rounded-full border-4 border-teal-500 flex items-center justify-center text-lg font-bold text-teal-600 mb-4 shadow-md"
                data-aos="zoom-in"
              >
                85%
              </div>

              {/* Suggestions */}
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                <li>Add more job-specific keywords</li>
                <li>Improve summary section with achievements</li>
                <li>Use consistent formatting for bullet points</li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AtsCheck;
