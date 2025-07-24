import TodoItem from "./TodoItem";

const TodoList = () => {
  return (
    <div className="sidebar w-4/5 h-full mt-4 border-r-2">
      <aside className="todos-wrapper w-full h-full flex flex-col justify-start items-start gap-4">
        <h2>Todos</h2>
        
        <div className="todos-list-wrapper">
          <table className="todos-table table-fixed border-collapse border w-11/12 h-full">
            <thead className="bg-gray-200 border-b-2 border-collapse">
              <tr className="text-center *:text-sm *:font-medium *:border *:border-gray-300 *:p-2">
                <th>Todo Name</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-center *:text-sm *:font-normal *:border *:border-gray-300">
              <TodoItem />
            </tbody>
          </table>
        </div>
      </aside>
    </div>
  );
};

export default TodoList;