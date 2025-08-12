import { useEffect, useState } from "react";
import { Layout } from "../components/layout/Layout";
import { SearchInput } from "../components/dashboard/SearchInput";
import TodoList from "../components/dashboard/TodoList";
import { useAppSelector } from "../hooks/redux/reduxHooks";

const Dashboard = () => {
  const [greeting, setGreeting] = useState<string>("");
  const usrname = useAppSelector((state) => state.auth.userName);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting(`Good Morning ${usrname}`);
    } else if (currentHour < 18) {
      setGreeting(`Good Afternoon ${usrname}`);
    } else {
      setGreeting(`Good Evening ${usrname}`);
    }
  }, [usrname]);

  return (
    <Layout>
      <div className="dashboard-wrapper w-full px-24">
        <div className="menu w-full h-14 flex items-center justify-between">
          <div className="greeting w-3/12">
            <h1 className="text-md font-medium">{greeting || "Welcome"}</h1>
            <p className="text-gray-600 text-sm">Whats your plan for today?</p>
          </div>
          <div className="search-bar w-3/4">
            <SearchInput />
          </div>
        </div>
        <div className="dashboard-internal-layer w-full h-[450px] overflow-hidden flex flex-col gap-2">
          <TodoList />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
