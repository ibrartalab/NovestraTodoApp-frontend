import { FaRegEdit } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import Button from "../Button";
import { useContext, useState } from "react";
import { TodoContext } from "../../context/TodosContext";
import {
  deleteTodo,
  updateTodo,
  type UpdateTodoInput,
} from "../../api/todosAPI";
import { SearchContext } from "../../context/SearchContext";
import Input from "../Input";
import { MdOutlineCancel } from "react-icons/md";

const TodoItem = () => {
  // const [todos, setToDos] = useState<AddTodoResponse[]>([]);
  const { todos, fetchTodos } = useContext(TodoContext);
  const { searchParam } = useContext(SearchContext);
  const [isEditTodo, setIsEditTodo] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState<string>("");

  const searchedTodo = todos.filter((todo) =>
    todo.name.toLowerCase().includes(searchParam)
  );

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
    if (response.status === 200) {
      fetchTodos();
    }
  };

  // update to mark is completed logic

  return (
    <>
      {/* {isEditTodo && (
        <div className="w-full h-full bg-gray-400/60 absolute top-0 left-0 ">
        <div className="edit-todo absolute top-1/4 left-1/3 m-auto  w-1/3 h-52 z-50 flex justify-between items-center gap-2 bg-white">
      <MdOutlineCancel className="absolute top-2 right-2 text-2xl cursor-pointer text-indigo-500" onClick={() => setIsEditTodo(false)}/>
        <div className="w-full h-full flex justify-center items-center gap-2">
          <div className="w-60 h-20">
            <Input
              label="Update Todo"
              placeholder="Enter task name..."
              type="text"
              name="todo"
              value={newTodo}
              onChange={handleNewTodoInputChange}
              styleClass="w-full"
            />
          </div>
          <div className="w-max h-20 flex justify-center items-center">
            <Button
              title="Update"
              onClick={() => 
                searchedTodo.map(T => handleUpdateTodoContext(T.id,T.name = newTodo,T.isComplete))
              }
              disabled={false}
              styleClass=" flex justify-center items-center w-24 h-10 rounded-md text-white bg-indigo-600 hover:bg-indigo-500"
            />
          </div>
        </div>
      </div>
      </div>
      )} */}
      {searchedTodo.map((todo) => (
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
          <div className="min-w-24">{todo.name}</div>
          <div>{todo.isComplete ? "Completed" : "Pending"}</div>
          <div>{fullDate}</div>
          <div className="flex justify-center items-center gap-2">
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

//Sub components

interface EditTodoType {
  newTodo: string;
  isEditTodo: boolean;
  handleNewTodoInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // handleUpdateTodoContext: (id: number,todo: string,status: boolean)=> Promise<void>;
  id: number;
  status: boolean;
  setIsEditTodo: React.Dispatch<React.SetStateAction<boolean>>;
  fetchTodos: () => void;
}
function EditTodo({
  newTodo,
  isEditTodo,
  handleNewTodoInputChange,
  id,
  status,
  setIsEditTodo,
  fetchTodos,
}: EditTodoType) {
  const handleUpdateTodoContext = async (
  ): Promise<void> => {
    try {
      const data: UpdateTodoInput = {
        id: id,
        name: newTodo,
        isComplete: status,
      };
      console.log(id,newTodo,status)
      const response = await updateTodo(id, data);
      if (
        response.status === 201 ||
        response.status === 204 ||
        response.status === 200
      ) {
        fetchTodos();
      }
      setIsEditTodo(false)
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isEditTodo && (
        <div className="w-full h-full bg-gray-400/60 absolute top-0 left-0 ">
          <div className="edit-todo absolute top-1/4 left-1/3 m-auto  w-1/3 h-52 z-50 flex justify-between items-center gap-2 bg-white">
            <MdOutlineCancel
              className="absolute top-2 right-2 text-2xl cursor-pointer text-indigo-500"
              onClick={() => setIsEditTodo(false)}
            />
            <div className="w-full h-full flex justify-center items-center gap-2">
              <div className="w-60 h-20">
                <Input
                  label="Update Todo"
                  placeholder="Enter task name..."
                  type="text"
                  name="todo"
                  value={newTodo}
                  onChange={handleNewTodoInputChange}
                  styleClass="w-full"
                />
              </div>
              <div className="w-max h-20 flex justify-center items-center">
                <Button
                  title="Update"
                  onClick={handleUpdateTodoContext}
                  disabled={false}
                  styleClass=" flex justify-center items-center w-24 h-10 rounded-md text-white bg-indigo-600 hover:bg-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TodoItem;
