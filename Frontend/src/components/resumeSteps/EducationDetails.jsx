import React from "react";

function EducationDetails({ data, setData }) {
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updated = [...data.education];
    // Create a new object to maintain immutability
    updated[index] = { ...updated[index], [name]: value };
    setData((prev) => ({ ...prev, education: updated }));
  };

  const addEducation = () => {
    setData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { school: "", degree: "", start: "", end: "", grade: "" },
      ],
    }));
  };

  const removeEducation = (index) => {
    const updated = data.education.filter((_, idx) => idx !== index);
    setData((prev) => ({ ...prev, education: updated }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-2">Education Details</h2>
      
      {data.education.map((edu, idx) => (
        <div key={idx} className="mb-4 border p-4 rounded bg-gray-50 shadow-sm relative">
          <div className="grid grid-cols-1 gap-3">
            
            {/* School */}
            <input
              type="text"
              name="school"
              placeholder="School / University Name"
              value={edu.school || ""}
              onChange={(e) => handleChange(e, idx)}
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Degree */}
            <input
              type="text"
              name="degree"
              placeholder="Degree (e.g., Bachelor of Computer Applications)"
              value={edu.degree || ""}
              onChange={(e) => handleChange(e, idx)}
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="start"
                placeholder="Start Date (e.g., Aug 2024)"
                value={edu.start || ""}
                onChange={(e) => handleChange(e, idx)}
                className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                name="end"
                placeholder="End Date (e.g., Present)"
                value={edu.end || ""}
                onChange={(e) => handleChange(e, idx)}
                className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Grade */}
            <input
              type="text"
              name="grade"
              placeholder="Grade / Performance (e.g., CGPA: 8.93)"
              value={edu.grade || ""}
              onChange={(e) => handleChange(e, idx)}
              className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            onClick={() => removeEducation(idx)}
            className="text-red-500 text-sm mt-3 hover:underline"
          >
            Remove this entry
          </button>
        </div>
      ))}

      <button
        onClick={addEducation}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold"
      >
        + Add Education
      </button>
    </div>
  );
}

export default EducationDetails;