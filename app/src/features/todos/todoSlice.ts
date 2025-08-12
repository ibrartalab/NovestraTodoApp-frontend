// features/todos/todosSlice.ts
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import * as todoApi from "../../api/todoAPI";
import type { Todo, UpdateTodoInput } from "./types";

// Define the initial state
interface TodosState {
  todos: Todo[];
  userTodos: Todo[];
  loading: boolean;
  error: string | null;
  totalTodos: number;
  totalCompleted: number;
  totalPending: number;
}

const initialState: TodosState = {
  todos: [],
  userTodos: [],
  loading: false,
  error: null,
  totalTodos: 0,
  totalCompleted: 0,
  totalPending: 0,
};

// Async thunk: fetch all todos
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await todoApi.getTodos();
  return response.data;
});

// Async thunk: fetch todos by user ID
export const fetchTodosByUserId = createAsyncThunk(
  "todos/fetchTodosByUserId",
  async (userId: number) => {
    const response = await todoApi.getTodosByUserId(userId);
    return response.data;
  }
);

// Async thunk: create a new todo
export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (newTodo: Todo) => {
    const response = await todoApi.addTodo(newTodo);
    return response.data;
  }
);

// Async thunk: update an existing todo
export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, data }: { id: number; data: UpdateTodoInput }) => {
    const response = await todoApi.updateTodo(id, data);
    return { id, data: response.data };
  }
);

// Async thunk: delete a todo
export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: number) => {
    await todoApi.deleteTodo(id);
    return id;
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // You can add sync reducers here if needed
    clearTodos: (state) => {
      state.todos = [];
      state.userTodos = [];
      state.totalTodos = 0;
      state.totalCompleted = 0;
      state.totalPending = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Todos
      // .addCase(fetchTodos.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
      //   state.todos = action.payload;
      //   state.loading = false;
      //   state.totalTodos = action.payload.length;
      //   state.totalCompleted = action.payload.filter((t) => t.isCompleted).length;
      //   state.totalPending = action.payload.filter((t) => !t.isCompleted).length;
      // })
      // .addCase(fetchTodos.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.error.message || 'Failed to fetch todos';
      // })

      // Fetch Todos by User ID
      .addCase(fetchTodosByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTodosByUserId.fulfilled,
        (state, action: PayloadAction<Todo[]>) => {
          state.userTodos = action.payload;
          state.loading = false;
          state.totalTodos = action.payload.length;
          state.totalCompleted = action.payload.filter(
            (t) => t.isCompleted
          ).length;
          state.totalPending = action.payload.filter(
            (t) => !t.isCompleted
          ).length;
        }
      )
      .addCase(fetchTodosByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user todos";
      })

      // Create Todo
      .addCase(createTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload);
        state.userTodos.push(action.payload);
        state.totalTodos += 1;
        if (action.payload.isCompleted) {
          state.totalCompleted += 1;
        } else {
          state.totalPending += 1;
        }
      })

      // Update Todo
      .addCase(updateTodo.fulfilled, (state, action) => {
        const { id, data } = action.payload;

        const updateArray = (arr: Todo[]) => {
          const index = arr.findIndex((t) => t.id === id);

          if (index !== -1) {
            const wasComplete = arr[index].isCompleted;
            const isNowComplete = data.isCompleted;

            arr[index] = {
              ...arr[index],
              ...data,
            };

            if (wasComplete !== isNowComplete) {
              if (isNowComplete) {
                state.totalCompleted += 1;
                state.totalPending -= 1;
              } else {
                state.totalCompleted -= 1;
                state.totalPending += 1;
              }
            }
          }
        };
        updateArray(state.todos);
        updateArray(state.userTodos);
      })

      // Delete Todo
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<number>) => {
        const deleted = state.todos.find((t) => t.id === action.payload);
        state.todos = state.todos.filter((t) => t.id !== action.payload);

        if (deleted) {
          state.totalTodos -= 1;
          if (deleted.isCompleted) {
            state.totalCompleted -= 1;
          } else {
            state.totalPending -= 1;
          }
        }
      });
  },
});

// Export the reducer and actions
export const { clearTodos } = todosSlice.actions;
export default todosSlice.reducer;
