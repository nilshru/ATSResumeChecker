import React, { useState } from "react";

function SkillsDetails({ data, setData, nextStep, prevStep }) {
  const [skill, setSkill] = useState("");

  const addSkill = () => {
    if (skill.trim()) {
      setData({ ...data, skills: [...data.skills, skill] });
      setSkill("");
    }
  };

  const deleteLastSkill = () => {
    if (data.skills.length > 0) {
      const updatedSkills = data.skills.slice(0, -1);
      setData({ ...data, skills: updatedSkills });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Skills</h2>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Add a skill"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          className="border p-2 flex-grow"
        />
        <button
          onClick={addSkill}
          className="bg-gray-300 px-3 py-1 rounded ml-2"
        >
          Add
        </button>
      </div>
      <ul className="list-disc ml-5">
        {data.skills.map((s, idx) => (
          <li key={idx}>{s}</li>
        ))}
      </ul>
      <div className="mt-4 flex justify-between">
        <button
          onClick={deleteLastSkill}
          className="bg-gray-300 px-3 py-1 rounded"
        >
          Delete Skill
        </button>
      </div> 
    </div>
  );
}

export default SkillsDetails;
