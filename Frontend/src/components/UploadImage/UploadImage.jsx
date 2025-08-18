// UploadImage.jsx
import React, { useState } from "react";

const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;


function UploadImage({ onUpload }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0] || null;
    setError("");

    if (selected) {
      if (selected.size > 2 * 1024 * 1024) {
        setError("File size should not exceed 2 MB.");
        setFile(null);
        setPreview("");
        return;
      }
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    } else {
      setFile(null);
      setPreview("");
    }
  };

  const handleUpload = async () => {
    if (!file) return setError("Please choose an image first.");
    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      
      if (onUpload) {
        onUpload(data.secure_url); // ✅ parent ko link bhejna
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "12px 0", fontFamily: "sans-serif" }}>
      <h3>Profile Image</h3>
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {preview && (
        <div style={{ marginTop: 12 }}>
          <img
            src={preview}
            alt="preview"
            style={{ maxWidth: "100px", borderRadius: "50%" }}
          />
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        style={{ marginTop: 12 }}
      >
        {uploading ? "Uploading..." : "Save Image"}
      </button>

      {error && <p style={{ color: "crimson" }}>{error}</p>}
    </div>
  );
}

export default UploadImage;
