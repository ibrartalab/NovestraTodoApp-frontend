import { useContext } from "react";
import { SearchInput } from "./SearchInput";
import TodoItem from "./TodoItem";
import { SearchContext } from "../../context/SearchContext";

const TodoList = () => {
  const {setFilters} = useContext(SearchContext);
  const handleFiltersChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch(event.target.value){
      case 'all':
        setFilters('all');
        break;
      case 'active':
        setFilters('active');
        break;
      case 'completed':
        setFilters('completed');
        break;
      default:
      setFilters('all');
    }
  }
  return (
    <div className="sidebar w-4/5 text-black">
      <aside className="todos-wrapper w-full h-full flex flex-col">
        <SearchInput/>
        <div className="filters mt-2">
          <select name="filter" id="filterByStatus" className="*:text-xs *:font-medium bg-white rounded-sm"
           onChange={handleFiltersChange}>
            <option value='all'>All</option>
            <option value='active'>Active</option>
            <option value='completed'>Completed</option>
          </select>
        </div>
        <div className="Header w-full flex justify-between text-sm font-medium  p-4 mt-2 border-collapse border bg-white">
            <div>Todo Name</div>
            <div>Status</div>
            <div>Created At</div>
            <div>Actions</div>
          </div>
        <div className="todos-list-wrapper overflow-y-scroll w-full h-full bg-gray-100">
          <div className="*:border *:border-gray-300">
              <TodoItem />
            </div>
        </div>
      </aside>
    </div>
  );
};

export default TodoList;