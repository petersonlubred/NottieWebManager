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
}

const ActionModal = ({ isLoading, action, setAction, context, handleAction }: IProps) => {
  const [message, setMessage] = React.useState('');

  const toggleModal = () => {
    setAction('');
  };

  useEffect(() => {
    if (action === 'delete') {
      if (context === 'user') {
        setMessage('Are you sure you want to  deactivate the account(s)?');
      } else if (context === 'role') {
        setMessage('Deleting the role(s) means all the users they have been assigned to won’t have any role anymore.');
      }
    } else if (action === 'activate') {
      setMessage('Are you sure you want to activate the account(s)?');
    } else if (action === 'reset') {
      setMessage('This user(s) will be sent a temporay password to their email address.');
    }
  }, [action, context]);

  return (
    <>
      {/* Delete Account */}
      <Modal
        heading={'Confirm delete'}
        buttonLabel={'Delete'}
        secondaryButtonText="Cancel"
        danger={action === 'delete'}
        open={action === 'delete'}
        toggleModal={toggleModal}
        extent="sm"
        onRequestSubmit={handleAction}
      >
        <SimpleModalcontent content={message} isLoading={isLoading} />
      </Modal>

      {/* Activate Account */}
      <Modal
        heading="Confirm activation"
        buttonLabel={'Activate'}
        secondaryButtonText="Cancel"
        open={action === 'activate'}
        toggleModal={toggleModal}
        extent="sm"
        onRequestSubmit={handleAction}
      >
        <SimpleModalcontent content={message} isLoading={isLoading} />
      </Modal>

      {/* Reset Password */}
      <Modal
        heading="Confirm password reset"
        buttonLabel="Reset Password"
        secondaryButtonText="Cancel"
        extent="sm"
        open={action === 'reset'}
        toggleModal={toggleModal}
        onRequestSubmit={handleAction}
      >
        <SimpleModalcontent content={message} isLoading={isLoading} />
      </Modal>
    </>
  );
};

export default ActionModal;
