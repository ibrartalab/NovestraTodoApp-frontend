import { Layout } from "../components/Layout";
import { Summary } from "../components/dashboard/Summary";
import TodoList from "../components/dashboard/TodoList";

const Dashboard = () => {
  return (
    <Layout>
      <div className="dashboard-wrapper w-full h-full px-24">
        {/* <Menu /> */}
        <div className="dashboard-internal-layer w-full h-[480px] overflow-hidden flex gap-4">
          <TodoList />
          <Summary />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
