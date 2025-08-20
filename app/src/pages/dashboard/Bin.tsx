import Button from "../../components/Button";
import { deleteTodo, updateTodo } from "../../features/todos/todoSlice";
import type { DeleteTodoPayload, Todo, UpdateTodoPayload } from "../../features/todos/types";
import { useAppDispatch, useAppSelector } from "../../hooks/redux/reduxHooks";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
// import { useFetchUserTodos } from "../../hooks/useFetchUserTodos";

const Bin = () => {
  const userTodos = useAppSelector((state) => state.todos.userTodos);
  const filteredTodos = userTodos.filter((todo) => todo.isRemoved);
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  // const fetchAll = useFetchUserTodos();

  //Handle restore-this function will restore all or a specific
  // Todo item from bin into the notes
  const handleRestoreTodo = async (
    todoToRestore:Todo
  ) => {
    if (!todoToRestore)
      throw new Error("Invalid payload options! Data is required.");

    const updatePayload:UpdateTodoPayload = {
      id:todoToRestore.id,
      updatedFields:{
        isRemoved:false
      },
      axiosPrivate
    }
    const response = await dispatch(updateTodo(updatePayload));
    if (response.meta.requestStatus === "fulfilled") {
      console.log("Restore")
    }
  };

  // Handle permanently delete todos-this function will permanently delete all or a specific
  // Todo item from db
  const handlePermanentlyDelete = async (id: number) => {
    if (!id) throw new Error("Id is required!");

    const updatePayload:DeleteTodoPayload = {
      id:id,
      axiosPrivate
    }

    const response = await dispatch(deleteTodo(updatePayload));
    if (response.meta.requestStatus === "fulfilled") {
      console.log("Item is deleted successfully!");
    }
  };

  return (
    <div className="removed-todos-in-bin-wrapper w-full h-full py-2 flex flex-col items-center gap-2 overflow-y-scroll ">
      {filteredTodos.map((todo) => (
        <div className="todo-item-container bg-gray-200 flex justify-between items-center w-2/3 h-10 p-2 rounded-sm">
          <div className="item w-4/6 text-black">{todo.todo}</div>
          <div className="item-actions flex justify-evenly items-center gap-2">
            <Button
              title="Restore"
              type="button"
              onClick={() => handleRestoreTodo(todo)}
              disabled={false}
              styleClass="flex justify-center items-center w-20 h-8 bg-indigo-500"
            />
            <Button
              title="Permanently Delete"
              type="button"
              onClick={() => handlePermanentlyDelete(todo.id)}
              disabled={false}
              styleClass="flex justify-center items-center w-32 h-8 bg-red-500"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Bin;
