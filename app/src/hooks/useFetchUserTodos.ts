import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./redux/reduxHooks";
import { fetchTodosByUserId } from "../features/todos/todoSlice";
import useAxiosPrivate from "./useAxiosPrivate";

export function useFetchUserTodos() {
  const userId = useAppSelector((state) => state.auth.userId);
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();

  const fetchAll = useCallback(async () => {
    try {
      if (!userId) {
        console.error("User ID is not available", userId);
        return;
      }
      const response = await dispatch(
        fetchTodosByUserId({ userId, axiosPrivate })
      );
      if (response.meta.requestStatus === "fulfilled") {
        console.log("Fetched all todos successfully");
      }
    } catch (error) {
      console.error("Failed to fetch todos", error);
    }
  }, [dispatch, userId, axiosPrivate]);

  return fetchAll;
}
