import React from "react";

function AchievementsDetails({ data, setData }) {
  // Use data directly from props to maintain consistency with other components
  const achievements = data.achievements || [];

  const handleChange = (index, field, value) => {
    const updated = [...achievements];
    // Create new object to maintain immutability
    updated[index] = { ...updated[index], [field]: value };
    setData((prev) => ({ ...prev, achievements: updated }));
  };

  const addAchievement = () => {
    setData((prev) => ({
      ...prev,
      achievements: [
        ...(prev.achievements || []),
        { title: "", issuer: "", link: "" }
      ],
    }));
  };

  const removeAchievement = (index) => {
    if (window.confirm("Are you sure you want to remove this achievement?")) {
      const updated = achievements.filter((_, i) => i !== index);
      setData((prev) => ({ ...prev, achievements: updated }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-gray-800">Achievements & Certifications</h2>
        <p className="text-sm text-gray-500">
          Add certifications, awards, or recognitions to validate your skills.
        </p>
      </div>

      {/* Achievements List */}
      <div className="space-y-6">
        {achievements.map((ach, index) => (
          <div 
            key={index} 
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative group"
          >
            {/* Header Numbering & Delete */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold text-teal-600 uppercase tracking-wide">
                Achievement #{index + 1}
              </h3>
              <button
                onClick={() => removeAchievement(index)}
                className="text-gray-400 hover:text-red-600 transition-colors p-1 rounded hover:bg-red-50"
                title="Remove Achievement"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Achievement Title */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 mb-1">Title / Name of Award</label>
                <input
                  type="text"
                  placeholder="e.g. AWS Certified Solutions Architect"
                  value={ach.title || ""}
                  onChange={(e) => handleChange(index, "title", e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition text-gray-700 bg-gray-50 focus:bg-white"
                />
              </div>

              {/* Issuer */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 mb-1">Issuing Organization</label>
                <input
                  type="text"
                  placeholder="e.g. Amazon Web Services (AWS)"
                  value={ach.issuer || ""}
                  onChange={(e) => handleChange(index, "issuer", e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition text-gray-700 bg-gray-50 focus:bg-white"
                />
              </div>

              {/* Link (Optional) */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 mb-1">Credential URL (Optional)</label>
                <input
                  type="text"
                  placeholder="https://coursera.org/verify/..."
                  value={ach.link || ""}
                  onChange={(e) => handleChange(index, "link", e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition text-gray-700 bg-gray-50 focus:bg-white"
                />
              </div>

            </div>
          </div>
        ))}

        {/* Empty State */}
        {achievements.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
            <p className="text-gray-400 font-medium">No achievements added yet.</p>
            <p className="text-sm text-gray-400">Include hackathons, certifications, or awards.</p>
          </div>
        )}

        {/* Add Button */}
        <button
          onClick={addAchievement}
          className="w-full py-4 border-2 border-dashed border-teal-300 bg-teal-50 text-teal-700 font-semibold rounded-xl hover:bg-teal-100 hover:border-teal-400 transition-all flex items-center justify-center gap-2 group"
        >
          <span className="text-xl group-hover:scale-110 transition-transform">+</span> Add Achievement
        </button>
      </div>
    </div>
  );
}

export default AchievementsDetails;