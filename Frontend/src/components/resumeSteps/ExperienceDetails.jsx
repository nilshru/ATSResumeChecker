import React from "react";

function ExperienceDetails({ data, setData }) {
  const handleChange = (e, index) => {
    const updated = [...data.experience];
    updated[index][e.target.name] = e.target.value;
    setData({ ...data, experience: updated });
  };

  const addExperience = () => {
    setData({
      ...data,
      experience: [...data.experience, { role: "", company: "" }]
    });
  };

  const deleteExperience = () => {
    if (data.experience.length > 0) {
      const updated = [...data.experience];
      updated.pop(); // last experience remove
      setData({ ...data, experience: updated });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Experience Details</h2>
      {data.experience.map((exp, idx) => (
        <div key={idx} className="mb-4">
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={exp.role}
            onChange={(e) => handleChange(e, idx)}
            className="border p-2 w-full mb-2"
          />
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={exp.company}
            onChange={(e) => handleChange(e, idx)}
            className="border p-2 w-full"
          />
        </div>
      ))}
      <div className="flex gap-2 mt-4">
        <button
          onClick={addExperience}
          className="bg-gray-300 px-3 py-1 rounded"
        >
          + Add Experience
        </button>
        <button
          onClick={deleteExperience}
          className="bg-red-300 px-3 py-1 rounded"
        >
          - Delete Experience 
        </button>
      </div>
    </div>
  );
}

export default ExperienceDetails;
