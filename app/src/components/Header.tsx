import { useContext } from "react";
import { NavLink } from "react-router";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { ThemeContext } from "../context/ThemeContext";
import { UserContext } from "../context/UserContext";

export const Header = () => {
  return (
    <header className="header flex justify-between items-center px-24 p-4 border-b-2 border-gray-100">
      <h1>Novestra Todo</h1>
      <nav className="navbar *:flex *:justify-between *:items-center *:gap-4 ">
        <Navbar />
      </nav>
    </header>
  );
};

// Sub components headers for the app
function Navbar() {
  const { theme, setTheme, setText } = useContext(ThemeContext);
  const { user, userLogout } = useContext(UserContext);
  return (
    <>
      <ul>
        <li>
          <NavLink
            to={`${user ? "/" : "/"}`}
            className={({ isActive }) =>
              isActive ? "text-indigo-600" : "hover:text-indigo-800"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`${user ? "/" : "/login"}`}
            className={({ isActive }) =>
              isActive ? "text-indigo-600" : "hover:text-indigo-800"
            }
            onClick={
              user
                ? () => {
                    userLogout();
                  }
                : () => {}
            }
          >
            {`${user ? "Logout" : "Login"}`}
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`${user ? "" : "/signup"}`}
            className={({ isActive }) =>
              isActive ? "text-indigo-600" : "hover:text-indigo-800"
            }
          >
            {`${user ? "" : "Register"}`}
          </NavLink>
        </li>
        <li className="*:cursor-pointer">
          {theme === "bg-gray-50" ? (
            <MdDarkMode
            className="rounded-full w-max h-max p-2 hover:bg-indigo-300"
              onClick={() => {
                setTheme("bg-black");
                setText("text-white");
              }}
            />
          ) : (
            <MdLightMode
            className="rounded-full w-max h-max p-2 hover:bg-indigo-300"
              onClick={() => {
                setTheme("bg-gray-50");
                setText("text-balck");
              }}
            />
          )}
        </li>
      </ul>
    </>
  );
}
