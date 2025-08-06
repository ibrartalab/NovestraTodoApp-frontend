import { MdOutlineCancel } from "react-icons/md";
import Button from "../Button";
import Input from "../Input";
import useTodoApi, { type UpdateTodoInput } from "../../hooks/useTodoAPI";
import { useAppDispatch } from "../../hooks/redux/reduxHooks";

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

const EditTodo = ({
  newTodo,
  isEditTodo,
  handleNewTodoInputChange,
  id,
  status,
  setIsEditTodo,
  fetchTodos,
}: EditTodoType) => {
  const {updateTodo} = useTodoApi();
  const dispatch = useAppDispatch();
  
  const handleUpdateTodoContext = async (): Promise<void> => {
    try {
      const data: UpdateTodoInput = {
        id: id,
        name: newTodo,
        isComplete: status,
      };
      console.log(id, newTodo, status);
      const response = await dispatch(updateTodo({ id, data }));
      if (
        response.status === 201 ||
        response.status === 204 ||
        response.status === 200
      ) {
        fetchTodos();
      }
      setIsEditTodo(false);
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
};

export default EditTodo;
