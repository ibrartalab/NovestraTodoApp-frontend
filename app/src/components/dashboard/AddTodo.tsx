import React, { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux/reduxHooks";
import { createTodo, fetchTodosByUserId } from "../../features/todos/todoSlice";
import Input from "../Input";
import Button from "../Button";

export const AddTodo = () => {
  const [todoName, setTodoName] = useState<string>("");
  const { userId } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // Handle input change
  // This function updates the state with the value from the input field
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTodoName(value);
  };

  // Handle adding a new task
  const handleAddTask = async () => {
    if (todoName.trim() === "") {
      alert("Task name cannot be empty");
      return;
    }
    // Dispatch the createTodo action with the new task data
    // This will typically involve an API call to add the task to your backend
    if (!userId) {
      throw new Error("User ID is not available");
    }
    const data = {
      Todo: todoName,
      IsCompleted: false,
      UserId: userId,
      CreatedAt: new Date().toISOString(),
      CompletedAt: new Date().toISOString(),
    };
    await dispatch(createTodo(JSON.parse(JSON.stringify(data))));
    fetchAll();
    setTodoName("");
  };

  const fetchAll = useCallback(async () => {
    try {
      if (!userId) {
        console.error("User ID is not available", userId);
        return;
      }
      const response = await dispatch(fetchTodosByUserId(userId));
      if (response.meta.requestStatus === "fulfilled") {
        console.log("Fetched all todos successfully");
      }
    } catch (error) {
      console.error("Failed to fetch todos", error);
    }
  }, [dispatch, userId]);

  return (
    <div>
      <div className="input-todo-add w-full flex justify-center items-center gap-2">
        <div className="w-3/6">
          <Input
            label=""
            placeholder="Take a note..."
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
            type="button"
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
