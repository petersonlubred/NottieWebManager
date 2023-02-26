import { APIResponse } from './auth';
export type IPrivilege = {
  systemPrivilegeId: string;
  userPrivilegeId: string;
  privilegeGroup: string;
  privilegeName: string;
  access: {
    canRead: boolean;
    canWrite: boolean;
    canDelete: boolean;
  };
};

export type IRole = {
  roleId: string;
  roleName: string;
  description: string;
  users: number;
};

export type IHeader = {
  header: string;
  key: string;
};

export interface PrivilegesResponse extends APIResponse<IPrivilege[]> {}
export interface RolesResponse extends APIResponse<IRole[]> {}
export interface RoleResponse extends APIResponse<IRole> {}
