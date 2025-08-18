import React from "react";

function ProjectsDetails({ data, setData }) {
  const handleChange = (e, index) => {
    const updated = [...data.projects];
    updated[index][e.target.name] = e.target.value;
    setData({ ...data, projects: updated });
  };

  const addProject = () => {
    setData({
      ...data,
      projects: [...data.projects, { title: "", description: "" }]
    });
  };

  const deleteLastProject = () => {
    if (data.projects.length > 0) {
      const updated = data.projects.slice(0, -1); // last element remove
      setData({ ...data, projects: updated });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Projects</h2>
      {data.projects.map((proj, idx) => (
        <div key={idx} className="mb-4">
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={proj.title}
            onChange={(e) => handleChange(e, idx)}
            className="border p-2 w-full mb-2"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={proj.description}
            onChange={(e) => handleChange(e, idx)}
            className="border p-2 w-full"
          />
        </div>
      ))}

      <button onClick={addProject} className="bg-gray-300 px-3 py-1 rounded">
        + Add Project
      </button>

      <div className="mt-4 flex justify-between">
        <button
          onClick={deleteLastProject}
          className="bg-red-400 text-white px-3 py-1 rounded"
        >
          Delete Last Project
        </button>
      </div> 
    </div>
  );
}

export default ProjectsDetails;
