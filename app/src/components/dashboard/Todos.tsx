import { FaRegEdit } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import Button from "../Button";

type TodoStatus = "completed" | "pending" | "overdue";

interface TodosProps {
  todoName?: string;
  status?: TodoStatus;
  createdAt?: string;
  updatedAt?: string;
}

export const Todos = () => {
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
              <tr className="text-center *:p-4">
                <td>Sample Todo</td>
                <td>Pending</td>
                <td>2023-10-01</td>
                <td className="flex justify-center items-center gap-2">
                  <td>
                    <Button title="" onClick={() => {}} disabled={false}
                      styleClass="w-6 h-6 flex justify-center items-center rounded-md bg-indigo-50 hover:bg-indigo-200"
                      >
                      <FaRegEdit className="text-lg text-indigo-500" />
                    </Button>
                  </td>
                  <td>
                    <Button title="" onClick={() => {}} disabled={false}
                       styleClass="w-6 h-6 flex justify-center items-center rounded-md bg-indigo-50 hover:bg-indigo-200">
                      <RiDeleteBin6Line className="text-lg text-red-500" />
                    </Button>
                  </td>
                  <td>
                    <Button title="" onClick={() => {}} disabled={false}
                       styleClass="w-6 h-6 flex justify-center items-center rounded-md bg-indigo-50 hover:bg-indigo-200">
                      <IoMdCheckmarkCircleOutline className="text-lg text-green-500" />
                    </Button>
                  </td>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </aside>
    </div>
  );
};
