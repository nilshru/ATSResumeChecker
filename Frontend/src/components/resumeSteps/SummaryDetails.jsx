import React from "react";

function SummaryDetails({ data, setData }) {
  const handleChange = (e) => {
    setData({ ...data, summary: e.target.value });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Professional Summary</h2>
      <textarea
        placeholder="Write a brief summary about yourself..."
        value={data.summary || ""}
        onChange={handleChange}
        rows={4}
        className="border p-2 w-full resize-none"
      ></textarea>


    </div>
  );
}

export default SummaryDetails;
