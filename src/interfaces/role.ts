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
