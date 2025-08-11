import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 z-50 flex items-center justify-between
                    w-full px-5 sm:px-10 py-4 backdrop-blur-sm bg-white/70 
                    border-b-2 shadow-xl shadow-teal-200/10 border-b-teal-400">
      
      {/* Logo */}
      <Link to="/">
      <div className="flex items-center">
        <img src="./logo.png" alt="ATS" className="w-[30px] sm:w-[40px]" />
      </div>
      </Link>

      {/* Desktop Nav */}
      <ul className="hidden sm:flex flex-row items-center">
        <li className="mx-1 sm:mx-4 text-[18px] sm:text-2xl hover:underline">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-teal-500" : "text-black"}>
            Home
          </NavLink>
        </li>
        <li className="mx-1 sm:mx-4 text-[18px] sm:text-2xl hover:underline">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-teal-500" : "text-black"}>
            ATS Score
          </NavLink>
        </li>
        <li className="mx-1 sm:mx-4 text-[18px] sm:text-2xl hover:underline">
          <NavLink to="/templates" className={({ isActive }) => isActive ? "text-teal-500" : "text-black"}>
            Templates
          </NavLink>
        </li>
        <li className="mx-1 sm:mx-4 text-[18px] sm:text-2xl hover:underline">
          <NavLink to="/profile" className={({ isActive }) => isActive ? "text-teal-500" : "text-black"}>
            Profile
          </NavLink>
        </li>
      </ul>

      {/* Mobile Hamburger */}
      <div className="sm:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-6 h-[18px] flex flex-col justify-between items-center group"
        >
          <span
            className={`block h-[2px] w-full bg-teal-400 rounded transition-all duration-300 
            ${isOpen ? "rotate-45 translate-y-[8px]" : ""}`}
          ></span>
          <span
            className={`block h-[2px] w-full bg-teal-400 rounded transition-all duration-300 
            ${isOpen ? "opacity-0" : ""}`}
          ></span>
          <span
            className={`block h-[2px] w-full bg-teal-400 rounded transition-all duration-300 
            ${isOpen ? "-rotate-45 -translate-y-[8px]" : ""}`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg sm:hidden animate-slideDown">
          <ul className="flex flex-col items-start p-4">
            <li className="py-2 w-full">
              <NavLink to="/" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "text-teal-500" : "text-black"}>
                Home
              </NavLink>
            </li>
            <li className="py-2 w-full">
              <NavLink to="/" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "text-teal-500" : "text-black"}>
                ATS Score
              </NavLink>
            </li>
            <li className="py-2 w-full">
              <NavLink to="/templates" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "text-teal-500" : "text-black"}>
                Templates
              </NavLink>
            </li>
            <li className="py-2 w-full">
              <NavLink to="/profile" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "text-teal-500" : "text-black"}>
                Profile
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Header;
