import React from "react";
import { ThemeContext } from "../context/ThemeContext";
import { MdDarkMode, MdLightMode } from "react-icons/md";

// This component act as a Theme Toggle- to switch between Dark and Light Mode
export const ThemeMode = () => {
  const { theme, setTheme, setText } = React.useContext(ThemeContext);
  return (
    <div className="theme-mode flex items-center justify-center w-8 h-8 p-2 rounded-full bg-gray-200 cursor-pointer">
      {theme === "bg-gray-50" ? (
        <MdDarkMode
          className="rounded-full w-full h-full"
          onClick={() => {
            setTheme("bg-black");
            setText("text-white");
          }}
        />
      ) : (
        <MdLightMode
          className="rounded-full w-full h-full"
          onClick={() => {
            setTheme("bg-gray-50");
            setText("text-balck");
          }}
        />
      )}
    </div>
  );
};
