/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import {
  type AuthLoginInput,
  type AuthSignupInput,
  type AuthResponse,
  login as apiLogin,
  signUp as apiSignup,
} from "../api/authAPI";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";

export function useAuth() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (input: AuthLoginInput): Promise<AuthResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiLogin(input);

      if (!response.data.username || !response.data.token) {
        throw new Error("Missing username or token");
      }

      // Dispatch credentials to Redux store
      dispatch(
        setCredentials({
          accessToken: response.data.token,
          user: response.data.username, // or user object depending on your reducer
        })
      );

      return {
        ...response.data,
        statusCode: response.status,
      };
    } catch (err: unknown) {
      setError("Login failed. Please check your credentials.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (input: AuthSignupInput): Promise<AuthResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiSignup(input);

      if (!response.data.username || !response.data.token) {
        throw new Error("Missing username or token");
      }

      return {
        ...response.data,
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
}