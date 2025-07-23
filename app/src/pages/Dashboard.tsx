import { Layout } from "../components/Layout";
import { DetailsTodos } from "../components/dashboard/DetailsTodos";
import { Todos } from "../components/dashboard/TodoList";
import { Menu } from "../components/dashboard/Menu";

const Dashboard = () => {
  return (
    <Layout>
      <div className="dashboard-wrapper w-full h-full px-24">
        <Menu />
        <div className="dashboard-internal-layer w-full h-80 flex gap-4">
          <Todos />
          <DetailsTodos />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
