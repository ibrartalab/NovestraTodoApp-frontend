import { NavLink } from "react-router";

// import { UserContext } from "../context/UserContext";
import { useAppDispatch, useAppSelector } from "../hooks/redux/reduxHooks";
import { logOut } from "../features/auth/authSlice";
import { ThemeMode } from "./ThemeMode";

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
  // const { user, userLogout } = useContext(UserContext);
  const userName = useAppSelector((state) => state.auth.userName);
  const dispatch = useAppDispatch();
  return (
    <>
      <ul>
        <li>
          <NavLink
            to={`${userName ? "/" : "/"}`}
            className={({ isActive }) =>
              isActive ? "text-indigo-600" : "hover:text-indigo-800"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`${userName ? "/" : "/login"}`}
            className={({ isActive }) =>
              isActive ? "text-indigo-600" : "hover:text-indigo-800"
            }
            onClick={
              userName
                ? () => {
                    dispatch(logOut());
                  }
                : () => {}
            }
          >
            {`${userName ? "Logout" : "Login"}`}
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`${userName ? "" : "/signup"}`}
            className={({ isActive }) =>
              isActive ? "text-indigo-600" : "hover:text-indigo-800"
            }
          >
            {`${userName ? "" : "Register"}`}
          </NavLink>
        </li>
        <li className="*:cursor-pointer">
          <ThemeMode/>
        </li>
      </ul>
    </>
  );
}
