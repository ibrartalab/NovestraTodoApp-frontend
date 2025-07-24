import apiClient from "./APIClient";

interface AddTodoInput {
    // id: number;
    title: string;
    isCompleted: boolean;
}



interface AddTodoResponse {
    id: number;
    title: string;
    isCompleted: boolean;
}

export async function addTodo(data: AddTodoInput){
    const response = await apiClient.post<AddTodoResponse>("/TodoItems", data);
    return response.data;
};

export async function getTodos() {
    const response = await apiClient.get<AddTodoResponse[]>("/TodoItems");
    return response.data;
}

export async function updateTodo(id: number, data: Partial<AddTodoInput>) {
    const response = await apiClient.put<AddTodoResponse>(`/TodoItems/${id}`, data);
    return response.data;
}

export async function deleteTodo(id: number) {
    const response = await apiClient.delete(`/TodoItems/${id}`);
    return response.data;
}
