import React, { useState, useEffect } from "react";

function AchievementsDetails({ data, setData }) {
  const [achievements, setAchievements] = useState(data.achievements || []);

  // State change hone pe parent me update karna
  useEffect(() => {
    setData({ ...data, achievements });
  }, [achievements]);

  const handleChange = (index, value) => {
    const updated = [...achievements];
    updated[index] = value;
    setAchievements(updated);
  };

  const addAchievement = () => {
    setAchievements([...achievements, ""]);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl p-4 sm:p-6 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">Achievements</h2>

      {achievements.map((achievement, index) => (
        <input
          key={index}
          type="text"
          value={achievement}
          onChange={(e) => handleChange(index, e.target.value)}
          placeholder={`Achievement ${index + 1}`}
          className="w-full border rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
      ))}

      <button
        onClick={addAchievement}
        className="mb-4 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition w-full sm:w-auto"
      >
        + Add Achievement
      </button>

      
    </div>
  );
}

export default AchievementsDetails;
