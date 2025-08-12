export interface Todo {
  id: number;
  todo: string;
  isCompleted: boolean;
  isRemoved: boolean;
  userId: number;
  createdAt: string;
  completedAt?: string;
}

export interface UpdateTodoInput {
  todo: string;
  isCompleted: boolean;
  isRemoved:boolean;
  completedAt?: string;
}

export interface AddTodoResponse {
  id: number;
  todo: string;
  isCompleted: boolean;
  isRemoved: boolean;
  userId: number;
  createdAt: string;
  completedAt?: string;
}
