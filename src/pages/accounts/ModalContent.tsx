import RolesAndProvileges from '@/components/accounts/Forms/CreateRolesForm';
import CreateUserForm from '@/components/accounts/Forms/CreateUserForm';
import { FormikRefType } from '@/interfaces/formik.type';
import React from 'react';

interface Props {
  tab: number;
  formRef: React.RefObject<FormikRefType<any>>;
  toggleModal: () => void;
  isUpdatedMultiselect: boolean;
  setIsUpdatedMultiselect: Function;
}

const ModalContent = ({ tab, formRef, toggleModal, isUpdatedMultiselect, setIsUpdatedMultiselect }: Props) => {
  return tab === 0 ? (
    <CreateUserForm
      formRef={formRef}
      toggleModal={toggleModal}
      isUpdatedMultiselect={isUpdatedMultiselect}
      setIsUpdatedMultiselect={setIsUpdatedMultiselect}
    />
  ) : (
    <RolesAndProvileges formRef={formRef} toggleModal={toggleModal} />
  );
};

export default ModalContent;
