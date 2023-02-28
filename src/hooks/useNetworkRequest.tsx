import { useState } from 'react';

import { useToast } from '@/context/ToastContext';
import { useDeleteRoleMutation, useDeleteUserMutation, useDeleteUsersMutation, useResendPasswordMutation } from '@/redux/api';

type DataProps = {
  id?: string;
  status?: boolean;
  ids?: string[];
};

const useNetworkRequest = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [sendResetPassword] = useResendPasswordMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [deleteRole] = useDeleteRoleMutation();
  const [deleteUsers] = useDeleteUsersMutation();

  const handleRequest = async (data: DataProps, context: string) => {
    const { id, ids } = data;
    try {
      setLoading(true);
      if (context === 'reset') {
        await sendResetPassword({ id: id }).unwrap();
        toast('success', 'Password reset link sent successfully');
      } else if (context === 'reset-passwords') {
        // await deleteUser({ status: data?.status, id: id }).unwrap();
        toast('success', 'Password reset links sent successfully');
      } else if (context === 'delete-user' || context === 'activate-user') {
        await deleteUser({ status: data?.status, id: id }).unwrap();
        toast('success', context === 'delete-user' ? 'User deactivated successfully' : 'User activated successfully');
      } else if (context === 'delete-users' || context === 'activate-users') {
        await deleteUsers({ userIds: ids, status: data?.status }).unwrap();
        toast('success', context === 'delete-users' ? 'Users deactivated successfully' : 'Users activated successfully');
      } else if (context === 'delete-role') {
        await deleteRole({ roleId: id }).unwrap();
        toast('success', 'Role deleted successfully');
      } else if (context === 'delete-roles') {
        // await deleteUsers({ userIds: ids, status: data?.status }).unwrap();
        toast('success', 'Roles deleted successfully');
      }
      setLoading(false);
    } catch (error: any) {
      toast('error', error?.data?.message || 'Something went wrong');
      setLoading(false);
    }
  };
  return { handleRequest, loading };
};

export default useNetworkRequest;
