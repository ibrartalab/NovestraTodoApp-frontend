import { MdOutlineCancel } from "react-icons/md";
import Button from "../Button";
import Input from "../Input";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux/reduxHooks";
import type { UpdateTodoInput } from "../../features/todos/types";
import { updateTodo , fetchTodosByUserId } from "../../features/todos/todoSlice";


interface EditTodoProps {
  id: number;
  initialValue: string;
  status: boolean;
  onClose: () => void;
}

const EditTodo = ({ id, initialValue, status, onClose }: EditTodoProps) => {
  const [editedTodo, setEditedTodo] = useState(initialValue);
  const userId  = useAppSelector((state) => state.auth.userId);
  const dispatch = useAppDispatch();

  const handleUpdate = async (userId:number) => {
    try {
      const data: UpdateTodoInput = {
        todo: editedTodo,
        isCompleted: status,
        completedAt: status ? new Date().toISOString() : undefined,
      };

      const response = await dispatch(updateTodo({ id, data }));
      if (response.meta.requestStatus === "fulfilled") {
        if(userId){
          await dispatch(fetchTodosByUserId(userId));
        }
        onClose(); // close modal
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  // useEffect(()=>{
  //   dispatch(fetchTodosByUserId(id))
  // },[dispatch,id])

  return (
    <div className="w-full h-full bg-gray-400/60 fixed top-0 left-0 z-50 flex justify-center items-center">
      <div className="bg-white rounded-md shadow-md p-6 relative w-96">
        <MdOutlineCancel
          className="absolute top-2 right-2 text-2xl cursor-pointer text-indigo-500"
          onClick={onClose}
        />
        <Input
          label="Update Todo"
          placeholder="Enter task name..."
          type="text"
          name="todo"
          value={editedTodo}
          onChange={(e) => setEditedTodo(e.target.value)}
          styleClass="w-full"
        />
        <div className="flex justify-end mt-4">
          <Button
            title="Update"
            onClick={() => handleUpdate(userId)}
            disabled={!editedTodo.trim()}
            styleClass="w-24 h-10 rounded-md text-white bg-indigo-600 hover:bg-indigo-500"
          />
        </div>
      </div>
    </div>
  );
};

export default EditTodo;
