import { useContext } from "react";
import TodoItem from "./TodoItem";
import { SearchContext } from "../../context/SearchContext";

const TodoList = () => {
  const { setFilters } = useContext(SearchContext);
  const handleFiltersChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case "all":
        setFilters("all");
        break;
      case "active":
        setFilters("active");
        break;
      case "completed":
        setFilters("completed");
        break;
      default:
        setFilters("all");
    }
  };
  return (
    <div className="sidebar w-full h-full text-black">
      <div className="todos-wrapper w-full h-full flex flex-col gap-2">
        <div className="filters">
          <select
            name="filter"
            id="filterByStatus"
            className="*:text-xs *:font-medium bg-white rounded-sm"
            onChange={handleFiltersChange}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="table-wrapper rounded-lg w-full h-3/4 broder border-2 bg-gray-100">
          <div className="Header w-full flex justify-between pr-8 text-sm font-medium  p-4 rounded-t-lg bg-white">
            <div className="w-3/4">Todo Name</div>
            <div>Status</div>
            <div>Created At</div>
            <div>Actions</div>
          </div>
          <div className=" todos-list-wrapper w-full h-5/6 *:border-b-2 bg-gray-100">
            <TodoItem />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
