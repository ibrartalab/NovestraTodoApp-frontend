import React, { createContext } from "react";

interface TodoContextType {
    todos: Array<{
        id: number;
        title: string;
        isCompleted: boolean;
    }>;
    setTodos: React.Dispatch<React.SetStateAction<Array<{
        id: number;
        title: string;
        isCompleted: boolean;
    }>>>;
}

export const TodosContext = createContext<TodoContextType>({
    todos: [],
    setTodos: () => {},
});