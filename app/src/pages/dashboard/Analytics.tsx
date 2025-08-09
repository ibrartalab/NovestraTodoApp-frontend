import React from "react";

export const Analytics = () => {
  return(
    <>
    <KPI title="Total Todos" value={100} style="bg-blue-100" />
    <KPI title="Completed Todos" value={75} style="bg-green-100" />
    </>
  );
};

// Sub component KPI card
function KPI({
  title,
  value,
  style,
}: {
  title: string;
  value: number;
  style?: string;
}) {
  return (
    <div
      className={`KPI-card w-40 h-10 bg-white rounded-md flex justify-evenly items-center ${style}`}
    >
      <h6 className="text-sm font-medium">{title}</h6>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}
