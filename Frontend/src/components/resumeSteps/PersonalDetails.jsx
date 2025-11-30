import React from "react";

function PersonalDetails({ data, setData }) {
  const updateField = (field, value) => {
    setData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-gray-800">Personal Details</h2>
        <p className="text-sm text-gray-500">
          Start with your basic contact information so recruiters can reach you.
        </p>
      </div>

      {/* Main Form Card */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Full Name - Full Width */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Full Name</label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              value={data.personal.name || ""}
              onChange={(e) => updateField("name", e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition text-gray-800 bg-gray-50 focus:bg-white text-lg font-medium"
            />
          </div>

          {/* Email - Read Only */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Email Address</label>
            <input
              type="email"
              placeholder="Email"
              value={data.personal.email || ""}
              readOnly
              onChange={(e) => updateField("email", e.target.value)}
              className="w-full border border-gray-200 p-3 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed select-none"
              title="Email cannot be changed here"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Phone Number</label>
            <input
              type="text"
              placeholder="e.g. +91 98765 43210"
              value={data.personal.phone || ""}
              onChange={(e) => updateField("phone", e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition text-gray-700 bg-gray-50 focus:bg-white"
            />
          </div>

          {/* Address - Full Width */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Address</label>
            <input
              type="text"
              placeholder="e.g. Bangalore, India"
              value={data.personal.address || ""}
              onChange={(e) => updateField("address", e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition text-gray-700 bg-gray-50 focus:bg-white"
            />
          </div>

        </div>
      </div>

      {/* Online Presence Card */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-sm font-bold text-teal-700 uppercase tracking-wide mb-4 border-b border-gray-100 pb-2">
          Online Presence
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* LinkedIn */}
          <div className="col-span-1 md:col-span-2">
             <label className="block text-xs font-semibold text-gray-500 mb-1">LinkedIn URL</label>
             <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  in/
                </span>
                <input
                  type="text"
                  placeholder="linkedin.com/in/username"
                  value={data.personal.linkedin || ""}
                  onChange={(e) => updateField("linkedin", e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-r-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition text-gray-700 focus:bg-white"
                />
             </div>
          </div>

          {/* GitHub */}
          <div>
             <label className="block text-xs font-semibold text-gray-500 mb-1">GitHub URL</label>
             <input
               type="text"
               placeholder="github.com/username"
               value={data.personal.github || ""}
               onChange={(e) => updateField("github", e.target.value)}
               className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition text-gray-700 bg-gray-50 focus:bg-white"
             />
          </div>

          {/* Portfolio Website */}
          <div>
             <label className="block text-xs font-semibold text-gray-500 mb-1">Portfolio / Website</label>
             <input
               type="text"
               placeholder="e.g. nilesh.dev"
               value={data.personal.website || ""}
               onChange={(e) => updateField("website", e.target.value)}
               className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition text-gray-700 bg-gray-50 focus:bg-white"
             />
          </div>

        </div>
      </div>

    </div>
  );
}

export default PersonalDetails;