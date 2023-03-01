import { Edit, TrashCan } from '@carbon/react/icons';
import { useRef, useState } from 'react';
import styled from 'styled-components';

import { IconBox } from '@/components/configuration/ActionIcons/Smtp';
import Modal from '@/components/shared/Modal';
import useNetworkRequest from '@/hooks/useNetworkRequest';
import { FormikRefType } from '@/interfaces/formik.type';
import { px } from '@/utils';

import ActionModal from '../ActionModals';
import ProfileModalContent from '../ProfileModalContent';
import ExcludeModalContent from '../ExcludeContent';
import ExceptionModalContent from '../ExceptionModalContent';
import SubscriptionModalContent from '../SubscriptionContent';

type Props = {
  data?: any;
  currentTab: string;
};

const ActionIcons = ({ data, currentTab }: Props) => {
  const formRef = useRef<FormikRefType<any>>(null);
  const [action, setAction] = useState('');

  const toggleActionModal = () => {
    setAction('');
  };
  const { handleRequest, loading } = useNetworkRequest(toggleActionModal);

  const toggleModal = () => {
    formRef.current?.resetForm();
    setAction('');
  };

  function handleSubmit() {
    formRef.current?.handleSubmit();
  }

  return (
    <NavSectionTwo>
      <IconBox
        onClick={() => {
          setAction('delete');
        }}
      >
        <TrashCan size={20} />
      </IconBox>

      <IconBox
        onClick={() => {
          setAction('edit');
        }}
      >
        <Edit size={20} />
      </IconBox>

      <Modal
        heading={`Edit Alert ${
          (currentTab === 'alert-profile' && 'Profile') ||
          (currentTab === 'exception' && 'Exception') ||
          (currentTab === 'exclude' && 'Exclude') ||
          (currentTab === 'subscription' && 'Subscription')
        }`}
        buttonLabel="Save changes"
        extent="sm"
        open={action === 'edit'}
        toggleModal={toggleModal}
        onRequestSubmit={handleSubmit}
      >
        {currentTab === 'alert-profile' && <ProfileModalContent formRef={formRef} formdata={data} toggleModal={toggleModal} />}
        {currentTab === 'exception' && <ExceptionModalContent formRef={formRef} formdata={data} toggleModal={toggleModal} />}
        {currentTab === 'exclude' && <ExcludeModalContent formRef={formRef} formdata={data} toggleModal={toggleModal} />}
        {currentTab === 'subscription' && <SubscriptionModalContent formRef={formRef} formdata={data} toggleModal={toggleModal} />}
      </Modal>
      <ActionModal
        action={action}
        isLoading={loading}
        id={data?.id}
        setAction={setAction}
        toggleModal={toggleActionModal}
        context={currentTab}
        handleAction={() => {
          action === 'delete' && currentTab === 'alert-profile' && handleRequest({ id: data?.alertProfileId }, 'delete-alert-profile');
          action === 'delete' && currentTab === 'exception' && handleRequest({ id: data?.alertExceptionId }, 'delete-exception');
          action === 'delete' && currentTab === 'exclude' && handleRequest({ id: data?.alertExcludeId }, 'delete-exclusion');
          action === 'delete' && currentTab === 'subscription' && handleRequest({ id: data?.alertSubscriptionId }, 'delete-subscription');
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
