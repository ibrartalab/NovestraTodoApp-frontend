import { FaRegEdit } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import Button from "../Button";
import { useContext } from "react";
import { TodoContext } from "../../context/TodosContext";
import { updateTodo, type UpdateTodoInput } from "../../api/todosAPI";
import { SearchContext } from "../../context/SearchContext";


const TodoItem = () => {
  // const [todos, setToDos] = useState<AddTodoResponse[]>([]);
  const { todos,fetchTodos } = useContext(TodoContext);
  const {searchParam} = useContext(SearchContext);

  const searchedTodo = todos.filter(todo => todo.name.toLowerCase().includes(searchParam))


  const today = new Date();
  const fullDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  // update to mark is completed logic
  const handleMarkTodo = async (id:number,todo:string,status:boolean): Promise<void> => {
    try {
      const data: UpdateTodoInput = {
        id:id,
      name: todo,
      isComplete:status
    }
    const response  = await updateTodo(id,data);
    if(response.status === 201 || response.status === 204 || response.status === 200){
      fetchTodos();
    };
    return response.data;
    } catch (error) {
      console.log(error)
    }
    
  };


  // useEffect(() => {
  //   const updated = todos.filter(f => f.name === onSearchTodos)
  //   console.log(updated,onSearchTodos)
  // },[todos,onSearchTodos])

  return (
    <>
      {searchedTodo.map((todo) => (
        <div key={todo.id} className="flex justify-between items-center *:p-2  *:text-left *:text-xs *:font-medium">
          <div className="min-w-24">{todo.name}</div>
          <div>{todo.isComplete ? "Completed" : "Pending"}</div>
          <div>{fullDate}</div>
          <div className="flex justify-center items-center gap-2">
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
              onClick={() => handleMarkTodo(todo.id,todo.name,todo.isComplete = true)}
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
