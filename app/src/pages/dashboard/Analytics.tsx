import React from "react";
// import Progressbar from "../../components/dashboard/ProgressBar";
import { useAppSelector } from "../../hooks/redux/reduxHooks";

export const Analytics = () => {
  const {totalCompleted,totalPending,totalTodos} = useAppSelector((state) => state.todos);
  return (
    <>
      <div className="analytics-dashbaord-wrapper py-4 w-full h-full">
        <div className="heading">
          <h1 className="text-lg font-semibold underline text-indigo-500">
            Analytics Dashboard
          </h1>
        </div>
        <div className="desc mt-4">
          <h2 className="text-md font-medium">Your Productivity Insights</h2>
          <p className="text-wrap w-3/4">
            Get a clear view of your task habits, progress, and overall
            productivity. These insights are based on your todo activity.Helping
            you stay on track and plan better.
          </p>
        </div>
        <div className="progressabr mt-12 pr-14 w-full h-12 flex justify-start">
          {/* <Progressbar /> */}
        </div>
        <div className="kpis-card-wrapper flex justify-left items-center gap-4 mt-8">
          <KPI
            title="Total Tasks"
            value={totalTodos}
            label="Total tasks created"
            style="bg-gradient-to-b from-indigo-500 to-indigo-300"
          />
          <KPI
            title="Completed Tasks"
            value={totalCompleted}
            label="Total taks that are marked completed"
            style="bg-gradient-to-b from-green-500 to-green-300"
          />
          <KPI
            title="Active Tasks"
            value={totalPending}
            label="Currently active tasks"
            style="bg-gradient-to-b from-yellow-500 to-yellow-300"
          />
          <KPI
            title="Tasks in Bin"
            value={0}
            label="Deleted but not permanently removed"
            style="bg-gradient-to-b from-red-500 to-red-300"
          />
        </div>
      </div>
    </>
  );
};

// Sub component KPI card
function KPI({
  title,
  value,
  label,
  style,
}: {
  title: string;
  value: number;
  label?: string;
  style?: string;
}) {
  return (
    <div
      className={`KPI-card w-64 h-44 bg-white  rounded-md flex flex-col justify-between items-start p-2 ${style}`}
    >
      <div className="value w-full px-4 py-8">
        <span className="actual-vale text-5xl font-normal">{value}</span>
      </div>
      <div className="title-desc w-full px-4 pb-5">
        <h3 className="text-md font-semibold">{title}</h3>
        <p className="text-xs">{label}</p>
      </div>
    </div>
  );
}
