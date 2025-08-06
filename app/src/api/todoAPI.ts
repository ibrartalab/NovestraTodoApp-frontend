import { axiosPrivate } from "../config/axiosInstance";

export interface AddTodoInput {
  name: string;
  isComplete: boolean;
}

export interface UpdateTodoInput {
  id: number;
  name: string;
  isComplete: boolean;
}

export interface AddTodoResponse {
  id: number;
  name: string;
  isComplete: boolean;
}

export const getTodos = () => axiosPrivate.get("/Todo/all");
export const addTodo = (data:AddTodoInput) => axiosPrivate.post("/Todo", data);
export const updateTodo = (id:number, data:UpdateTodoInput) => axiosPrivate.put(`/Todo/${id}`, data);
export const deleteTodo = (id:number) => axiosPrivate.delete(`/Todo/${id}`);
