import React from "react";

function PersonalDetails({ data, setData }) {
  const updateField = (field, value) => {
    setData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold mb-2">Personal Details</h2>
      
      {/* Full Name */}
      <input
        type="text"
        placeholder="Full Name"
        value={data.personal.name || ""}
        onChange={(e) => updateField("name", e.target.value)}
        className="w-full border mt-2 p-2 rounded"
      />

      {/* Email - Read Only as per request */}
      <input
        type="email"
        placeholder="Email"
        value={data.personal.email || ""}
        readOnly
        onChange={(e) => updateField("email", e.target.value)}
        className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed text-gray-500"
      />

      {/* Phone and Address Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Phone (e.g., +91 9999999999)"
          value={data.personal.phone || ""}
          onChange={(e) => updateField("phone", e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Address (e.g., Patna, Bihar)"
          value={data.personal.address || ""}
          onChange={(e) => updateField("address", e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Website */}
      <input
        type="text"
        placeholder="Portfolio Website (e.g., nileshofficial.netlify.app)"
        value={data.personal.website || ""}
        onChange={(e) => updateField("website", e.target.value)}
        className="w-full border p-2 rounded"
      />

      {/* Social Links Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="LinkedIn URL"
          value={data.personal.linkedin || ""}
          onChange={(e) => updateField("linkedin", e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="GitHub URL"
          value={data.personal.github || ""}
          onChange={(e) => updateField("github", e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
    </div>
  );
}

export default PersonalDetails;