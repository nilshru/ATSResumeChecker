import React from "react";

function EducationDetails({ data, setData }) {
  const handleChange = (e, index) => {
    const updated = [...data.education];
    updated[index][e.target.name] = e.target.value;
    setData({ ...data, education: updated });
  };

  const addEducation = () => {
    setData({
      ...data,
      education: [...data.education, { degree: "", school: "" }],
    });
  };

  const removeEducation = (index) => {
    const updated = data.education.filter((_, idx) => idx !== index);
    setData({ ...data, education: updated });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Education Details</h2>
      {data.education.map((edu, idx) => (
        <div key={idx} className="mb-4 border p-3 rounded">
          <input
            type="text"
            name="degree"
            placeholder="Degree"
            value={edu.degree}
            onChange={(e) => handleChange(e, idx)}
            className="border p-2 w-full mb-2"
          />
          <input
            type="text"
            name="school"
            placeholder="School"
            value={edu.school}
            onChange={(e) => handleChange(e, idx)}
            className="border p-2 w-full"
          />
          <button
            onClick={() => removeEducation(idx)}
            className="bg-red-400 text-white px-3 py-1 rounded mt-2"
          >
            Remove
          </button>
        </div>
      ))}
      <button onClick={addEducation} className="bg-gray-300 px-3 py-1 rounded">
        + Add Education
      </button>
    </div>
  );
}

export default EducationDetails;
