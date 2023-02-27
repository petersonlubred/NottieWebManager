import { Modal as M } from '@carbon/react';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface Iprops {
  buttonLabel: string;
  heading: string;
  children: ReactNode;
  secondaryButtonText?: string;
  open?: boolean;
  danger?: boolean;
  extent?: string;
  toggleModal?: () => void;
  onRequestSubmit?: () => void;
}

const Modal = ({ buttonLabel, heading, children, secondaryButtonText = 'Close', open, danger, extent = 'md', toggleModal, onRequestSubmit }: Iprops) => {
  return (
    <ModalContainer
      modalHeading={heading}
      size={extent}
      primaryButtonText={buttonLabel}
      secondaryButtonText={secondaryButtonText}
      open={open}
      danger={danger}
      onRequestClose={toggleModal}
      onRequestSubmit={onRequestSubmit}
    >
      {children}
    </ModalContainer>
  );
};

export default Modal;

type ModalProps = { danger?: boolean };

export const ModalContainer = styled(M)<ModalProps>`
  & > div {
    background-color: ${({ theme }) => theme.colors.bgPrimary};
    // border-top: 1px solid ${({ theme }) => theme.colors.bgPrimaryLight};

    & > * > * {
      color: ${({ theme }) => theme.colors.white};
    }

    & > * > button {
      color: ${({ theme }) => theme.colors.bgPrimary};
    }

    & > div:first-child button {
      &:hover {
        background-color: ${({ theme }) => theme.colors.bgPrimaryLight};
      }
    }

    .cds--btn--danger {
      color: ${({ danger }) => danger && '#fff !important'};
    }
  }
  svg {
    fill: ${({ theme }) => theme.colors.white};
  }
`;
