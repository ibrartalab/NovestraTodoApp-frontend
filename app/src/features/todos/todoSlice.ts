// features/todos/todosSlice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import * as todoApi from '../../api/todoAPI';

// Define the todo type
export interface Todo {
  id: number;
  title: string;
  description?: string;
  isComplete: boolean;
  userId: number;
}

// Define the initial state
interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  totalTodos: number;
  totalCompleted: number;
  totalPending: number;
}

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
  totalTodos: 0,
  totalCompleted: 0,
  totalPending: 0,
};

// Async thunk: fetch all todos
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await todoApi.getTodos();
  return response.data;
});

// Async thunk: create a new todo
export const createTodo = createAsyncThunk('todos/createTodo', async (newTodo: Omit<Todo, 'id'>) => {
  const response = await todoApi.addTodo(newTodo);
  return response.data;
});

// Async thunk: update an existing todo
export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async ({ id, data }: { id: number; data: Todo }) => {
    await todoApi.updateTodo(id, data);
    return { id, data };
  }
);

// Async thunk: delete a todo
export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id: number) => {
  await todoApi.deleteTodo(id);
  return id;
});

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // You can add sync reducers here if needed
    clearTodos: (state) => {
      state.todos = [];
      state.totalTodos = 0;
      state.totalCompleted = 0;
      state.totalPending = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Todos
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.todos = action.payload;
        state.loading = false;
        state.totalTodos = action.payload.length;
        state.totalCompleted = action.payload.filter((t) => t.isComplete).length;
        state.totalPending = action.payload.filter((t) => !t.isComplete).length;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch todos';
      })

      // Create Todo
      .addCase(createTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload);
        state.totalTodos += 1;
        if (action.payload.isComplete) {
          state.totalCompleted += 1;
        } else {
          state.totalPending += 1;
        }
      })

      // Update Todo
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          const wasComplete = state.todos[index].isComplete;
          const isNowComplete = action.payload.data.isComplete;

          state.todos[index] = action.payload.data;

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
      })

      // Delete Todo
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<number>) => {
        const deleted = state.todos.find((t) => t.id === action.payload);
        state.todos = state.todos.filter((t) => t.id !== action.payload);

        if (deleted) {
          state.totalTodos -= 1;
          if (deleted.isComplete) {
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
