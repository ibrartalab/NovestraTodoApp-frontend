import { axiosPrivate } from "../config/axiosInstance";
import type { Todo, UpdateTodoInput } from "../features/todos/types";

// Function to get all todos
export const getTodos = () => axiosPrivate.get("/Todo/all");
// Function to get a todo by ID
export const addTodo = (data:Todo) => axiosPrivate.post("/Todo", data);
// Function to update a todo
export const updateTodo = (id:number, data:UpdateTodoInput) => axiosPrivate.put(`/Todo/${id}`, data);
// Function to delete a todo
export const deleteTodo = (id:number) => axiosPrivate.delete(`/Todo/${id}`);
// Function to get a todo by ID
export const getTodoById = (id: number) => axiosPrivate.get(`/Todo/${id}`);
// Function to get todos by user ID for a specific user
export const getTodosByUserId = (userId: number) => axiosPrivate.get(`/Todo/user/${userId}`);
