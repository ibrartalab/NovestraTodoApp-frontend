import { useContext, useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { SearchInput } from "../components/dashboard/SearchInput";
import { Summary } from "../components/dashboard/Summary";
import TodoList from "../components/dashboard/TodoList";
import { UserContext } from "../context/UserContext";

const Dashboard = () => {
  const [greeting, setGreeting] = useState<string>("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting(`Good Morning ${user}`);
    } else if (currentHour < 18) {
      setGreeting(`Good Afternoon ${user}`);
    } else {
      setGreeting(`Good Evening ${user}`);
    }
  }, [user]);

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
          <Summary />
          <TodoList />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
