import { UserData } from './user';

export interface APIResponse<T> {
  status: string;
  message: string;
  data: T;
}

export interface APIErrorResponse {
  status: string;
  data: {
    message: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}
export interface AuthResponse {
  user: UserData;
  token: string;
}

export interface LoginResponse extends APIResponse<AuthResponse> {}
