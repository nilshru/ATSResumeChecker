import React from "react";

function ExperienceDetails({ data, setData }) {
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updated = [...data.experience];
    updated[index] = { ...updated[index], [name]: value };
    setData((prev) => ({ ...prev, experience: updated }));
  };

  // Special handler for description points to split by newline
  const handlePointsChange = (e, index) => {
    const { value } = e.target;
    const updated = [...data.experience];
    updated[index] = { ...updated[index], points: value.split("\n") };
    setData((prev) => ({ ...prev, experience: updated }));
  };

  // Helper to convert array back to string for textarea display
  const getPointsString = (points) => {
    if (!points) return "";
    return Array.isArray(points) ? points.join("\n") : points;
  };

  const addExperience = () => {
    setData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { role: "", company: "", start: "", end: "", points: [] },
      ],
    }));
  };

  const removeExperience = (index) => {
    if (window.confirm("Are you sure you want to remove this experience entry?")) {
      const updated = data.experience.filter((_, idx) => idx !== index);
      setData((prev) => ({ ...prev, experience: updated }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-gray-800">Experience Details</h2>
        <p className="text-sm text-gray-500">
          Highlight your professional journey. Focus on achievements and responsibilities.
        </p>
      </div>

      {/* Experience Cards List */}
      <div className="space-y-6">
        {data.experience.map((exp, idx) => (
          <div 
            key={idx} 
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative group"
          >
            {/* Header Numbering & Delete */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold text-teal-600 uppercase tracking-wide">
                Experience #{idx + 1}
              </h3>
              <button
                onClick={() => removeExperience(idx)}
                className="text-gray-400 hover:text-red-600 transition-colors p-1 rounded hover:bg-red-50"
                title="Remove Entry"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Role / Job Title */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 mb-1">Job Title</label>
                <input
                  type="text"
                  name="role"
                  placeholder="e.g. Senior Software Engineer"
                  value={exp.role || ""}
                  onChange={(e) => handleChange(e, idx)}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition text-gray-700 bg-gray-50 focus:bg-white"
                />
              </div>

              {/* Company Name */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 mb-1">Company / Organization</label>
                <input
                  type="text"
                  name="company"
                  placeholder="e.g. Google, Microsoft, or Startup Inc."
                  value={exp.company || ""}
                  onChange={(e) => handleChange(e, idx)}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition text-gray-700 bg-gray-50 focus:bg-white"
                />
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Start Date</label>
                <input
                  type="text"
                  name="start"
                  placeholder="e.g. Jan 2022"
                  value={exp.start || ""}
                  onChange={(e) => handleChange(e, idx)}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition text-gray-700 bg-gray-50 focus:bg-white"
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">End Date</label>
                <input
                  type="text"
                  name="end"
                  placeholder="e.g. Present"
                  value={exp.end || ""}
                  onChange={(e) => handleChange(e, idx)}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition text-gray-700 bg-gray-50 focus:bg-white"
                />
              </div>

              {/* Description Points - Full Width */}
              <div className="col-span-1 md:col-span-2">
                <div className="flex justify-between items-end mb-1">
                  <label className="block text-xs font-semibold text-gray-500">Key Achievements / Responsibilities</label>
                  <span className="text-[10px] text-teal-600 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                    Tip: Press <strong>Enter</strong> to create a new bullet point
                  </span>
                </div>
                <textarea
                  name="points"
                  placeholder="• Led a team of 5 developers...&#10;• Improved site performance by 40%..."
                  value={getPointsString(exp.points)}
                  onChange={(e) => handlePointsChange(e, idx)}
                  rows={5}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition text-gray-700 bg-gray-50 focus:bg-white resize-y leading-relaxed"
                />
              </div>

            </div>
          </div>
        ))}

        {/* Empty State */}
        {data.experience.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
            <p className="text-gray-400 font-medium">No experience details added.</p>
            <p className="text-sm text-gray-400">Freshers can skip this or add internships/projects.</p>
          </div>
        )}

        {/* Add Button */}
        <button
          onClick={addExperience}
          className="w-full py-4 border-2 border-dashed border-teal-300 bg-teal-50 text-teal-700 font-semibold rounded-xl hover:bg-teal-100 hover:border-teal-400 transition-all flex items-center justify-center gap-2 group"
        >
          <span className="text-xl group-hover:scale-110 transition-transform">+</span> Add Experience
        </button>
      </div>
    </div>
  );
}

export default ExperienceDetails;