import React from 'react';
import Modal from '@/components/shared/Modal';
import { px } from '@/utils';
import styled from 'styled-components';

type IProps = {
  open?: boolean;
  toggleModal: () => void;
};

const EmailAlertModal = ({ open, toggleModal }: IProps) => {
  return (
    <ModalMobile
      buttonLabel="Close"
      heading="Email address: usman.yak@mail.com"
      open={open}
      toggleModal={toggleModal}
      secondaryButtonText=""
      buttonTriggerText=""
      extent="sm"
      buttonIcon={(props: any) => props}
    >
      <Container>
      <Content>
        <Title>Subject</Title>
        <Paragraph>
          COMP1502{' '}
        </Paragraph>
        </Content>
        <Content>
        <Title>Message</Title>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.{' '}
        </Paragraph>
        </Content>
        
      </Container>
    </ModalMobile>
  );
};

export default EmailAlertModal;
//TODO modify size
const ModalMobile = styled(Modal)`
  width: 320px !important; 
`;

const Container = styled.div`
  width: 100%;
`;

const Content = styled.div`
  margin-bottom: 2rem;
`

const Title = styled.p`
  font-family: ${({ theme }) => theme.fontFamilies.default};
  font-style: normal;
  font-weight: 400;
  font-size: ${px(18)};
  line-height: ${px(20)};
  margin-bottom:1rem;

  letter-spacing: 0.16px;
  text-align: left;

  color: ${({ theme }) => theme.colors.lightText};

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`
const Paragraph = styled.p`
  font-family: ${({ theme }) => theme.fontFamilies.default};
  font-style: normal;
  font-weight: 400;
  font-size: ${px(18)};
  line-height: ${px(20)};

  letter-spacing: 0.16px;
  text-align: left;

  color: ${({ theme }) => theme.colors.lightBackground};

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;
