import { TrashCan, Password, Edit } from '@carbon/react/icons';
import styled from 'styled-components';
import SimpleModalcontent from '@/components/shared/SimpleModalContent/SimpleModalContent';
import ModalContent from '@/components/accounts/ModalContent';
import Modal from '@/components/shared/Modal';
import { IconBox } from '@/components/configuration/ActionIcons/Smtp';
import { FormikRefType } from '@/interfaces/formik.type';
import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/context/ToastContext';
import {
  useDeleteRoleMutation,
  useDeleteUserMutation,
  useGetPrivilegesQuery,
  useResendPasswordMutation,
} from '@/redux/services';
import { IinitialRoleForm, IinitialUserForm } from '@/interfaces/schema';
import RolesAndProvileges from '../ModalRolesAndPrivilages';
import { px } from '@/utils';

type Props = {
  data?: IinitialUserForm & { id: string };
  roleData?: IinitialRoleForm & { roleId: string };
};

const ActionIcons = ({ data, roleData }: Props) => {
  const formRef = useRef<FormikRefType<any>>(null);
  const [edit, setEdit] = useState(false);
  const { data: privileges, isFetching } = useGetPrivilegesQuery(
    roleData?.roleId
  );

  console.log(privileges, roleData?.roleId);

  const [opendeleteModal, setOpenDeleteModal] = useState(false);
  const [openResetPassword, setOpenResetPassword] = useState(false);
  const { toast } = useToast();
  const [deleteUser, { isLoading, isSuccess, isError, error }] =
    useDeleteUserMutation();
  const [
    deleteRole,
    {
      isLoading: isRoleLoading,
      isSuccess: isRoleSuccess,
      isError: isRoleError,
      error: roleError,
    },
  ] = useDeleteRoleMutation();
  const [
    sendResetPassword,
    {
      isLoading: isResetPasswordLoading,
      isSuccess: isResetPasswordSuccess,
      isError: isResetPasswordError,
      error: resetPasswordError,
    },
  ] = useResendPasswordMutation();

  const toggleModal = () => {
    formRef.current?.resetForm();
    setEdit(!open);
  };

  const handleSubmit = () => {
    formRef.current?.handleSubmit();
  };

  const handleDelete = () => {
    deleteUser(data?.id);
    deleteRole(roleData?.roleId);
  };
  useEffect(() => {
    if (isSuccess) {
      toast('success', 'User Account deleted successfully');
      setOpenDeleteModal(!opendeleteModal);
    }
    if (isError && error && 'status' in error) {
      toast('error', error?.data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isError, isSuccess]);

  useEffect(() => {
    if (isRoleSuccess) {
      toast('success', 'Role deleted successfully');
      setOpenDeleteModal(!opendeleteModal);
    }
    if (isRoleError && roleError && 'status' in roleError) {
      toast('error', roleError?.data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isError, isSuccess]);

  useEffect(() => {
    if (isResetPasswordSuccess) {
      toast('success', 'Password sent to the email successfully');
      setOpenDeleteModal(!opendeleteModal);
    }
    if (
      isResetPasswordError &&
      resetPasswordError &&
      'status' in resetPasswordError
    ) {
      toast('error', resetPasswordError?.data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isError, isSuccess]);

  return (
    <NavSectionTwo>
      <IconBox onClick={() => setOpenDeleteModal(!opendeleteModal)}>
        <TrashCan size={20} />
      </IconBox>
      {data?.id && (
        <IconBox>
          <Password size={20} />{' '}
        </IconBox>
      )}
      <IconBox onClick={() => setEdit(!edit)}>
        <Edit size={20} />{' '}
      </IconBox>

      <Modal
        buttonTriggerText={''}
        buttonIcon={TrashCan}
        heading="Confirm delete"
        buttonLabel="Delete"
        secondaryButtonText="Cancel"
        danger={true}
        open={opendeleteModal}
        toggleModal={() => setOpenDeleteModal(!opendeleteModal)}
        extent="sm"
        onRequestSubmit={handleDelete}
      >
        <SimpleModalcontent
          content={
            !data?.id
              ? 'Deleting this role means all the users they have been assigned to won’t have any role anymore.'
              : 'Are you sure you want to delete this account?'
          }
          isLoading={isLoading || isRoleLoading}
        />
      </Modal>
      <Modal
        buttonTriggerText={''}
        buttonIcon={(props: any) => <Password size={20} {...props} />}
        heading="Confirm password reset"
        buttonLabel="Reset Password"
        secondaryButtonText="Cancel"
        extent="sm"
      >
        <SimpleModalcontent
          content="This user will be sent a temporay password to their email address."
          isLoading={isResetPasswordLoading}
        />
      </Modal>

      <Modal
        buttonTriggerText={''}
        buttonIcon={Edit}
        heading={data?.id ? 'Edit User' : 'Edit Role'}
        buttonLabel="Save changes"
        extent="sm"
        open={edit}
        toggleModal={toggleModal}
        onRequestSubmit={handleSubmit}
      >
        {data?.id ? (
          <ModalContent
            formRef={formRef}
            formdata={data}
            toggleModal={toggleModal}
          />
        ) : (
          <RolesAndProvileges
            formRef={formRef}
            formdata={roleData}
            toggleModal={toggleModal}
            data={privileges?.data}
            loadPrivileges={isFetching}
          />
        )}
      </Modal>
    </NavSectionTwo>
  );
};

export default ActionIcons;

const NavSectionTwo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${px(12)};

  .btn-primary {
    background-color: transparent !important;
    color: ${(props) => props.theme.colors.white} !important;
    padding: calc(0.875rem - 3px) 33px calc(0.875rem - 3px) 15px !important;

    &:hover {
      background-color: ${(props) => props.theme.colors.bgHover} !important;
    }
  }
`;
