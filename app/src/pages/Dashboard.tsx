import React from "react";
import { Layout } from "../components/Layout";
import { IoSearch } from "react-icons/io5";
import Input from "../components/InputField";
import { NavLink } from "react-router";

const Dashboard = () => {
  return (
    <Layout>
      <div className="dashboard-wrapper w-full h-full px-24">
        <div className="dashboard-header w-full">
          <div className="search-bar w-full flex items-center gap-2 border-2 border-gray-200 rounded-md px-2 bg-white">
            <IoSearch className="text-gray-500 text-2xl w-10" />
            {/* <input type="text" className='w-full' /> */}
            <Input
              label=""
              placeholder="Search tasks..."
              type="text"
              name="search"
              value=""
              onChange={() => {}}
              styleClass="w-full h-full border-none outline-none"
              error={false}
            />
          </div>
        </div>
        <div className="dashboard-internal-layer">
          <div className="sidebar mt-4">
            <aside>
              <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
              <ul className="menu-list flex flex-col gap-2 *:w-14">
                <li className="menu-item w-full *:p-1 *:text-md ">
                  <NavLink
                    to="/dashboard/home"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-gray-400 text-white font-semibold"
                        : "text-black"
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li className="menu-item w-full *:p-1 *:text-md">
                  <NavLink
                    to="/dashboard/tasks"
                    className={({ isActive }) =>
                      isActive ?  "bg-gray-400 text-white font-semibold"
                        : "text-black"
                    }
                  >
                    Tasks
                  </NavLink>
                </li>
                <li className="menu-item *:w-14 *:p-1 *:text-md">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "bg-gray-400 text-white font-semibold"
                        : "text-black"
                    }
                  >
                    Logout
                  </NavLink>
                </li>
              </ul>
            </aside>
          </div>
          <div className="main-contents"></div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
