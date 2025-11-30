import React from "react";

function ProjectsDetails({ data, setData }) {
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updated = [...data.projects];
    updated[index] = { ...updated[index], [name]: value };
    setData((prev) => ({ ...prev, projects: updated }));
  };

  // Special handler for description points to split by newline
  const handlePointsChange = (e, index) => {
    const { value } = e.target;
    const updated = [...data.projects];
    // Split by newline to create array of points
    updated[index] = { ...updated[index], points: value.split("\n") };
    setData((prev) => ({ ...prev, projects: updated }));
  };

  // Helper to convert array back to string for textarea display
  const getPointsString = (points) => {
    if (!points) return "";
    return Array.isArray(points) ? points.join("\n") : points;
  };

  const addProject = () => {
    setData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        { title: "", live: "", github: "", tools: "", points: [] },
      ],
    }));
  };

  const removeProject = (index) => {
    if (window.confirm("Are you sure you want to remove this project?")) {
        const updated = data.projects.filter((_, idx) => idx !== index);
        setData((prev) => ({ ...prev, projects: updated }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-gray-800">Projects Details</h2>
        <p className="text-sm text-gray-500">
          Showcase your best work. Include links to live demos or code repositories.
        </p>
      </div>
      
      {/* Projects List */}
      <div className="space-y-6">
      {data.projects.map((proj, idx) => (
        <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative group">
            
            {/* Header Numbering & Delete */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold text-teal-600 uppercase tracking-wide">
                Project #{idx + 1}
              </h3>
              <button
                onClick={() => removeProject(idx)}
                className="text-gray-400 hover:text-red-600 transition-colors p-1 rounded hover:bg-red-50"
                title="Remove Project"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Title */}
                <div className="col-span-1 md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Project Title</label>
                    <input
                    type="text"
                    name="title"
                    placeholder="e.g. E-commerce Dashboard"
                    value={proj.title || ""}
                    onChange={(e) => handleChange(e, idx)}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition text-gray-700 bg-gray-50 focus:bg-white"
                    />
                </div>
                
                {/* Links Row */}
                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Live Link (Optional)</label>
                    <input
                    type="text"
                    name="live"
                    placeholder="https://myproject.com"
                    value={proj.live || ""}
                    onChange={(e) => handleChange(e, idx)}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition text-gray-700 bg-gray-50 focus:bg-white"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">GitHub / Repo Link (Optional)</label>
                    <input
                    type="text"
                    name="github"
                    placeholder="https://github.com/username/repo"
                    value={proj.github || ""}
                    onChange={(e) => handleChange(e, idx)}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition text-gray-700 bg-gray-50 focus:bg-white"
                    />
                </div>

                {/* Tools */}
                <div className="col-span-1 md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Tech Stack / Tools Used</label>
                    <input
                    type="text"
                    name="tools"
                    placeholder="e.g. React.js, Node.js, Firebase, Tailwind CSS"
                    value={proj.tools || ""}
                    onChange={(e) => handleChange(e, idx)}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition text-gray-700 bg-gray-50 focus:bg-white"
                    />
                </div>

                {/* Description Points */}
                <div className="col-span-1 md:col-span-2">
                    <div className="flex justify-between items-end mb-1">
                        <label className="block text-xs font-semibold text-gray-500">Key Features & Contributions</label>
                        <span className="text-[10px] text-teal-600 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                            Tip: Press <strong>Enter</strong> for new bullet point
                        </span>
                    </div>
                    <textarea
                    name="points"
                    placeholder="• Implemented user authentication using JWT...&#10;• Designed responsive UI with Tailwind..."
                    value={getPointsString(proj.points)}
                    onChange={(e) => handlePointsChange(e, idx)}
                    rows={4}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition text-gray-700 bg-gray-50 focus:bg-white resize-y leading-relaxed"
                    />
                </div>
            </div>

        </div>
      ))}

      {/* Empty State */}
        {data.projects.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
            <p className="text-gray-400 font-medium">No projects added yet.</p>
            <p className="text-sm text-gray-400">Add your academic or side projects here.</p>
          </div>
        )}

      <button
        onClick={addProject}
        className="w-full py-4 border-2 border-dashed border-teal-300 bg-teal-50 text-teal-700 font-semibold rounded-xl hover:bg-teal-100 hover:border-teal-400 transition-all flex items-center justify-center gap-2 group"
      >
        <span className="text-xl group-hover:scale-110 transition-transform">+</span> Add Project
      </button>
      </div>
    </div>
  );
}

export default ProjectsDetails;