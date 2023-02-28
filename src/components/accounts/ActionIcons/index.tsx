import { Edit, Password, TrashCan, UserAdmin } from '@carbon/react/icons';
import { useRef, useState } from 'react';
import styled from 'styled-components';

import { IconBox } from '@/components/configuration/ActionIcons/Smtp';
import Modal from '@/components/shared/Modal';
import useNetworkRequest from '@/hooks/useNetworkRequest';
import { FormikRefType, ISetState } from '@/interfaces/formik.type';
import { useGetPrivilegesQuery } from '@/redux/api';
import { IinitialRoleForm, IinitialUserForm } from '@/schemas/interface';
import { px } from '@/utils';

import ActionModal from '../ActionModals';
import RolesAndProvileges from '../ModalForms/CreateRolesForm';
import CreateUserForm from '../ModalForms/CreateUserForm';

type Props = {
  data?: IinitialUserForm & { id: string; status: boolean };
  roleData?: IinitialRoleForm & { roleId: string };
  isUpdatedMultiselect?: boolean;
  setIsUpdatedMultiselect?: ISetState<boolean>;
};

const ActionIcons = ({ data, roleData, isUpdatedMultiselect, setIsUpdatedMultiselect }: Props) => {
  const formRef = useRef<FormikRefType<any>>(null);
  const { data: privileges, isFetching } = useGetPrivilegesQuery(roleData?.roleId as string);
  const [action, setAction] = useState('');
  const [context, setContext] = useState('');

  const toggleActionModal = () => {
    setAction('');
  };
  const { handleRequest, loading } = useNetworkRequest(toggleActionModal);

  const toggleModal = () => {
    formRef.current?.resetForm();
    setIsUpdatedMultiselect && setIsUpdatedMultiselect(false);
    if (!isUpdatedMultiselect) {
      setIsUpdatedMultiselect && setIsUpdatedMultiselect(true);
    }
    setAction('');
  };

  function handleSubmit() {
    formRef.current?.handleSubmit();
  }

  return (
    <NavSectionTwo>
      {(data?.status || roleData?.roleId) && (
        <IconBox
          onClick={() => {
            setAction('delete');
            setContext(roleData?.roleId ? 'role' : 'user');
          }}
        >
          <TrashCan size={20} />
        </IconBox>
      )}

      {!data?.status && data?.id && (
        <IconBox
          onClick={() => {
            setAction('activate');
            setContext('user');
          }}
        >
          <UserAdmin size={20} />
        </IconBox>
      )}

      {data?.id && (
        <IconBox
          onClick={() => {
            setAction('reset');
            setContext('user');
          }}
        >
          <Password size={20} />{' '}
        </IconBox>
      )}

      <IconBox
        onClick={() => {
          setAction('edit');
        }}
      >
        <Edit size={20} />
      </IconBox>

      <Modal
        heading={data?.id ? 'Edit User' : 'Edit Role'}
        buttonLabel="Save changes"
        extent="sm"
        open={action === 'edit'}
        toggleModal={toggleModal}
        onRequestSubmit={handleSubmit}
      >
        {data?.id ? (
          <CreateUserForm
            formRef={formRef}
            formdata={data}
            toggleModal={toggleModal}
            isUpdatedMultiselect={isUpdatedMultiselect}
            setIsUpdatedMultiselect={setIsUpdatedMultiselect}
          />
        ) : (
          <RolesAndProvileges formRef={formRef} formdata={roleData} toggleModal={toggleModal} data={privileges?.data} loadPrivileges={isFetching} />
        )}
      </Modal>
      <ActionModal
        action={action}
        isLoading={loading}
        id={data?.id}
        setAction={setAction}
        toggleModal={toggleActionModal}
        context={context}
        handleAction={() => {
          action === 'reset'
            ? handleRequest({ id: data?.id }, 'reset')
            : action === 'delete' && context === 'user'
            ? handleRequest({ id: data?.id, status: !data?.status }, 'delete-user')
            : action === 'delete' && context === 'role'
            ? handleRequest({ id: roleData?.roleId }, 'delete-role')
            : action === 'activate' && handleRequest({ id: data?.id, status: true }, 'activate-user');
        }}
      />
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
