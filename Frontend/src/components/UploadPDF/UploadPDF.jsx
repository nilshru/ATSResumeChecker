import React, { useState } from "react";

export default function UploadPDF() {
  const [file, setFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState("");
  const [error, setError] = useState("");

  const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      // ✅ Only PDF allowed
      if (selectedFile.type !== "application/pdf") {
        setError("Only PDF files are allowed!");
        setFile(null);
        return;
      }

      // ✅ Max 2MB size
      if (selectedFile.size > 2 * 1024 * 1024) {
        setError("File size must be less than 2MB!");
        setFile(null);
        return;
      }

      setError("");
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (data.secure_url) {
        setPdfUrl(data.secure_url);
      } else {
        setError("Upload failed! Please try again.");
      }
    } catch (err) {
      setError("Upload error: " + err.message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto border rounded-lg shadow">
      <h2 className="text-lg font-bold mb-2">Upload Resume (PDF, max 2MB)</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="mb-2"
      />

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Upload
      </button>

      {pdfUrl && (
        <div className="mt-4">
          <p className="font-medium">Uploaded PDF:</p>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {pdfUrl}
          </a>
        </div>
      )}
    </div>
  );
}
