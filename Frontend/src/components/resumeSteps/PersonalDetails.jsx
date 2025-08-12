import React from "react";

function PersonalDetails({ data, setData }) {
  const updateField = (field, value) => {
    setData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }));
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Full Name"
        value={data.personal.name}
        onChange={(e) => updateField("name", e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={data.personal.email}
        onChange={(e) => updateField("email", e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Phone"
        value={data.personal.phone}
        onChange={(e) => updateField("phone", e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Address"
        value={data.personal.address}
        onChange={(e) => updateField("address", e.target.value)}
        className="w-full border p-2 rounded"
      />
    </div>
  );
}

export default PersonalDetails;
