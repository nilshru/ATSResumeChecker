import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="flex justify-center items-center">
      <nav className="sticky top-0 z-50 flex flex-row justify-between items-center m-2 w-3xl px-6 py-4 
                      rounded-4xl backdrop-blur-sm bg-white/10 border-2 border-white/20">
        <div className="flex w-[40px]">
          <img src="./logo.png" alt="ATS" />
        </div>

        <ul className="flex flex-row justify-center items-center w-full">
          <li className="mx-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-orange-300" : "text-white"
              }
            >
              Resume Checker
            </NavLink>
          </li>
          <li className="mx-4">
            <NavLink
              to="/upload"
              className={({ isActive }) =>
                isActive ? "text-orange-300" : "text-white"
              }
            >
              Skill Suggestions
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
