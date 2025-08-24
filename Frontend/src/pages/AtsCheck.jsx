import React, { useState, useEffect } from "react";
import { CloudUpload, FileText } from "lucide-react";

import "aos/dist/aos.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { extractTextFromFile } from "../utils/extractText";
import AtsLoader from "../components/Loader/AtsLoader";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

// axios.defaults.baseURL = API_BASE;
function AtsCheck() {
  const [jobDesc, setJobDesc] = useState("");
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [score, setScore] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const { user, authFetch } = useAuth();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  

  // 🔹 ATS + Gemini call
  const callAtsScore = async (text) => {
    setLoading(true);
    if (!jobDesc.trim()) return;
    
    try {
      const data = await authFetch(`${API_BASE}/api/ats-score`, {
        method: "POST",
        body: JSON.stringify({ resumeText: text, jobDesc }),
      });

      if (data.success) {
        setScore(data.score);
        // Gemini suggestions are returned only if user has credits
        setSuggestions(data.suggestions || []);
      } else {
        alert(data.error || "Failed to calculate ATS score");
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e) => {
   
    e.preventDefault();
    
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    try {
      setLoading(true);
      setFile(selectedFile);
      const text = await extractTextFromFile(selectedFile);
      setResumeText(text);
      await callAtsScore(text);
    } catch (err) { 
      alert(err.message);
    } 
    finally {
      setLoading(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile) return;

    try {
      setLoading(true);
      setFile(droppedFile);
      const text = await extractTextFromFile(droppedFile);
      setResumeText(text);
      await callAtsScore(text);
    } catch (err) {
      alert(err.message);
    }
    finally {
      setLoading(false);
    }
  };

  if (!user)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <div className="text-center text-5xl">
          Please login to use this feature
        </div>
        <button
          className="bg-teal-400 hover:bg-teal-500 text-white px-4 py-2 rounded mt-4"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    );

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <AtsLoader />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div
        className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl mx-auto 
                   rounded-lg overflow-hidden bg-white shadow-lg p-4
                   border-2 border-teal-400 shadow-teal-200  bg-clip-border"
        
      >
        {/* Upload Area */}
        <div
          className="flex flex-col items-center justify-center p-6 w-full md:w-1/2"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e)}
        >
          <h2 className="text-lg font-semibold text-teal-600 mb-2 w-full text-left">
            Job Description
          </h2>

          <textarea
            className="w-full border border-teal-400 rounded-lg p-3 text-sm mb-4 
                       focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent 
                       shadow-sm"
            rows="5"
            placeholder="Paste or type the job description here..."
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
          />

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
          </div>
        </div>

        {/* Divider */}
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
              <div className="flex items-center gap-2 mb-4">
                <FileText className="text-teal-500" />
                <span className="text-gray-700 font-medium text-sm">
                  {file.name}
                </span>
              </div>

              {/* ATS Score */}
              {score !== null && (
                <div
                  className="w-20 h-20 rounded-full border-4 border-teal-500 flex items-center justify-center text-lg font-bold text-teal-600 mb-4 shadow-md"
                  data-aos="zoom-in"
                >
                  {score}%
                </div>
              )}

              {/* Gemini Suggestions */}
              {suggestions.length > 0 && (
  <div className="mt-2 w-full">
    <h3 className="text-teal-600 font-semibold mb-2">Resume Qualify AI Suggestions</h3>
    <ul className="list-disc list-inside text-gray-700 text-md space-y-1">
      {suggestions.map((s, idx) => {
        // Split by double quotes while keeping the quotes
        const parts = s.split(/(".*?")/g);

        return (
          <li key={idx}>
            {parts.map((part, i) =>
              part.startsWith('"') && part.endsWith('"') ? (
                <strong key={i}>{part}</strong>
              ) : (
                part
              )
            )}
          </li>
        );
      })}
    </ul>
  </div>
)}


              {suggestions.length == 0 ? (
                <p className="mt-2 text-gray-500">
                  No credits left for <span className="font-semibold">Resume Qualify AI</span> suggestions. Only ATS score is
                  shown.
                </p>
              ) : null}

              {/* Debug: Resume Text */}
              {/* <pre className="mt-4 p-2 bg-gray-100 text-xs overflow-auto max-h-40 w-full">
                {resumeText}
              </pre> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AtsCheck;
