import React from "react";
import { NavLink } from "react-router-dom";
function Header() {
  return (
    <>
      <div className="flex justify-center items-center ">
        <nav className="flex flex-row justify-between bg-blue-950 rounded-4xl items-center m-2 w-3xl">
          <div className="flex w-[40px] my-4 mx-4">
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
    </>
  );
}

export default Header;
