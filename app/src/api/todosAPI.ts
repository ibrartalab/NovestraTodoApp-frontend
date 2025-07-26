import apiClient from "./APIClient";

interface AddTodoInput {
    // id: number;
    name: string;
    isComplete: boolean;
}

export interface UpdateTodoInput{
    id: number;
    name: string;
    isComplete: boolean;
}

export interface AddTodoResponse {
    id: number;
    name: string;
    isComplete: boolean;
}

export async function addTodo(data: AddTodoInput){
    const response = await apiClient.post<AddTodoResponse>("/TodoItems", data);
    return response.data;
};

export async function getTodos() {
    const response = await apiClient.get<AddTodoResponse[]>("/TodoItems");
    return response;
}

export async function updateTodo(id: number, data:UpdateTodoInput) {
    const response = await apiClient.put<void>(`/TodoItems/${id}`,data);
    return response;
}

export async function deleteTodo(id: number) {
    const response = await apiClient.delete(`/TodoItems/${id}`);
    return response.data;
}
