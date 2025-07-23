import apiClient from "./APIClient";

interface AddTodoInput {
    id: string;
    title: string;
    isCompleted: boolean;
}

interface AddTodoResponse {
    id: string;
    title: string;
    isCompleted: boolean;
}

export async function addTodo(data: AddTodoInput){
    const response = await apiClient.post<AddTodoResponse>("/TodoItems", data);
    return response.data;
};