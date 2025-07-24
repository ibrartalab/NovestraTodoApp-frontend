/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { type AuthInput,type AuthResponse,login as apiLogin,signUp as apiSignup} from "../api/authAPI";

export function useAuth() {
    const [user, setUser] = useState<AuthResponse['username']| null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Function to check if user is logged in
    const login  = async (input:AuthInput): Promise<AuthResponse | null> => {
        setLoading(true);
        setError(null);
        try {
            const data = await apiLogin(input);
            localStorage.setItem("token",data?.token); // Store token in local storage
            setUser(data?.username);
            return data;
        } catch (err: unknown) {
            // Handle error response
            setError("Login failed. Please check your credentials.");
            return null;
        } finally {
            setLoading(false);
        }
    };

    const signup = async (input:AuthInput): Promise<AuthResponse | null> => {
        setLoading(true);
        setError(null);
        try {
            const data = await apiSignup(input);
            localStorage.setItem("token", data.token); // Store token in local storage
            setUser(data.username);
            return data;
        } catch (err: unknown) {
            setError("Signup failed. Please check your details.");
            return null;
        } finally {
            setLoading(false);
        }
    };

    // const logout = () => {
    //     setLoading(true);
    //     setError(null);
    //     try {
    //        apiLogout(); // Call the API to logout
    //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     } catch (err: any) {
    //         setError("Logout failed. Please try again.");
    //     } finally {
    //         setLoading(false);
    //     }
    //     setUser(null);
    //     localStorage.removeItem("token"); // Remove token from local storage
    // };

    return {
        user,
        loading,
        error,
        login,
        signup,
    };
};



