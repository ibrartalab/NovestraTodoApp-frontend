// import React, { useContext } from "react";
import Input from "../Input";
import Button from "../Button";
import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux/reduxHooks";
import { createTodo, fetchTodosByUserId } from "../../features/todos/todoSlice";
// import { TodoContext } from "../../context/TodosContext";
// import useTodoApi from "../../hooks/useTodoAPI";

export const Summary = () => {
  // const {addTodo } = useTodoApi();
  
  const {totalTodos,totalCompleted,totalPending} = useAppSelector((state) => state.todos);
  
  // const {
  //   totalTodos,
  //   totalTodosCompleted,
  //   totalTodosPending,
  //   setCurrentState,
  // } = useContext(TodoContext);

  
  return (
    <div className="todo-list-wrapper w-full h-max flex justify-between items-center gap-2">
      <div className="row-1 flex gap-4">
        <KPI title="Total Tasks" value={totalTodos} style="text-black" />
        <KPI
          title="Completed Tasks"
          value={totalCompleted}
          style="*:text-green-500"
        />
        <KPI
          title="Pending Tasks"
          value={totalPending}
          style="*:text-purple-500"
        />
        <KPI title="Overdue Tasks" value={0} style="*:text-red-500" />
      </div>
      
    </div>
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
