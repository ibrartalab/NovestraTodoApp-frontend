import { FaRegEdit } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import Button from "../Button";
import { useContext, useEffect } from "react";

import { TodoContext } from "../../context/TodosContext";

const TodoItem = () => {
  // const [todos, setToDos] = useState<AddTodoResponse[]>([]);
  const { todos, fetchTodos } = useContext(TodoContext);

  const today = new Date();
  const fullDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  // const fetchTodos = useCallback(async () => {
  //   const data: AddTodoResponse[] = await getTodos();
  //   setToDos(data);
  // }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);
  return (
    <>
      {todos.map((todo) => (
        <tr key={todo.id} className="text-center *:p-4">
          <td>{todo.name}</td>
          <td>{todo.isComplete ? "Completed" : "Pending"}</td>
          <td>{fullDate}</td>
          <td className="flex justify-center items-center gap-2">
            <Button
              title=""
              onClick={() => {}}
              disabled={false}
              styleClass="w-6 h-6 flex justify-center items-center rounded-md bg-indigo-50 hover:bg-indigo-200"
            >
              <FaRegEdit className="text-lg text-indigo-500" />
            </Button>

            <Button
              title=""
              onClick={() => {}}
              disabled={false}
              styleClass="w-6 h-6 flex justify-center items-center rounded-md bg-indigo-50 hover:bg-indigo-200"
            >
              <RiDeleteBin6Line className="text-lg text-red-500" />
            </Button>

            <Button
              title=""
              onClick={() => {}}
              disabled={false}
              styleClass="w-6 h-6 flex justify-center items-center rounded-md bg-indigo-50 hover:bg-indigo-200"
            >
              <IoMdCheckmarkCircleOutline className="text-lg text-green-500" />
            </Button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default TodoItem;
