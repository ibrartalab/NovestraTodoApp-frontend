// hooks/useTodoApi.ts
import { useCallback } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

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

const useTodoApi = () => {
  const axiosPrivate = useAxiosPrivate();

  const addTodo = useCallback(async (data: AddTodoInput) => {
    const response = await axiosPrivate.post<AddTodoResponse>("/Todo", data);
    return response.data;
  }, [axiosPrivate]);

  const getTodos = useCallback(async () => {
    const response = await axiosPrivate.get<AddTodoResponse[]>("/Todo");
    return response.data;
  }, [axiosPrivate]);

  const updateTodo = useCallback(async (id: number, data: UpdateTodoInput) => {
    const response = await axiosPrivate.put<void>(`/Todo/${id}`, data);
    return response;
  }, [axiosPrivate]);

  const deleteTodo = useCallback(async (id: number) => {
    const response = await axiosPrivate.delete<void>(`/Todo/${id}`);
    return response.data;
  }, [axiosPrivate]);

  return {
    addTodo,
    getTodos,
    updateTodo,
    deleteTodo,
  };
};

export default useTodoApi;
