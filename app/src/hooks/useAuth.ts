/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { type AuthLoginInput,type AuthSignupInput,type AuthResponse,login as apiLogin,signUp as apiSignup} from "../api/authAPI";


export function useAuth() {
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Function to check if user is logged in
    const login  = async (input:AuthLoginInput): Promise<AuthResponse | null> => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiLogin(input);
            localStorage.setItem("token",response.data?.token); // Store token in local storage
            localStorage.setItem("username", response.data?.username); // Store username in local storage
            // Set user context after successful login
            if (!response.data.username) {
                throw new Error("Username is required");
            }
            
            return {
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                username: response.data.username,
                token: response.data.token,
                statusCode: response.status,
            };
        } catch (err: unknown) {
            // Handle error response
            setError("Login failed. Please check your credentials.");
            return null;
        } finally {
            setLoading(false);
        }
    };

    const signup = async (input:AuthSignupInput): Promise<AuthResponse | null> => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiSignup(input);
            localStorage.setItem("token", response.data.token); // Store token in local storage
            // Set user context after successful signup
            if (!response.data.username) {
                throw new Error("Username is required");
            }
            return{
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                username: response.data.username,
                token: response.data.token,
                statusCode: response.status,
            };
        } catch (err: unknown) {
            setError("Signup failed. Please check your details.");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        login,
        signup,
    };
};



