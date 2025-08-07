import type { User } from "../user/types";

export interface AuthLoginInput {
  username: string;
  password: string;
}

export interface AuthSignupInput {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user:User;
}
