import { FaRegEdit } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import Button from "../Button";
import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../../context/TodosContext";
import {
  deleteTodo,
  updateTodo,
  type UpdateTodoInput,
} from "../../api/todosAPI";
import { SearchContext } from "../../context/SearchContext";
import EditTodo from "./EditTodo";

const TodoItem = () => {
  // const [todos, setToDos] = useState<AddTodoResponse[]>([]);
  const { todos, fetchTodos } = useContext(TodoContext);
  const { searchParam, filters } = useContext(SearchContext);
  const [isEditTodo, setIsEditTodo] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState<string>("");
  const [deleteTodoState, setDeleteTodoState] = useState<number>(1);

  const filterdTodos = todos.filter((todo) => {
    const matchSearch = todo.name.toLowerCase().includes(searchParam);
    let macthState = true;

    if (filters === "active") {
      macthState = todo.isComplete === false;
    } else if (filters === "completed") {
      macthState = todo.isComplete === true;
    }
    return macthState && matchSearch;
  });

  const today = new Date();
  const fullDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const handleNewTodoInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewTodo(event.target.value);
  };
  // update to mark is completed logic
  const handleMarkTodo = async (
    id: number,
    todo: string,
    status: boolean
  ): Promise<void> => {
    try {
      const data: UpdateTodoInput = {
        id: id,
        name: todo,
        isComplete: status,
      };
      const response = await updateTodo(id, data);
      if (
        response.status === 201 ||
        response.status === 204 ||
        response.status === 200
      ) {
        fetchTodos();
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  //delete todo
  const handleDeleteTodo = async (id: number) => {
    const response = await deleteTodo(id);
    setDeleteTodoState((prev) => prev + 1);
    console.log(response);
    // if (response.status === 200) {

    // }
  };

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos, deleteTodoState]);

  return (
    <>
    {todos.length === 0 && <div className="w-full h-full flex justify-center items-center text-lg font-bold">No data return</div>}
      {filterdTodos.map((todo) => (
        <div
          key={todo.id}
          className="flex justify-between items-center *:p-2  *:text-left *:text-xs *:font-medium"
        >
          <EditTodo
            newTodo={newTodo}
            isEditTodo={isEditTodo}
            handleNewTodoInputChange={handleNewTodoInputChange}
            id={todo.id}
            status={todo.isComplete}
            setIsEditTodo={setIsEditTodo}
            fetchTodos={fetchTodos}
          />
          <div className="w-3/4">{todo.name}</div>
          <div className="w-max">{todo.isComplete ? "Completed" : "Pending"}</div>
          <div className="">{fullDate}</div>
          <div className="flex justify-center items-center gap-2 ">
            <Button
              title=""
              onClick={() => setIsEditTodo(!isEditTodo)}
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

            <Button
              title=""
              onClick={() =>
                handleMarkTodo(todo.id, todo.name, (todo.isComplete = true))
              }
              disabled={false}
              styleClass="w-6 h-6 flex justify-center items-center rounded-md bg-indigo-50 hover:bg-indigo-200"
            >
              <IoMdCheckmarkCircleOutline className="text-lg text-green-500" />
            </Button>
          </div>
        </div>
      ))}
    </>
  );
};

export default TodoItem;
