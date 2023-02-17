import React from 'react';
import Modal from '@/components/shared/Modal';
import { px } from '@/utils';
import styled from 'styled-components';

type IProps = {
  open?: boolean;
  toggleModal: () => void;
};

const MobileModal = ({ open, toggleModal }: IProps) => {
  return (
    <ModalMobileContainer>
    <Modal
      buttonLabel="Close"
      heading="Mobile: 08012371829"
      open={open}
      toggleModal={toggleModal}
      secondaryButtonText=""
      buttonTriggerText=""
      extent="sm"
      buttonIcon={(props: any) => props}
    >
      <Container>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.{' '}
        </Paragraph>
      </Container>
    </Modal>
    </ModalMobileContainer>
  );
};

export default MobileModal;
const ModalMobileContainer = styled.div`
  .cds--modal-container {
    width: 320px !important;
  }
`;

const Container = styled.div`
  width: 100%;
`;
const Paragraph = styled.p`
  font-family: ${({ theme }) => theme.fontFamilies.default};
  font-style: normal;
  font-weight: 400;
  font-size: ${px(14)};
  line-height: ${px(20)};

  letter-spacing: 0.16px;

  color: ${({ theme }) => theme.colors.lightBackground};

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;
