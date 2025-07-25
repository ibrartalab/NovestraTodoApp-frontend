import React, { useContext } from "react";
import Input from "../InputField";
import Button from "../Button";
import { addTodo } from "../../api/todosAPI";
import { TodosContext } from "../../context/TodosContext";

export const DetailsTodos = () => {
  const [todoName, setTodoName] = React.useState("");
  let {currentState,} = useContext(TodosContext);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Logic to handle input change
    const {value} = event.target;
    setTodoName(value);
    

  }
  const handleAddTask = () => {
    // Logic to add a new task
    if (todoName.trim() === "") {
      alert("Task name cannot be empty");
      return;
    }
    // Here you would typically call a function to add the task to your state or backend
    const response = addTodo({ name: todoName, isCompleted: false });
    setTodoName("")
    ;
    console.log("Task added:", response,currentState);
  };
  
  return (
    <div className="todo-list-wrapper w-full h-full">
      <div className="todo-list-container mt-8 px-10">
        <h2>Todo List</h2>
        <div className="input-todo-add flex justify-between items-center gap-4">
          <Input
            label=""
            placeholder="Enter task name"
            type="text"
            name="todoName"
            value={todoName}
            onChange={handleInputChange}
            styleClass="w-full h-10 border-none outline-none"
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
            <KPI title="Total Tasks" value={10} />
            <KPI title="Completed Tasks" value={5} />
          </div>
          <div className="row-2 flex gap-4">
            <KPI title="Pending Tasks" value={3} />
            <KPI title="Overdue Tasks" value={2} />
          </div>
        </div>
      </div>
    </div>
  );
};


function KPI({ title, value }: { title: string; value: number }) {
  return (
    <div className="KPI-card w-1/2 h-20 bg-white rounded-md p-4 flex justify-between items-center">
      <div className="KPI-title text-lg font-semibold">{title}</div>
      <div className="KPI-value text-2xl font-bold">{value}</div>
    </div>
  );
}
