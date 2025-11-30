import React from "react";

function SummaryDetails({ data, setData }) {
  const handleChange = (e) => {
    // Ensure we maintain the previous state structure
    setData((prev) => ({ ...prev, summary: e.target.value }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-gray-800">Professional Summary</h2>
        <p className="text-sm text-gray-500">
          Write a short, engaging summary that describes your professional background and key achievements.
        </p>
      </div>

      {/* Input Card */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Your Summary
        </label>
        
        <textarea
          placeholder="e.g. Experienced Software Engineer with 5+ years of experience in building scalable web applications using React and Node.js. Passionate about UI/UX and optimizing performance."
          value={data.summary || ""}
          onChange={handleChange}
          rows={6}
          className="w-full border border-gray-300 p-4 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition text-gray-700 bg-gray-50 focus:bg-white resize-y leading-relaxed shadow-inner"
        />

        {/* Tips Section */}
        <div className="mt-4 bg-teal-50 border border-teal-100 p-4 rounded-lg flex gap-3 items-start">
          <span className="text-xl">💡</span>
          <div>
            <h4 className="text-xs font-bold text-teal-800 uppercase mb-1">Tips for a great summary:</h4>
            <ul className="text-xs text-teal-700 space-y-1 list-disc list-inside opacity-90">
              <li>Keep it between 2-4 sentences.</li>
              <li>Mention your current role and years of experience.</li>
              <li>Highlight your biggest achievements or core skills.</li>
              <li>Tailor it to the job you are applying for.</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SummaryDetails;