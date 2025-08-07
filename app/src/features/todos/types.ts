export interface Todo {
    id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
  createdAt: string;
  completedAt?: string;
}

export interface UpdateTodoInput {
  todo: string;
  isCompleted: boolean;
  completedAt?: string;
}

export interface AddTodoResponse {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
  createdAt: string;
  completedAt?: string;
}
