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
    const updated = data.experience.filter((_, idx) => idx !== index);
    setData((prev) => ({ ...prev, experience: updated }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-2">Experience Details</h2>

      {data.experience.map((exp, idx) => (
        <div key={idx} className="mb-4 border p-4 rounded bg-gray-50 shadow-sm relative">
          <div className="grid grid-cols-1 gap-3">
            {/* Role and Company */}
            <input
              type="text"
              name="role"
              placeholder="Role / Job Title"
              value={exp.role || ""}
              onChange={(e) => handleChange(e, idx)}
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={exp.company || ""}
              onChange={(e) => handleChange(e, idx)}
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="start"
                placeholder="Start Date (e.g., Jan 2022)"
                value={exp.start || ""}
                onChange={(e) => handleChange(e, idx)}
                className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                name="end"
                placeholder="End Date (e.g., Present)"
                value={exp.end || ""}
                onChange={(e) => handleChange(e, idx)}
                className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Description Points */}
            <textarea
              name="points"
              placeholder="Job Description / Responsibilities (Type each bullet point on a new line)"
              value={getPointsString(exp.points)}
              onChange={(e) => handlePointsChange(e, idx)}
              rows={4}
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            onClick={() => removeExperience(idx)}
            className="text-red-500 text-sm mt-3 hover:underline"
          >
            Remove this experience
          </button>
        </div>
      ))}

      <button
        onClick={addExperience}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold"
      >
        + Add Experience
      </button>
    </div>
  );
}

export default ExperienceDetails;