import { FaRegEdit } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import Button from "../Button";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import EditTodo from "./EditTodo";
import { useAppDispatch, useAppSelector } from "../../hooks/redux/reduxHooks";
import type { UpdateTodoInput } from "../../features/todos/types";
import { fetchTodos, updateTodo, deleteTodo } from "../../features/todos/todoSlice";

const TodoItem = () => {
  const { searchParam, filters } = useContext(SearchContext);
  // const [isEditTodo, setIsEditTodo] = useState<boolean>(false);
  // const [newTodo, setNewTodo] = useState<string>("");
  const { todos } = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);

   const handleEditClick = (id: number) => {
    setEditingTodoId(id);
  };

  const closeEditModal = () => {
    setEditingTodoId(null);
  };

  console.log("Todos:", todos);
  const filteredTodos = todos.filter((todo) => {
    const matchSearch = todo.todo?.includes(searchParam);
    let matchState = true;

    if (filters === "active") {
      matchState = !todo.isCompleted;
    } else if (filters === "completed") {
      matchState = todo.isCompleted;
    }

    return matchSearch && matchState;
  });

  const today = new Date();
  const fullDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const handleMarkTodo = async (
    id: number,
    todo: string,
    status: boolean
  ) => {
    try {
      const data: UpdateTodoInput = {
        todo: todo,
        isCompleted: status,
        completedAt: new Date().toISOString(),
      };
      const response = await dispatch(updateTodo({ id, data }));
      if (response.meta.requestStatus === "fulfilled") {
        dispatch(fetchTodos());
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await dispatch(deleteTodo(id));
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <>
      {todos.length === 0 && (
        <div className="w-full h-full flex justify-center items-center text-lg font-bold">
          No data returned
        </div>
      )}
      {filteredTodos.map((todo) => (
        <div
          key={todo.id}
          className="flex justify-between items-center *:p-2  *:text-left *:text-xs *:font-medium"
        >
          {editingTodoId === todo.id && (
            <EditTodo
              id={todo.id}
              initialValue={todo.todo}
              status={todo.isCompleted}
              onClose={closeEditModal}
            />
          )}
          
          <div className="w-3/4">{todo.todo}</div>
          <div className="w-max">{todo.isCompleted ? "Completed" : "Pending"}</div>
          <div>{fullDate}</div>
          <div className="flex justify-center items-center gap-2">
            <Button
              title=""
              onClick={() => handleEditClick(todo.id)}
              disabled={false}
              styleClass="w-6 h-6 flex justify-center items-center rounded-md bg-indigo-50 hover:bg-indigo-200"
            >
              <FaRegEdit className="text-lg text-indigo-500" />
            </Button>

            <Button
              title=""
              onClick={() => handleDeleteTodo(todo.id)}
              disabled={false}
              styleClass="w-6 h-6 flex justify-center items-center rounded-md bg-indigo-50 hover:bg-indigo-200"
            >
              <RiDeleteBin6Line className="text-lg text-red-500" />
            </Button>

            {!todo.isCompleted && (
              <Button
                title=""
                onClick={() => handleMarkTodo(todo.id, todo.todo, true)}
                disabled={false}
                styleClass="w-6 h-6 flex justify-center items-center rounded-md bg-indigo-50 hover:bg-indigo-200"
              >
                <IoMdCheckmarkCircleOutline className="text-lg text-green-500" />
              </Button>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default TodoItem;
