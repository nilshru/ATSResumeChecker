import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="flex justify-center items-center">
      <nav className="sticky top-0 z-50 flex flex-row justify-between items-center  w-full px-2 sm:px-10 py-4 
                      backdrop-blur-sm bg-white/50 border-2 shadow-xl border-white/10">
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
          <li className=" mx-1 sm:mx-4 text-[18px] sm:text-2xl hover:underline">
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
    </div>
  );
}

export default Header;
