import React, { ReactElement, ReactNode } from 'react';
import { ModalWrapper } from '@carbon/react';
import styled from 'styled-components';

interface Iprops {
  buttonLabel: string;
  // eslint-disable-next-line no-unused-vars
  buttonIcon: (props: any) => ReactElement;
  heading: string;
  buttonTriggerText: string;
  children: ReactNode;
  secondaryButtonText?: string;
  open?: boolean;
  danger?: boolean;
  extent:string;
}

const Modal = ({
  buttonLabel,
  buttonIcon,
  heading,
  buttonTriggerText,
  children,
  secondaryButtonText = 'Close',
  open,
  danger,
  extent
}: Iprops) => {
  return (
    <ModalContainer
      buttonTriggerClassName="btn-primary"
      buttonTriggerText={buttonTriggerText}
      renderTriggerButtonIcon={buttonIcon}
      modalHeading={heading}
      size={extent}
      primaryButtonText={buttonLabel}
      secondaryButtonText={secondaryButtonText}
      open={open}
      danger={danger}
    >
      {children}
    </ModalContainer>
  );
};

export default Modal;

type ModalProps = { danger?: boolean };

export const ModalContainer = styled(ModalWrapper)<ModalProps>`
  & > div {
    background-color: ${({ theme }) => theme.colors.bgPrimary};
    border-top: 1px solid ${({ theme }) => theme.colors.bgPrimaryLight};

    & > * > * {
      color: ${({ theme }) => theme.colors.white};
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
