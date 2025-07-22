import React from "react";
import { NavLink } from "react-router";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

export const Header = () => {
  return (
    <header className="header flex justify-between items-center px-24 p-4 border-b-2 border-gray-100">
      <h1>Novestra Todo</h1>
      <nav className="navbar *:flex *:justify-between *:items-center *:gap-4 ">
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-indigo-600" : "hover:text-indigo-800"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "text-indigo-600" : "hover:text-indigo-800"
              }
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Signup"
              className={({ isActive }) =>
                isActive ? "text-indigo-600" : "hover:text-indigo-800"
              }
            >
              Register
            </NavLink>
          </li>
          <li>
            <MdLightMode />
          </li>
          <li>
            <MdDarkMode />
          </li>
        </ul>
      </nav>
    </header>
  );
};
