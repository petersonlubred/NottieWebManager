import { TrashCan, Password, Edit } from '@carbon/react/icons';
import styled from 'styled-components';
import SimpleModalcontent from '@/components/shared/SimpleModalContent/SimpleModalContent';
import ModalContent from '@/components/accounts/ModalContent';
import Modal from '@/components/shared/Modal';

const ActionIcons = () => {
  return (
    <NavSectionTwo>
      <Modal
        buttonTriggerText={''}
        buttonIcon={(props: any) => <TrashCan size={20} {...props} />}
        heading="Confirm delete"
        buttonLabel="Delete"
        secondaryButtonText="Cancel"
        danger={true}
        extent="sm"
      >
        <SimpleModalcontent content="This user will be sent a temporay password to their email address." />
      </Modal>
      <Modal
        buttonTriggerText={''}
        buttonIcon={(props: any) => <Password size={20} {...props} />}
        heading="Confirm password reset"
        buttonLabel="Reset Password"
        secondaryButtonText="Cancel"
        extent="sm"
      >
        <SimpleModalcontent content="Are you sure you want to delete this account?." />
      </Modal>

      <Modal
        buttonTriggerText={''}
        buttonIcon={(props: any) => <Edit size={20} {...props} />}
        heading="Edit User"
        buttonLabel="Save changes"
        extent="sm"
      >
        <ModalContent isEdit />
      </Modal>
    </NavSectionTwo>
  );
};

export default ActionIcons;

const NavSectionTwo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .btn-primary {
    background-color: transparent !important;
    color: ${(props) => props.theme.colors.white} !important;
    padding: calc(0.875rem - 3px) 36px calc(0.875rem - 3px) 15px !important;

    &:hover {
      background-color: ${(props) => props.theme.colors.bgHover} !important;
    }
  }
`;
