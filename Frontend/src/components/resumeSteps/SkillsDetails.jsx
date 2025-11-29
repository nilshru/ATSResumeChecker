import React, { useState } from "react";

function SkillsDetails({ data, setData }) {
  const [newCategory, setNewCategory] = useState("");
  const [inputs, setInputs] = useState({}); // category-wise skill input

  const skills = data.skills || {};

  const addCategory = () => {
    const title = newCategory.trim();
    if (!title || skills[title]) return;

    setData((prev) => ({
      ...prev,
      skills: {
        ...skills,
        [title]: [],
      },
    }));

    setNewCategory("");
  };

  const addSkill = (category) => {
    const value = (inputs[category] || "").trim();
    if (!value) return;

    setData((prev) => ({
      ...prev,
      skills: {
        ...skills,
        [category]: [...skills[category], value],
      },
    }));

    setInputs((p) => ({ ...p, [category]: "" }));
  };

  const removeSkill = (category, index) => {
    setData((prev) => ({
      ...prev,
      skills: {
        ...skills,
        [category]: skills[category].filter((_, i) => i !== index),
      },
    }));
  };

  const deleteCategory = (category) => {
    const updated = { ...skills };
    delete updated[category];

    setData((prev) => ({
      ...prev,
      skills: updated,
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-2">Technical Skills</h2>

      {/* Add New Category */}
      <div className="bg-blue-50 p-4 rounded border border-blue-300 shadow-sm">
        <label className="block font-semibold mb-2 text-gray-700">
          Add New Category
        </label>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="e.g., Tech Stack, Cloud, AI Models"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addCategory}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold"
          >
            Add
          </button>
        </div>
      </div>

      {/* Show dynamic categories */}
      {Object.keys(skills).length === 0 && (
        <p className="text-gray-400 italic">No categories added yet.</p>
      )}

      {Object.keys(skills).map((category) => (
        <div
          key={category}
          className="bg-gray-50 p-4 rounded border shadow-sm"
        >
          {/* Category Title + Delete */}
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-700 text-lg">
              {category}
            </h3>

            <button
              onClick={() => deleteCategory(category)}
              className="text-red-600 hover:text-red-800 font-bold text-sm"
            >
              Delete Category
            </button>
          </div>

          {/* Skill Input */}
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder={`Add skill to ${category}`}
              value={inputs[category] || ""}
              onChange={(e) =>
                setInputs((p) => ({ ...p, [category]: e.target.value }))
              }
              onKeyDown={(e) => e.key === "Enter" && addSkill(category)}
              className="border p-2 w-full rounded"
            />
            <button
              onClick={() => addSkill(category)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold"
            >
              Add
            </button>
          </div>

          {/* Skills Chips */}
          <div className="flex flex-wrap gap-2">
            {skills[category].length === 0 ? (
              <span className="text-gray-400 italic text-sm">
                No skills added yet.
              </span>
            ) : (
              skills[category].map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-white border px-3 py-1 rounded-full text-sm flex items-center gap-2 shadow-sm"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(category, idx)}
                    className="text-red-500 hover:text-red-700 font-bold w-4 h-4 flex items-center justify-center rounded-full"
                  >
                    ×
                  </button>
                </span>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SkillsDetails;
