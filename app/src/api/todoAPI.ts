import { axiosPrivate } from "../config/axiosInstance";
import type { Todo, UpdateTodoInput } from "../features/todos/types";

export const getTodos = () => axiosPrivate.get("/Todo/all");
export const addTodo = (data:Todo) => axiosPrivate.post("/Todo", data);
export const updateTodo = (id:number, data:UpdateTodoInput) => axiosPrivate.put(`/Todo/${id}`, data);
export const deleteTodo = (id:number) => axiosPrivate.delete(`/Todo/${id}`);
export const getTodoById = (id: number) => axiosPrivate.get(`/Todo/${id}`);