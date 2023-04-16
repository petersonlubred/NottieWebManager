import { Button as Btn } from 'carbon-components-react';
import React from 'react';
import styled from 'styled-components';

interface IProps {
  renderIcon: any;
  disabled?: boolean;
  handleClick?: () => void;
  buttonLabel?: string;
  fullWidth?: boolean;
  validateButton?: boolean;
  className?: string;
}
const Button = ({ renderIcon, disabled, handleClick, buttonLabel, fullWidth, validateButton, className }: IProps) => {
  return (
    <ButtonStyle width={fullWidth ? '100%' : 'auto'} valid={validateButton} disabled={disabled}>
      <Btn renderIcon={renderIcon} disabled={disabled} onClick={handleClick} className={className}>
        {buttonLabel}
      </Btn>
    </ButtonStyle>
  );
};

export default Button;

type ButtonProps = {
  width: string;
  disabled?: boolean;
  valid?: boolean;
};

const ButtonStyle = styled.div<ButtonProps>`
  button {
    max-width: 30rem;
    width: ${({ width }) => (width === '100%' ? '100%' : 'auto')};
    color: ${({ disabled, valid }) => (valid === true && disabled ? 'white !important' : disabled ? '#6f6f6f !important' : '#161616 !important')};
    background-color: ${({ theme, disabled }) => (disabled ? '#525252 !important' : theme.colors.button)};

    &:hover {
      color: ${({ disabled, valid }) => (valid === true && disabled ? 'white !important' : disabled ? '#6f6f6f !important' : '#161616 !important')};
      background-color: ${({ theme, disabled }) => (disabled ? '#525252 !important' : theme.colors.button)};
    }
  }
`;
