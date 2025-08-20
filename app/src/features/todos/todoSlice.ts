// src/feature/todos/todosSlice.ts
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";

import * as todoApi from "../../api/todoAPI"; // Ensure correct import paths
import type { CreateToDoPayload, DeleteTodoPayload, FetchTodosByUserIdPayload, Todo, UpdateTodoPayload } from "./types";

// --- State Interfaces ---
interface TodosState {
  todos: Todo[];
  userTodos: Todo[];
  loading: boolean;
  error: string | null;
  totalTodos: number;
  totalCompleted: number;
  totalPending: number;
  totalInBin: number;
}

// --- Initial State ---
const initialState: TodosState = {
  todos: [],
  userTodos: [],
  loading: false,
  error: null,
  totalTodos: 0,
  totalCompleted: 0,
  totalPending: 0,
  totalInBin: 0,
};

// --- Async Thunks ---

// Async thunk: fetch todos by user ID
export const fetchTodosByUserId = createAsyncThunk(
  "todos/fetchTodosByUserId",
  async (payload: FetchTodosByUserIdPayload, { rejectWithValue }) => {
    try {
      // todoApi.getTodosByUserId now expects the entire payload object
      const todos = await todoApi.getTodosByUserId(payload);
      return todos;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user todos");
    }
  }
);

// Async thunk: create a new todo
export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (payload: CreateToDoPayload, { rejectWithValue }) => {
    try {
      // todoApi.addTodo now expects the entire payload object
      const todo = await todoApi.addTodo(payload);
      return todo;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to create todo");
    }
  }
);

// Async thunk: update an existing todo
export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (payload: UpdateTodoPayload, { rejectWithValue }) => {
    try {
      // todoApi.updateTodo now expects the entire payload object
      const updatedTodo = await todoApi.updateTodo(payload);
      return updatedTodo; // Ensure API returns the full updated object
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update todo");
    }
  }
);

// Async thunk: delete a todo
export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (payload: DeleteTodoPayload, { rejectWithValue }) => {
    try {
      // todoApi.deleteTodo now expects the entire payload object
      await todoApi.deleteTodo(payload);
      return payload.id; // Return the ID for reducer logic after successful deletion
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete todo");
    }
  }
);

// --- Slice Definition ---
const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    clearTodos: (state) => {
      state.todos = [];
      state.userTodos = [];
      state.totalTodos = 0;
      state.totalCompleted = 0;
      state.totalPending = 0;
      state.totalInBin = 0;
      state.error = null; // Clear error on clear
    },
    // Optional: Add a specific reducer for optimistic updates if you need immediate UI feedback
    // updateTodoOptimistic: (state, action: PayloadAction<Todo>) => {
    //   const updatedTodo = action.payload;
    //   const updateArray = (arr: Todo[]) => {
    //     const index = arr.findIndex((t) => t.id === updatedTodo.id);
    //     if (index !== -1) {
    //       arr[index] = updatedTodo;
    //     }
    //   };
    //   updateArray(state.todos);
    //   updateArray(state.userTodos);
    //   updateTodoCounts(state, state.userTodos);
    // },
  },
  extraReducers: (builder) => {
    // --- Specific Fulfilled Handling ---
    builder
      .addCase(
        fetchTodosByUserId.fulfilled,
        (state, action: PayloadAction<Todo[]>) => {
          state.loading = false;
          state.userTodos = action.payload;
        }
      )
      .addCase(createTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload); // Add to global list if applicable
        state.userTodos.push(action.payload); // Add to user-specific list
      })
      .addCase(updateTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        const updatedTodo = action.payload;

        const updateArray = (arr: Todo[]) => {
          const index = arr.findIndex((t) => t.id === updatedTodo.id);
          if (index !== -1) {
            arr[index] = updatedTodo; // Replace with the full updated object
          }
        };

        updateArray(state.todos); // Update global list (if used)
        updateArray(state.userTodos); // Update user-specific list
      })
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<number>) => {
        const deletedTodoId = action.payload;

        const filterArray = (arr: Todo[]) => arr.filter((t) => t.id !== deletedTodoId);

        state.todos = filterArray(state.todos); // Remove from global list (if used)
        state.userTodos = filterArray(state.userTodos); // Remove from user-specific list
      });
  },
});

// Export actions and reducer
export const { clearTodos } = todosSlice.actions;
export default todosSlice.reducer;
