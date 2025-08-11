import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

function Profile() {
  const { logout } = useAuth();
   const navigate = useNavigate();
  // Initial user data
  const [user, setUser] = useState({
    fullName: "John Doe",
    email: "temp@example.com",
    phone: "+91 1234567890",
    address: "123 Main St, City, Country",
  });

  // Editing mode state
  const [isEditing, setIsEditing] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Save changes and exit edit mode
  const handleSave = () => {
    // You can add validation or API call here
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-xl shadow-teal-200 p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-black mb-6 text-center">
          User Profile
        </h1>

        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <h2 className="text-sm font-semibold text-teal-400">Full Name</h2>
            {isEditing ? (
              <input
                type="text"
                name="fullName"
                value={user.fullName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            ) : (
              <p className="text-lg text-gray-800">{user.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <h2 className="text-sm font-semibold text-teal-400">Email</h2>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            ) : (
              <p className="text-lg text-gray-800">{user.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <h2 className="text-sm font-semibold text-teal-400">
              Phone Number
            </h2>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            ) : (
              <p className="text-lg text-gray-800">{user.phone}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <h2 className="text-sm font-semibold text-teal-400">Address</h2>
            {isEditing ? (
              <textarea
                name="address"
                value={user.address}
                onChange={handleChange}
                className="w-full h-32 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                rows={3}
              />
            ) : (
              <p className="text-lg text-gray-800">{user.address}</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-between">
          {isEditing ? (
            <>
              <button
                className="px-6 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="px-6 py-2 bg-teal-400 text-white rounded-md hover:bg-teal-500 transition"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          )}
        </div>

        {/* Logout Button */}
        <button
          className="mt-6 w-full py-3 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition"
          onClick={(e) => {
            e.preventDefault();
            if (confirm("Are you sure you want to logout?")) {
          logout();
          navigate("/", { replace: true }); // Back button won't return
        }
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
