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
    if (window.confirm(`Are you sure you want to delete the "${category}" category?`)) {
      const updated = { ...skills };
      delete updated[category];

      setData((prev) => ({
        ...prev,
        skills: updated,
      }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-gray-800">Technical Skills</h2>
        <p className="text-sm text-gray-500">
          Group your skills by category (e.g., Languages, Frameworks, Tools) to make them easier to read.
        </p>
      </div>

      {/* --- ADD NEW CATEGORY SECTION --- */}
      <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-xl border border-blue-100 shadow-sm">
        <label className="block text-sm font-semibold text-blue-800 mb-2 uppercase tracking-wide">
          Create New Skill Category
        </label>
        
        {/* FIX: Use flex-col for mobile, flex-row for larger screens */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="e.g. Frontend, Backend, Cloud Services..."
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addCategory()}
            className="w-full sm:flex-1 border border-blue-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition shadow-sm text-gray-700 placeholder-gray-400"
          />
          <button
            onClick={addCategory}
            disabled={!newCategory.trim()}
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md font-medium flex justify-center items-center gap-2 whitespace-nowrap"
          >
            <span>+ Add Category</span>
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200 my-6"></div>

      {/* --- SKILL CATEGORIES LIST --- */}
      <div className="space-y-6">
        {Object.keys(skills).length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-400 font-medium">No skill categories added yet.</p>
            <p className="text-xs text-gray-400 mt-1">Start by adding a category above.</p>
          </div>
        ) : (
          Object.keys(skills).map((category) => (
            <div
              key={category}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            >
              {/* Category Header */}
              <div className="bg-gray-50 px-5 py-3 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                  <span className="w-2 h-6 bg-teal-500 rounded-full"></span>
                  {category}
                </h3>
                <button
                  onClick={() => deleteCategory(category)}
                  className="text-gray-400 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50"
                  title="Delete Category"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              <div className="p-5">
                {/* Input Area */}
                {/* FIX: Responsive layout for adding individual skills as well */}
                <div className="flex flex-col sm:flex-row gap-3 mb-5">
                  <input
                    type="text"
                    placeholder={`Add a specific skill to ${category}...`}
                    value={inputs[category] || ""}
                    onChange={(e) =>
                      setInputs((p) => ({ ...p, [category]: e.target.value }))
                    }
                    onKeyDown={(e) => e.key === "Enter" && addSkill(category)}
                    className="w-full sm:flex-1 border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm"
                  />
                  <button
                    onClick={() => addSkill(category)}
                    className="w-full sm:w-auto bg-gray-800 text-white px-5 py-2.5 rounded-lg hover:bg-black transition text-sm font-medium"
                  >
                    Add
                  </button>
                </div>

                {/* Skills Chips Area */}
                <div className="flex flex-wrap gap-2">
                  {skills[category].length === 0 ? (
                    <span className="text-gray-400 text-sm italic py-2">
                      No skills added in this category yet.
                    </span>
                  ) : (
                    skills[category].map((skill, idx) => (
                      <div
                        key={idx}
                        className="group flex items-center bg-teal-50 text-teal-800 border border-teal-200 px-3 py-1.5 rounded-md text-sm font-medium transition-all hover:bg-teal-100"
                      >
                        <span>{skill}</span>
                        <button
                          onClick={() => removeSkill(category, idx)}
                          className="ml-2 text-teal-400 hover:text-teal-700 focus:outline-none opacity-60 group-hover:opacity-100 transition-opacity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SkillsDetails;