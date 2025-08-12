import { useContext, useEffect, useState } from "react";
import Button from "../Button";
import { FaCheck, FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SearchContext } from "../../context/SearchContext";
import { useAppDispatch, useAppSelector } from "../../hooks/redux/reduxHooks";
import EditTodo from "./EditTodo";
import {
  fetchTodosByUserId,
  updateTodo
} from "../../features/todos/todoSlice";
import type { UpdateTodoInput} from "../../features/todos/types";
import { Loader } from "../Loader";
import  { useFetchUserTodos } from "../../hooks/useFetchUserTodos";

export const TodoItem = () => {
  const { searchParam, filters } = useContext(SearchContext);
  const { userTodos } = useAppSelector((state) => state.todos);
  const userId = useAppSelector((state) => state.auth.userId);
  const loading = useAppSelector((state) => state.todos.loading);
  const dispatch = useAppDispatch();
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const fetchAll  = useFetchUserTodos();

  // Function to handle editing a todo item
  const handleEditClick = (id: number) => {
    setEditingTodoId(id);
  };

  // Function to close the edit modal
  const closeEditModal = () => {
    setEditingTodoId(null);
  };

  const filteredTodos = userTodos.filter((todo) => {
    const matchSearch = todo.todo
      ?.toLowerCase()
      .includes(searchParam.toLowerCase());
    let matchState:boolean = true;
    const matchSecondState:boolean = !todo.isRemoved;

    if (filters === "active") {
      matchState = !todo.isCompleted;
    } else if (filters === "completed") {
      matchState = todo.isCompleted;
    }

    return matchSearch && matchState && matchSecondState;
  });

  // Function to handle marking a todo item as completed or active
  // This function will be called when the user clicks the checkbox
  // It updates the todo item's status and completed date
  const handleMarkTodo = async (id:number,requestData:UpdateTodoInput) => {
    try {
      const data = {
        todo:requestData.todo,
        isCompleted: !requestData.isCompleted,
        isRemoved:requestData.isRemoved,
        completedAt: new Date().toISOString(),
      };
      const response = await dispatch(updateTodo({ id, data }));
      if (response.meta.requestStatus === "fulfilled") {
        if(userId){
          await dispatch(fetchTodosByUserId(userId));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle deleting a todo item
  // This function will be called when the user clicks the delete button
  const handleDeleteTodo = async (id: number,todo:UpdateTodoInput) => {
    try {
      const data= {
        ...todo,
      isRemoved:true,
      }
      const response = await dispatch(updateTodo({id,data}));
      if(response.meta.requestStatus === "fulfilled"){
        fetchAll();
      }

    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  //// Fetch todos by user ID when the component mounts
    // Assuming you have a userId available in your Redux store or context
  useEffect(() => {
    
    if (!userId) {
      console.error("User ID is not available", userId);
      return;
    }
    dispatch(fetchTodosByUserId(userId));
    // If you want to fetch all todos, you can use fetchTodos() instead
  }, [dispatch, userId]);

  return (
    <>
    {loading && (
      <Loader/>
    )}
      {userTodos.length === 0 && (
        <div className="w-full flex justify-center items-center text-lg font-bold">
          No data returned
        </div>
      )}
      {filteredTodos.map((todo) => (
        <div
          key={todo.id}
          className={`py-2`}
        >
          {editingTodoId === todo.id && (
            <EditTodo
            id={todo.id}
              requestedData={todo}
              onClose={closeEditModal}
            />
          )}
          <div className="item-wrapper">
            <div className="todo-item-wrapper w-full h-10 flex justify-center items-center">
              <div className={`todo w-3/5 h-10 p-2 flex justify-between rounded-md bg-gray-200 text-black`}>
                <div className="w-8 h-full flex justify-center items-center">
                  <Button
                  type="button"
                  title=""
                  onClick={() => handleMarkTodo(todo.id,todo)}
                  disabled={false}
                  styleClass="w-full h-full border-2 border-black flex justify-center items-center"
                  >
                    {todo.isCompleted ? (<FaCheck className="text-lg text-green-500"/>) : ''}
                  </Button>
                </div>
                <div className="todo-left flex items-center w-full h-full ml-4">
                  <p className={`w-max text-wrap ${todo.isCompleted ? 'line-through' : ''}`}>{todo.todo}</p>
                </div>
                <div className="todo-right w-20 flex justify-evenly items-center h-full">
                  <Button
                    title=""
                    onClick={() => handleEditClick(todo.id)}
                    disabled={false}
                    styleClass="w-6 h-6 flex justify-center items-center"
                  >
                    <FaRegEdit className="text-lg text-indigo-500" />
                  </Button>
                  <Button
                    title=""
                    onClick={() => handleDeleteTodo(todo.id,todo)}
                    disabled={false}
                    styleClass="w-6 h-6 flex justify-center items-center"
                  >
                    <RiDeleteBin6Line className="text-lg text-red-500" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
