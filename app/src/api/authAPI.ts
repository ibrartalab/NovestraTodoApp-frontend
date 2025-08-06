import { axiosInstance } from "../config/axiosInstance";
import type { AuthLoginInput, AuthResponse, AuthSignupInput } from "../types/auth/types";

// Function to handle user login
export async function login(data: AuthLoginInput) {
  const response = await axiosInstance.post<AuthResponse>("/Auth/login", data);
  return response;
}
// Function to handle user signup
export async function signUp(data: AuthSignupInput) {
  const response = await axiosInstance.post<AuthResponse>(
    "/Auth/register",
    data
  );
  return response;
}
