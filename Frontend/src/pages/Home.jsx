
import React from "react";

const Home = () => {
    return (
        <>
        <div className="flex flex-col min-h-screen bg-gray-100">
        {/* Main Content */}
        <div className="flex-grow flex items-center justify-center flex-col">
          <h1 className="text-3xl font-bold">ATS Resume Checker</h1>
          <p>Under Construction Stay Tuned</p>
        </div>

        {/* Footer */}
        <footer className="bg-gray-700 text-center p-4">
          <p className="text-white">&copy; 2025 Amity University, Patna - ATS Resume Checker. All rights reserved.</p>
        </footer>
      </div>
        </>
    );
};

export default Home;