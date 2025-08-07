// import React, { useContext } from "react";
import Input from "../Input";
import Button from "../Button";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux/reduxHooks";
import { createTodo } from "../../features/todos/todoSlice";
// import { TodoContext } from "../../context/TodosContext";
// import useTodoApi from "../../hooks/useTodoAPI";

export const Summary = () => {
  // const {addTodo } = useTodoApi();
  const [todoName, setTodoName] = useState<string>("");
  const {userId} = useAppSelector((state) => state.auth);
  const {totalTodos,totalCompleted,totalPending} = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();
  // const {
  //   totalTodos,
  //   totalTodosCompleted,
  //   totalTodosPending,
  //   setCurrentState,
  // } = useContext(TodoContext);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Logic to handle input change
    const { value } = event.target;
    setTodoName(value);
  };

  const handleAddTask = async () => {
    // Logic to add a new task
    if (todoName.trim() === "") {
      alert("Task name cannot be empty");
      return;
    }
    // Dispatch the createTodo action with the new task data
    // This will typically involve an API call to add the task to your backend
    if( !userId) {
      throw new Error("User ID is not available");
    }
    const data = {
      Todo: todoName,
      IsCompleted: false,
      UserId: userId,
      CreatedAt: new Date().toISOString(),
      CompletedAt: new Date().toISOString(),
    };
    const response = await dispatch(createTodo(JSON.parse(JSON.stringify(data))));
    setTodoName("");
  };

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
      <div className="input-todo-add w-3/6 flex justify-between items-center gap-2">
        <div className="w-4/5">
          <Input
            label=""
            placeholder="Enter task name"
            type="text"
            name="todoName"
            value={todoName}
            onChange={handleInputChange}
            styleClass="w-full h-10 border-none outline-none text-black"
            error={false}
          />
        </div>
        <div>
          <Button
            type='button'
            title="Add Task"
            disabled={false}
            onClick={() => handleAddTask()}
            styleClass="w-24 h-10 flex justify-center items-center rounded-md bg-indigo-600 text-white text-xs hover:bg-indigo-400"
          />
        </div>
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
