import React, {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getTodos, type AddTodoResponse } from "../api/todosAPI";

interface TodosContextType {
  todos: AddTodoResponse[];
  currentState: number;
  totalTodos: number;
  totalTodosCompleted: number;
  totalTodosPending: number;
  fetchTodos: () => void;
  setTodos: React.Dispatch<React.SetStateAction<AddTodoResponse[]>>;
  setCurrentState: React.Dispatch<React.SetStateAction<number>>;
  setTotalTodos: React.Dispatch<React.SetStateAction<number>>;
  setTotalTodosCompleted: React.Dispatch<React.SetStateAction<number>>;
  setTotalTodosPending: React.Dispatch<React.SetStateAction<number>>;
}

interface TodosProviderType {
  children: ReactNode;
}

const TodoContext = createContext<TodosContextType>({
  todos: [],
  currentState: 0,
  totalTodos: 0,
  totalTodosCompleted: 0,
  totalTodosPending: 0,
  fetchTodos: () => {},
  setTodos: () => {},
  setCurrentState: () => {},
  setTotalTodos: () => {},
  setTotalTodosCompleted: () => {},
  setTotalTodosPending: () => {},
});

const TodosProvider = ({ children }: TodosProviderType) => {
  const [todos, setTodos] = useState<AddTodoResponse[]>([]);
  const [currentState, setCurrentState] = useState<number>(1);
  const [totalTodos, setTotalTodos] = useState<number>(0);
  const [totalTodosCompleted, setTotalTodosCompleted] = useState<number>(0);
  const [totalTodosPending, setTotalTodosPending] = useState<number>(0);

  const fetchTodos = useCallback(async () => {
    const response = await getTodos();
    setTodos(response.data);
    setTotalTodos(response.data.length);
    const completed = response.data.filter((c) => c.isComplete === true);
    const pending = response.data.filter((p) => p.isComplete === false);
    setTotalTodosCompleted(completed.length);
    setTotalTodosPending(pending.length);
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos, currentState]);

  return (
    <TodoContext.Provider
      value={{
        todos,
        currentState,
        totalTodos,
        totalTodosCompleted,
        totalTodosPending,
        setCurrentState,
        setTodos,
        fetchTodos,
        setTotalTodos,
        setTotalTodosCompleted,
        setTotalTodosPending,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext };
export default TodosProvider;
