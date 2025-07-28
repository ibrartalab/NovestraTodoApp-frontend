import React, { useContext, useEffect } from "react";
import Input from "../Input";
import Button from "../Button";
import { addTodo } from "../../api/todosAPI";
import { TodoContext } from "../../context/TodosContext";
import { UserContext } from "../../context/UserContext";

export const Summary = () => {
  const [todoName, setTodoName] = React.useState("");
  const {
    totalTodos,
    totalTodosCompleted,
    totalTodosPending,
    setCurrentState,
  } = useContext(TodoContext);

  const [greeting, setGreeting] = React.useState<string>("");
  const { user } = useContext(UserContext);
  console.log("User in Menu:", user);

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Logic to handle input change
    const { value } = event.target;
    setTodoName(value);
  };

  const handleAddTask = () => {
    // Logic to add a new task
    if (todoName.trim() === "") {
      alert("Task name cannot be empty");
      return;
    }
    setCurrentState((prev) => prev + 1);
    // Here you would typically call a function to add the task to your state or backend
    const response = addTodo({ name: todoName, isComplete: false });
    
    setTodoName("");
    console.log(response);
  };

  return (
    <div className="todo-list-wrapper w-full h-full">
      <div className="menu w-full h-20 flex items-center justify-between px-8">
        <div className="greeting">
          <h1 className="text-lg font-medium">{greeting || "Welcome"}</h1>
          <p className="text-gray-600 text-sm">Whats your plan for today?</p>
        </div>
      </div>
      <div className="todo-list-container mt-2 px-10">
        <h2>Todo</h2>
        <div className="input-todo-add flex justify-between items-center gap-4">
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
          <Button
            title="Add Task"
            disabled={false}
            onClick={handleAddTask}
            styleClass="w-24 h-10 flex justify-center items-center rounded-md bg-indigo-600 text-white text-xs hover:bg-indigo-400"
            type="button"
          />
        </div>
        <div className="KPI-cardas flex flex-col gap-4 mt-6">
          <div className="row-1 flex gap-4">
            <KPI title="Total Tasks" value={totalTodos} style="text-black" />
            <KPI
              title="Completed Tasks"
              value={totalTodosCompleted}
              style="*:text-green-500"
            />
          </div>
          <div className="row-2 flex gap-4">
            <KPI
              title="Pending Tasks"
              value={totalTodosPending}
              style="*:text-purple-500"
            />
            <KPI title="Overdue Tasks" value={0} style="*:text-red-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

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
      className={`KPI-card w-1/2 h-20 bg-white rounded-md p-4 flex justify-between items-center ${style}`}
    >
      <div className="KPI-title text-lg font-semibold">{title}</div>
      <div className="KPI-value text-2xl font-bold">{value}</div>
    </div>
  );
}
