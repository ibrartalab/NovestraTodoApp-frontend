import apiClient from "./APIClient";


export interface AuthInput {
    username: string;
    password: string;
}

export interface AuthResponse {
    username: string;
    token: string;
}

// Function to handle user login
export async function login(data: AuthInput){
    const response = await apiClient.post<AuthResponse>("/auth/login", data);
    return response.data;
};
// Function to handle user signup
export async function signUp(data: AuthInput) {
    const response = await apiClient.post<AuthResponse>("/auth/signup", data);
    return response.data;
}
// Function to handle user logout
export async function logout() {
    const response = await apiClient.post("/auth/logout");
    return response.data;
}