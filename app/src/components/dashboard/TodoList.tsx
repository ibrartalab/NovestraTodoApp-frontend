import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import { TodoItem } from "./TodoItem";
// import { TodoContext } from "../../context/TodosContext";

const TodoList = () => {
  const { setFilters } = useContext(SearchContext);
  // const {totalTodos,totalTodosCompleted} = useContext(TodoContext);
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
    <div className="sidebar w-full h-full bg-stone-600 text-black">
      <TodoItem />
    </div>
  );
};

export default TodoList;
