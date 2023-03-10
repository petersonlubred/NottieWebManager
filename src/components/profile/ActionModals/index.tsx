import React, { useEffect } from 'react';

import Modal from '@/components/shared/Modal';
import SimpleModalcontent from '@/components/shared/SimpleModalContent/SimpleModalContent';
import { ISetState } from '@/interfaces/formik.type';

interface IProps {
  isLoading?: boolean;
  id?: string;
  action?: string;
  setAction: ISetState<string>;
  context?: string;
  handleAction: () => void;
  toggleModal: () => void;
}

const ActionModal = ({ isLoading, action, toggleModal, context, handleAction }: IProps) => {
  const [message, setMessage] = React.useState('');

  useEffect(() => {
    if (action === 'delete') {
      setMessage(
        `Are you sure you want to delete the ${
          (context === 'alert-profile' && 'profile') ||
          (context === 'exception' && 'exception') ||
          (context === 'exclude' && 'exclude') ||
          (context === 'subscription' && 'subscription')
        }(s)?`
      );
    }
  }, [action, context]);

  return (
    <>
      {/* Delete Account */}
      <Modal
        heading={'Confirm delete'}
        buttonLabel={'Delete'}
        danger={action === 'delete'}
        open={action === 'delete'}
        toggleModal={toggleModal}
        extent="sm"
        onRequestSubmit={handleAction}
      >
        <SimpleModalcontent content={message} isLoading={isLoading} />
      </Modal>
    </>
  );
};

export default ActionModal;
