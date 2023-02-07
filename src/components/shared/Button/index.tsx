import React from 'react';
import { Button as Btn } from '@carbon/react';
import styled from 'styled-components';

interface IProps {
  renderIcon: any;
  disabled?: boolean;
  handleClick?: () => void;
  buttonLabel?: string;
  fullWidth?: boolean;
  validateButton?: boolean;
}
const Button = ({
  renderIcon,
  disabled,
  handleClick,
  buttonLabel,
  fullWidth,
  validateButton,
}: IProps) => {
  return (
    <ButtonStyle
      renderIcon={renderIcon}
      disabled={disabled}
      onClick={handleClick}
      width={fullWidth}
      validateButton={validateButton}
    >
      {buttonLabel}
    </ButtonStyle>
  );
};

export default Button;

type ButtonProps = {
  width: boolean;
  disabled: boolean;
  validateButton?: boolean;
};

const ButtonStyle = styled(Btn)<ButtonProps>`
  max-width: 30rem;
  width: ${({ width }) => (width ? '100%' : 'auto')};
  color: ${({ disabled, validateButton }) =>
    validateButton && disabled
      ? 'white !important'
      : disabled
      ? '#6f6f6f !important'
      : '#161616 !important'};
  background-color: ${({ theme, disabled }) =>
    disabled ? '#525252 !important' : theme.colors.button};

  &:hover {
    color: ${({ disabled, validateButton }) =>
      validateButton && disabled
        ? 'white !important'
        : disabled
        ? '#6f6f6f !important'
        : '#161616 !important'};
    background-color: ${({ theme, disabled }) =>
      disabled ? '#525252 !important' : theme.colors.button};
  }
`;
