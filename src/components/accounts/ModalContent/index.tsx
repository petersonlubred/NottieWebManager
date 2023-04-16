import React from 'react';

import RolesAndProvileges from '@/components/accounts/ModalForms/CreateRolesForm';
import CreateUserForm from '@/components/accounts/ModalForms/CreateUserForm';
import { FormikRefType, ISetState } from '@/interfaces/formik.type';

interface Props {
  tab: number;
  formRef: React.RefObject<FormikRefType<any>>;
  toggleModal: () => void;
  isUpdatedMultiselect: boolean;
  setIsUpdatedMultiselect: ISetState<boolean>;
}

const ModalContent = ({ tab, formRef, toggleModal, isUpdatedMultiselect, setIsUpdatedMultiselect }: Props) => {
  return tab === 0 ? (
    <CreateUserForm formRef={formRef} toggleModal={toggleModal} isUpdatedMultiselect={isUpdatedMultiselect} setIsUpdatedMultiselect={setIsUpdatedMultiselect} />
  ) : (
    <RolesAndProvileges formRef={formRef} toggleModal={toggleModal} />
  );
};

export default ModalContent;
