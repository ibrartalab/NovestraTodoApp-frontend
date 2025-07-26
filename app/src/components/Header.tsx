import React, { useContext } from "react";
import { NavLink } from "react-router";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { ThemeContext } from "../context/ThemeContext";

export const Header = () => {
  const { theme, setTheme,setText } = useContext(ThemeContext);

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
          <li className="*:cursor-pointer">

          {theme === "bg-gray-50" ? <MdDarkMode onClick={() => {
            setTheme('bg-black');
            setText('text-white');
          }}/> : <MdLightMode onClick={() => {
            setTheme('bg-gray-50');
            setText('text-balck');
          }}/>}
          </li>
        </ul>
      </nav>
    </header>
  );
};
