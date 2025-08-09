import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <nav className="fixed top-0 left-0 z-50 flex flex-row justify-between items-center 
                    w-full px-2 sm:px-10 py-4 backdrop-blur-sm bg-white/70 
                    border-b-2 shadow-xl shadow-teal-200/10 border-b-teal-400">
      <div className="flex w-[30px] sm:w-[40px]">
        <img src="./logo.png" alt="ATS" />
      </div>

      <ul className="flex flex-row justify-center items-center w-full">
        <li className="mx-1 sm:mx-4 text-[18px] sm:text-2xl hover:underline">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-teal-500" : "text-black"
            }
          >
            Resume Checker
          </NavLink>
        </li>
        <li className="mx-1 sm:mx-4 text-[18px] sm:text-2xl hover:underline">
          <NavLink
            to="/upload"
            className={({ isActive }) =>
              isActive ? "text-teal-500" : "text-black"
            }
          >
            Skill Suggestions
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
