import TodoItem from "./TodoItem";

const TodoList = () => {
  return (
    <div className="sidebar w-4/5 h-96">
      <aside className="todos-wrapper w-full h-full flex flex-col">
        <h2>Todos</h2>
        <div className="Header w-full flex justify-between text-sm font-medium  p-4 mt-4 border-collapse border bg-white">
            <div>Todo Name</div>
            <div>Status</div>
            <div>Created At</div>
            <div>Actions</div>
          </div>
        <div className="todos-list-wrapper overflow-y-scroll w-full h-full bg-gray-100">
          <table className="todos-table table-fixed border-collapse border w-full h-full">
            {/* <thead className="bg-gray-200 border-b-2 border-collapse">
              <tr className="text-center *:text-sm *:font-medium *:border *:border-gray-300 *:p-2 ">
                <th>Todo Name</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead> */}
            <tbody className="*:border *:border-gray-300">
              <TodoItem />
            </tbody>
          </table>
        </div>
      </aside>
    </div>
  );
};

export default TodoList;