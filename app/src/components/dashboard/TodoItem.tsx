import { FaRegEdit } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import Button from "../Button";
import { useCallback, useEffect, useState } from "react";
import { getTodos, type AddTodoResponse } from "../../api/todosAPI";

const TodoItem = () => {
    const [todos,setToDos] = useState<AddTodoResponse[]>([])
    

    const fetchTodos = useCallback(async () => {
      const data: AddTodoResponse[] = await getTodos();
          setToDos(data);
    },[])

      useEffect(() => {
        fetchTodos();
      },[fetchTodos])
  return (
    <>
    {todos.map(todo => (
        <tr key={todo.id} className="text-center *:p-4">
      <td>{todo.name}</td>
      <td>{todo.isCompleted ? "Completed" : "Pending"}</td>
      <td>{Date.now().toString()}</td>
      <td className="flex justify-center items-center gap-2">
        <td>
          <Button
            title=""
            onClick={() => {}}
            disabled={false}
            styleClass="w-6 h-6 flex justify-center items-center rounded-md bg-indigo-50 hover:bg-indigo-200"
          >
            <FaRegEdit className="text-lg text-indigo-500" />
          </Button>
        </td>
        <td>
          <Button
            title=""
            onClick={() => {}}
            disabled={false}
            styleClass="w-6 h-6 flex justify-center items-center rounded-md bg-indigo-50 hover:bg-indigo-200"
          >
            <RiDeleteBin6Line className="text-lg text-red-500" />
          </Button>
        </td>
        <td>
          <Button
            title=""
            onClick={() => {}}
            disabled={false}
            styleClass="w-6 h-6 flex justify-center items-center rounded-md bg-indigo-50 hover:bg-indigo-200"
          >
            <IoMdCheckmarkCircleOutline className="text-lg text-green-500" />
          </Button>
        </td>
      </td>
    </tr>
    ))}
    </>
  );
};

export default TodoItem;
