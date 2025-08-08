import React from "react";

function Footer() {
  return (
    <>
    {/* border change */}
     <footer className="backdrop-blur-sm bg-white/30 border-t-2 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] border-t-white/20 text-center p-4">

        <p className="text-teal-500 text-sm sm:text-xl">
          &copy; 2025 Amity University, Patna - ATS Resume Checker. All rights
          reserved.
        </p>
      </footer>
    </>
  );
}

export default Footer;
