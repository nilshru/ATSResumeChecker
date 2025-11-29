import React, { useState, useEffect } from "react";

function AchievementsDetails({ data, setData }) {
  const [achievements, setAchievements] = useState(
    data.achievements || [
      // default ek empty entry
      { title: "", issuer: "", link: "" }
    ]
  );

  // Update parent on change
  useEffect(() => {
    setData({ ...data, achievements });
  }, [achievements]);

  const handleChange = (index, field, value) => {
    const updated = [...achievements];
    updated[index][field] = value;
    setAchievements(updated);
  };

  const addAchievement = () => {
    setAchievements([
      ...achievements,
      { title: "", issuer: "", link: "" }
    ]);
  };

  const removeAchievement = (index) => {
    const updated = achievements.filter((_, i) => i !== index);
    setAchievements(updated);
  };

  return (
    <div className="flex flex-col w-full max-w-2xl p-4 sm:p-6 mx-auto bg-white rounded-lg shadow-md">
      
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
        Achievements & Certifications
      </h2>

      {achievements.map((ach, index) => (
        <div key={index} className="border p-4 rounded mb-4 shadow-sm bg-gray-50">
          
          {/* Title */}
          <input
            type="text"
            value={ach.title}
            onChange={(e) => handleChange(index, "title", e.target.value)}
            placeholder="Achievement Title"
            className="w-full border rounded-md p-2 mb-2 focus:ring-2 focus:ring-teal-400"
          />

          {/* Issuer */}
          <input
            type="text"
            value={ach.issuer}
            onChange={(e) => handleChange(index, "issuer", e.target.value)}
            placeholder="Issuer / Organization"
            className="w-full border rounded-md p-2 mb-2 focus:ring-2 focus:ring-teal-400"
          />

          {/* Link (Optional) */}
          <input
            type="text"
            value={ach.link}
            onChange={(e) => handleChange(index, "link", e.target.value)}
            placeholder="Certificate Link (Optional)"
            className="w-full border rounded-md p-2 mb-2 focus:ring-2 focus:ring-teal-400"
          />

          {/* Delete button */}
          <button
            onClick={() => removeAchievement(index)}
            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Delete
          </button>

        </div>
      ))}

      {/* Add Achievement Button */}
      <button
        onClick={addAchievement}
        className="px-4 py-2 bg-teal-600 text-white rounded-md w-full sm:w-auto hover:bg-teal-700 transition font-semibold"
      >
        + Add Achievement
      </button>
    </div>
  );
}

export default AchievementsDetails;
