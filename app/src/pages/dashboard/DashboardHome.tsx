import { AddTodo } from "../../components/dashboard/AddTodo"
import TodoList from "../../components/dashboard/TodoList"

const DashboardHome = () => {
  return (
        <div className="flex flex-col w-full h-full">
            <div className="addtodo">
                <AddTodo/>
            </div>
            <div className="todoList-container h-full overflow-y-scroll">
                <TodoList/>
            </div>
        </div>
  )
}

export default DashboardHome
