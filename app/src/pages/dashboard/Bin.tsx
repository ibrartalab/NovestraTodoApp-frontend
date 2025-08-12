import Button from "../../components/Button";
import { useAppSelector } from "../../hooks/redux/reduxHooks";

const Bin = () => {
  const userTodos = useAppSelector((state) => state.todos.userTodos);
  const filteredTodos = userTodos.filter((todo) => !todo.isRemoved);

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
              onClick={() => {}}
              disabled={false}
              styleClass="flex justify-center items-center w-20 h-8 bg-indigo-500"
            />
            <Button
              title="Delete Permanently"
              type="button"
              onClick={() => {}}
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
