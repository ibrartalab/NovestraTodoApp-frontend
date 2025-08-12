/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import {
  login as apiLogin,
  signUp as apiSignup,
} from "../api/authAPI";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import type { AuthLoginInput, AuthSignupInput } from "../features/auth/types";

export function useAuth() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //Handle user login
  const login = async (input: AuthLoginInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiLogin(input);
      // Add some basic validation
      if(!response.data){
        throw new Error("Invalid response data");
      }else if(response.data.user.userName === "" || response.data.token === ""){
        throw new Error("Username or token is empty");
      }
      // Dispatch credentials to Redux store
      dispatch(
        setCredentials({
          accessToken: response.data.token,
          user: response.data.user.userName,
          userId: response.data.user.id,
        })
      );
      return response;
    } catch (err: unknown) {
      setError("Login failed. Please check your credentials.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Handle user signup
  const signup = async (input: AuthSignupInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiSignup(input);
      // Add some basic validation
      if (!response.data) {
        throw new Error("Invalid response data");
      }

      if (!response.data.user.userName || !response.data.token) {
        throw new Error("Missing username or token");
      }

      // // Dispatch credentials to Redux store
      dispatch(
        setCredentials({
          accessToken: response.data.token,
          user: response.data.user.userName, // or user object depending on your reducer
        })
      );

      return response;
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
}