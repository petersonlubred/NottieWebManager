import { Edit, TrashCan } from '@carbon/react/icons';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Modal from '@/components/shared/Modal';
import SimpleModalcontent from '@/components/shared/SimpleModalContent/SimpleModalContent';
import { useToast } from '@/context/ToastContext';
import { FormikRefType } from '@/interfaces/formik.type';
import { useDeleteSmtpMutation } from '@/redux/api';
import { IinitialSMTPForm } from '@/schemas/interface';
import { px } from '@/utils';

import SMTP from '../../ModalForms/SMTP';

type Props = {
  data: IinitialSMTPForm & { smtpId: string };
};

const ActionIcons = ({ data }: Props) => {
  const formRef = useRef<FormikRefType<any>>(null);
  const [edit, setEdit] = useState(false);
  const [opendeleteModal, setOpenDeleteModal] = useState(false);
  const { toast } = useToast();
  const [deleteSmtp, { isLoading, isSuccess, isError, error }] = useDeleteSmtpMutation();

  const toggleModal = () => {
    formRef.current?.resetForm();
    setEdit(!open);
  };

  const handleSubmit = () => {
    formRef.current?.handleSubmit();
  };

  useEffect(() => {
    if (isSuccess) {
      toast('success', 'SMTP deleted successfully');
      setOpenDeleteModal(!opendeleteModal);
    }
    if (isError && error && 'status' in error) {
      toast('error', error?.data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isError, isSuccess]);

  const handleDelete = () => {
    deleteSmtp({ smtpId: data?.smtpId });
  };

  return (
    <NavSectionTwo>
      <IconBox onClick={() => setOpenDeleteModal(!opendeleteModal)}>
        <TrashCan size={20} />
      </IconBox>
      <IconBox onClick={() => setEdit(!edit)}>
        <Edit size={20} />
      </IconBox>
      <Modal
        heading="Confirm delete"
        buttonLabel="Delete"
        danger={true}
        open={opendeleteModal}
        toggleModal={() => setOpenDeleteModal(!opendeleteModal)}
        extent="sm"
        onRequestSubmit={handleDelete}
      >
        <SimpleModalcontent content="Are you sure you want to delete this SMTP." isLoading={isLoading} />
      </Modal>
      <Modal heading="Edit SMTP" buttonLabel="Save changes" extent="sm" open={edit} toggleModal={toggleModal} onRequestSubmit={handleSubmit}>
        <SMTP formRef={formRef} formdata={data} toggleModal={toggleModal} />
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

export const IconBox = styled.div`
  padding: ${px(12)};
  cursor: pointer;
`;
