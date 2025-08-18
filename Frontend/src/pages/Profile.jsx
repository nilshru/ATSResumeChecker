import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, profile, loading, logout, updateProfile } = useAuth();
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  // Initialize form with profile data
  useEffect(() => {
    if (profile) setFormData(profile);
  }, [profile]);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!user)
    return <div className="text-center mt-20">You are not logged in</div>;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile(formData);
      alert("Profile updated successfully!");
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Inside your Profile component, after handleLogout

//  console.log(profile);
const handleDownloadResume = () => {
  if (!profile?.resumePdf) {
    alert("No resume available to download.");
    return;
  }

  // Open in new tab
  const newWindow = window.open();
  if (newWindow) {
    newWindow.location.href = profile.resumePdf;
    newWindow.focus();
  } else {
    alert("Please allow popups for this website to view the resume.");
  }
};


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start pt-24 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl shadow-teal-200 p-8 space-y-6">
        <h2 className="text-center text-2xl font-extrabold text-black sm:text-3xl">
          My Profile
        </h2>

        <form className="space-y-4" onSubmit={handleUpdate}>
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-teal-400">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username || ""}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          {/* Email (read-only) */}
          <div>
            <label className="block text-sm font-medium text-teal-400">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              readOnly
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Other profile fields (optional) */}
          <div>
            <label className="block text-sm font-medium text-teal-400">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
          {/* Download Resume */}
          <button
            type="button"
            onClick={handleDownloadResume}
            className="w-full mt-4 bg-blue-400 text-white py-3 rounded-md border-2 hover:shadow-md shadow-blue-200 hover:border-white hover:bg-blue-300 transition"
          >
            Download Resume
          </button>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-teal-400 text-white py-3 rounded-md border-2 hover:shadow-md shadow-teal-200 hover:border-white hover:bg-teal-300 transition"
          >
            {saving ? "Saving..." : "Update Profile"}
          </button>
        </form>

        <button
          onClick={handleLogout}
          className="w-full mt-4 bg-red-400 text-white py-3 rounded-md border-2 hover:shadow-md shadow-red-200 hover:border-white hover:bg-red-300 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
