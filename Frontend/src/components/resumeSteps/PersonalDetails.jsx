// PersonalDetails.jsx
import React from "react";
import UploadImage from "../UploadImage/UploadImage";

function PersonalDetails({ data, setData }) {
  const updateField = (field, value) => {
    setData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }));
  };

  return (
    <div className="space-y-4">
      <UploadImage onUpload={(url) => updateField("profileImage", url)} />

      {/* agar image already upload ho gayi hai to dikhao */}
      {data.personal.profileImage && (
        <div className="mt-2">
          <img
            src={data.personal.profileImage}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>
      )}

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
        readOnly
        onChange={(e) => updateField("email", e.target.value)}
        className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
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
