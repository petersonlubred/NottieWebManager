import { APIResponse } from './schema';
import { UserData } from './user';

export interface LoginRequest {
  email: string;
  password: string;
}
export interface AuthResponse {
  user: UserData;
  token: string;
}
export interface LoginResponse extends APIResponse<AuthResponse> {}
