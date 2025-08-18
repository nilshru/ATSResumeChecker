import React from "react";

function ResumePreview({ data = {} }) {
  return (
    <div className="text-gray-900">
      {/* Personal */}
      <div className="border-b pb-2 mb-2">
        <h1 className="text-2xl text-center font-bold">
          {data.personal?.name || "Your Name"}
        </h1>
        <p>
          {data.personal?.email || "email@example.com"} |{" "}
          {data.personal?.phone || "123-456-7890"}
        </p>
        <p>{data.personal?.address || "Your Address"}</p>
      </div>
      {/* Summary */}
      <div className="mb-2">
        {data.summary ? (
          <p className="mt-2 italic  text-gray-700">
            {data.summary}
          </p>
        ) : (
          <p className="mt-2 italic text-center text-gray-400">
            "Passionate web developer with a love for coding and problem
            solving."
          </p>
        )}
      </div>

      {/* Education */}
      <div className="mb-2">
        <h2 className="text-lg font-semibold border-b">
          {data.headings?.education || "Education"}
        </h2>
        {data.education?.length > 0 ? (
          data.education.map((edu, idx) => (
            <p key={idx}>
              {edu.degree} - {edu.school}
            </p>
          ))
        ) : (
          <p className="text-gray-500">No education added yet</p>
        )}
      </div>

      {/* Experience */}
      <div className="mb-2">
        <h2 className="text-lg font-semibold border-b">
          {data.headings?.experience || "Experience"}
        </h2>
        {data.experience?.length > 0 ? (
          data.experience.map((exp, idx) => (
            <p key={idx}>
              {exp.role} - {exp.company}
            </p>
          ))
        ) : (
          <p className="text-gray-500">No experience added yet</p>
        )}
      </div>

      {/* Skills */}
      <div className="mb-2">
        <h2 className="text-lg font-semibold border-b">
          {data.headings?.skills || "Skills"}
        </h2>
        {data.skills?.length > 0 ? (
          <ul className="list-disc ml-5">
            {data.skills.map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No skills added yet</p>
        )}
      </div>

      {/* Projects */}
      <div className="mb-2">
        <h2 className="text-lg font-semibold border-b">
          {data.headings?.projects || "Projects"}
        </h2>
        {data.projects?.length > 0 ? (
          data.projects.map((proj, idx) => (
            <p key={idx}>
              {proj.title} - {proj.description}
            </p>
          ))
        ) : (
          <p className="text-gray-500">No projects added yet</p>
        )}
      </div>

      {/* Achievements */}
      <div>
        <h2 className="text-lg font-semibold border-b">
          {data.headings?.achievements || "Achievements"}
        </h2>
        {data.achievements?.length > 0 ? (
          <ul className="list-disc ml-5">
            {data.achievements.map((ach, idx) => (
              <li key={idx}>{ach}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No achievements added yet</p>
        )}
      </div>
    </div>
  );
}

export default ResumePreview;
