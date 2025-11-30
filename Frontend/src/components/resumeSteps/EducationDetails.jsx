import React from "react";

function EducationDetails({ data, setData }) {
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updated = [...data.education];
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
    // Optional: Confirm before delete
    if (window.confirm("Are you sure you want to remove this education entry?")) {
      const updated = data.education.filter((_, idx) => idx !== index);
      setData((prev) => ({ ...prev, education: updated }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-gray-800">Education Details</h2>
        <p className="text-sm text-gray-500">
          List your academic background, starting with the most recent.
        </p>
      </div>

      {/* Education Cards List */}
      <div className="space-y-6">
        {data.education.map((edu, idx) => (
          <div 
            key={idx} 
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative group"
          >
            {/* Header Numbering & Delete */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold text-teal-600 uppercase tracking-wide">
                Education #{idx + 1}
              </h3>
              <button
                onClick={() => removeEducation(idx)}
                className="text-gray-400 hover:text-red-600 transition-colors p-1 rounded hover:bg-red-50"
                title="Remove Entry"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* School Name - Full Width */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 mb-1">School / University</label>
                <input
                  type="text"
                  name="school"
                  placeholder="e.g. Stanford University"
                  value={edu.school || ""}
                  onChange={(e) => handleChange(e, idx)}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition text-gray-700 bg-gray-50 focus:bg-white"
                />
              </div>

              {/* Degree - Full Width or Half */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 mb-1">Degree / Field of Study</label>
                <input
                  type="text"
                  name="degree"
                  placeholder="e.g. Bachelor of Computer Science"
                  value={edu.degree || ""}
                  onChange={(e) => handleChange(e, idx)}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition text-gray-700 bg-gray-50 focus:bg-white"
                />
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Start Date</label>
                <input
                  type="text"
                  name="start"
                  placeholder="e.g. Aug 2019"
                  value={edu.start || ""}
                  onChange={(e) => handleChange(e, idx)}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition text-gray-700 bg-gray-50 focus:bg-white"
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">End Date</label>
                <input
                  type="text"
                  name="end"
                  placeholder="e.g. May 2023 or Present"
                  value={edu.end || ""}
                  onChange={(e) => handleChange(e, idx)}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition text-gray-700 bg-gray-50 focus:bg-white"
                />
              </div>

              {/* Grade / Score (Optional) */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 mb-1">Grade / CGPA (Optional)</label>
                <input
                  type="text"
                  name="grade"
                  placeholder="e.g. 3.8/4.0 or 85%"
                  value={edu.grade || ""}
                  onChange={(e) => handleChange(e, idx)}
                  className="w-full md:w-1/2 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition text-gray-700 bg-gray-50 focus:bg-white"
                />
              </div>

            </div>
          </div>
        ))}

        {/* Empty State */}
        {data.education.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
            <p className="text-gray-400 font-medium">No education added yet.</p>
            <p className="text-sm text-gray-400">Click the button below to add your first entry.</p>
          </div>
        )}

        {/* Add Button */}
        <button
          onClick={addEducation}
          className="w-full py-4 border-2 border-dashed border-teal-300 bg-teal-50 text-teal-700 font-semibold rounded-xl hover:bg-teal-100 hover:border-teal-400 transition-all flex items-center justify-center gap-2 group"
        >
          <span className="text-xl group-hover:scale-110 transition-transform">+</span> Add Education
        </button>
      </div>
    </div>
  );
}

export default EducationDetails;