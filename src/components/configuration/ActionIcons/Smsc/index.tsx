import { Checkbox, CheckboxChecked, Edit } from '@carbon/react/icons';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Modal from '@/components/shared/Modal';
import SimpleModalcontent from '@/components/shared/SimpleModalContent/SimpleModalContent';
import { useToast } from '@/context/ToastContext';
import { FormikRefType } from '@/interfaces/formik.type';
import { useEditSmscStatusMutation } from '@/redux/api';
import { IinitialSMSCForm } from '@/schemas/interface';
import { px } from '@/utils';

import SMSC from '../../ModalForms/SMSC';

type Props = {
  data: IinitialSMSCForm & { smscId: string };
};
type Prop = { status: string };

const ActionIconsSmsc = ({ data }: Props) => {
  const formRef = useRef<FormikRefType<any>>(null);
  const [edit, setEdit] = useState(false);
  const [opendeleteModal, setOpenDeleteModal] = useState(false);
  const { toast } = useToast();
  const [editSmscStatus, { isLoading, isSuccess, isError, error }] = useEditSmscStatusMutation();

  const toggleModal = () => {
    formRef.current?.resetForm();
    setEdit(!open);
  };

  const handleSubmit = () => {
    formRef.current?.handleSubmit();
  };

  useEffect(() => {
    if (isSuccess) {
      toast('success', 'Status changed');
      setOpenDeleteModal(!opendeleteModal);
    }
    if (isError && error && 'status' in error) {
      toast('error', error?.data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isError, isSuccess]);
  const changeStatus = () => {
    editSmscStatus({ smscId: data?.smscId, status: data?.status ? false : true });
  };

  return (
    <NavSectionTwo>
      <IconBox onClick={() => setOpenDeleteModal(!opendeleteModal)}>{data?.status ? <CheckboxChecked size={20} /> : <Checkbox size={20} />}</IconBox>
      <IconBox onClick={() => setEdit(!edit)}>
        <Edit size={20} />
      </IconBox>
      <Modal
        heading="Change status"
        buttonLabel="Change status"
        danger={true}
        open={opendeleteModal}
        toggleModal={() => setOpenDeleteModal(!opendeleteModal)}
        extent="sm"
        onRequestSubmit={changeStatus}
      >
        <SimpleModalcontent content="Are you sure you want to change STATUS ." isLoading={isLoading} />
      </Modal>
      <Modal heading="Edit SMSC" buttonLabel="Save changes" extent="sm" open={edit} toggleModal={toggleModal} onRequestSubmit={handleSubmit}>
        <SMSC formRef={formRef} formdata={data} toggleModal={toggleModal} />
      </Modal>
    </NavSectionTwo>
  );
};

export const StatusIcon = ({ status }: Prop) => {
  const bgColor: string = status === 'Active' ? '#42BE65' : '#DA1E28';

  return (
    <StatusBox>
      <StatusIndicator bgColor={bgColor}></StatusIndicator>
      <StatusText>{status}</StatusText>
    </StatusBox>
  );
};

export default ActionIconsSmsc;

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

const StatusBox = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const StatusIndicator = styled.div<{ bgColor: string }>`
  width: 10px;
  height: 10px;

  background-color: ${(props) => props.bgColor};
  border-radius: 50%;

  flex: none;
  order: 0;
  flex-grow: 0;
`;
const StatusText = styled.div`
  font-family: ${({ theme }) => theme.fontFamilies.default};
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;

  letter-spacing: 0.16px;

  color: ${({ theme }) => theme.colors.lightBackground};

  flex: none;
  order: 2;
  flex-grow: 0;
`;
