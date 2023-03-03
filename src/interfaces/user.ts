import { APIResponse } from './auth';
export interface UserData {
  authenticationType: string;
  email: string;
  entryDate: string;
  firstName: string;
  id?: string;
  isTempPassord: string;
  lastLogin: string;
  lastName: string;
  otherNames: string;
  password: string;
  roles: string[];
  status: string;
  username: string;
}

export interface BulkResetPassword extends Array<{ userId: string; emailAddress: string }> {}

export interface UsersResponse extends APIResponse<UserData[]> {}
export interface UserResponse extends APIResponse<UserData> {}
