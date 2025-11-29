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
    const updated = data.projects.filter((_, idx) => idx !== index);
    setData((prev) => ({ ...prev, projects: updated }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-2">Projects Details</h2>
      
      {data.projects.map((proj, idx) => (
        <div key={idx} className="mb-4 border p-4 rounded bg-gray-50 shadow-sm relative">
            <div className="grid grid-cols-1 gap-3">
                {/* Title */}
                <input
                type="text"
                name="title"
                placeholder="Project Title"
                value={proj.title || ""}
                onChange={(e) => handleChange(e, idx)}
                className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                
                {/* Links Row */}
                <div className="grid grid-cols-2 gap-4">
                    <input
                    type="text"
                    name="live"
                    placeholder="Live Link (optional)"
                    value={proj.live || ""}
                    onChange={(e) => handleChange(e, idx)}
                    className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                    type="text"
                    name="github"
                    placeholder="GitHub Link (optional)"
                    value={proj.github || ""}
                    onChange={(e) => handleChange(e, idx)}
                    className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Tools */}
                <input
                type="text"
                name="tools"
                placeholder="Tools Used (e.g., React.js, Node.js, Firebase)"
                value={proj.tools || ""}
                onChange={(e) => handleChange(e, idx)}
                className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* Description Points */}
                <textarea
                name="points"
                placeholder="Description Points (Type each bullet point on a new line)"
                value={getPointsString(proj.points)}
                onChange={(e) => handlePointsChange(e, idx)}
                rows={4}
                className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

          <button
            onClick={() => removeProject(idx)}
            className="text-red-500 text-sm mt-3 hover:underline"
          >
            Remove this project
          </button>
        </div>
      ))}

      <button
        onClick={addProject}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold"
      >
        + Add Project
      </button>
    </div>
  );
}

export default ProjectsDetails;