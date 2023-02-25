export type IPrivileges = {
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

export type IRoles = {
  roleId: string;
  roleName: string;
  description: string;
  users: number;
};
