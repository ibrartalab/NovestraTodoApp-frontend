import Button from "../../components/Button";
import { deleteTodo, updateTodo } from "../../features/todos/todoSlice";
import type { UpdateTodoInput } from "../../features/todos/types";
import { useAppDispatch, useAppSelector } from "../../hooks/redux/reduxHooks";
import { useFetchUserTodos } from "../../hooks/useFetchUserTodos";

const Bin = () => {
  const userTodos = useAppSelector((state) => state.todos.userTodos);
  const filteredTodos = userTodos.filter((todo) => todo.isRemoved);
  const dispatch = useAppDispatch();
  const fetchAll = useFetchUserTodos();

  //Handle restore-this function will restore all or a specific
  // Todo item from bin into the notes
  const handleRestoreTodo = async(id:number,requestedData:UpdateTodoInput) => {
    if(!requestedData) throw new Error("Invalid payload options! Data is required.")
    
    const data = {
      ...requestedData,
      isRemoved:false
    }
    const response = await dispatch(updateTodo({id,data}));
    if(response.meta.requestStatus === 'fulfilled'){
      fetchAll();
    }
  };

  // Handle permanently delete todos-this function will permanently delete all or a specific
  // Todo item from db
  const handlePermanentlyDelete = async(id:number)=>{
    if(!id) throw new Error("Id is required!")
    
    const response = await dispatch(deleteTodo(id));
    if(response.meta.requestStatus === 'fulfilled'){
      console.log("Item is deleted successfully!")
    }
  };

  console.log(filteredTodos);
  return (
    <div className="removed-todos-in-bin-wrapper w-full h-full py-2 flex flex-col items-center gap-2 overflow-y-scroll ">
      {filteredTodos.map((todo) => (
        <div className="todo-item-container bg-gray-200 flex justify-between items-center w-2/3 h-10 p-2 rounded-sm">
          <div className="item w-4/6 text-black">{todo.todo}</div>
          <div className="item-actions flex justify-evenly items-center gap-2">
            <Button
              title="Restore"
              type="button"
              onClick={() => handleRestoreTodo(todo.id,todo)}
              disabled={false}
              styleClass="flex justify-center items-center w-20 h-8 bg-indigo-500"
            />
            <Button
              title="Delete Permanently"
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
