import apiClient from "./APIClient";


export interface AuthLoginInput {
    username: string;
    password: string;

}

export interface AuthSignupInput {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
}

export interface AuthResponse {
    firstName: string;
    lastName: string;
    username: string;
    token: string;
    statusCode: number;
}

// Function to handle user login
export async function login(data: AuthLoginInput){
    const response = await apiClient.post<AuthResponse>("/Auth/login", data);
    return response;
};
// Function to handle user signup
export async function signUp(data: AuthSignupInput) {
    const response = await apiClient.post<AuthResponse>("/Auth/register", data);
    return response;
}
// Function to handle user logout
export async function logout() {
    const response = await apiClient.post("/auth/logout");
    return response.data;
}