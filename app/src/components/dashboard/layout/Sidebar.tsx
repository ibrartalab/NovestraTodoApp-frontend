import { useParams } from "react-router";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  const username = useParams<{ userName: string }>().userName;
  return (
    <div className="sidebar w-44 h-full border-r border-gray-200">
      <nav className="navigations flex flex-col justify-between gap-4 py-4 px-10 w-full h-full">
        <div className="nav-links flex flex-col gap-4 h-3/4 w-full">
            <NavLink to={`/dashboard/${username}`}
        className={({ isActive }) =>
          isActive ? "text-indigo-400" : "hover:text-indigo-300"
        }
        >Notes</NavLink>
        <NavLink to={`/dashboard/${username}/analytics`}
        className={({ isActive }) =>
          isActive ? "text-indigo-400" : "hover:text-indigo-300"
        }
        >Analytics</NavLink>
        <NavLink to={`/dashboard/${username}/bin`}
        className={({ isActive }) =>
          isActive ? "text-indigo-400" : "hover:text-indigo-300"
        }
        >Bin</NavLink>
        </div>
        <div className="h-1/4 w-full place-content-end">
            <NavLink to={`/`}
        className={({ isActive }) =>
            isActive ? "text-indigo-400" : "hover:text-indigo-300"
            }
        >Logout</NavLink>

        </div>
      </nav>
    </div>
  );
};
