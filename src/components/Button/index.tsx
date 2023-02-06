import React from 'react';
import { Button as Btn } from '@carbon/react';
import styled from 'styled-components';

interface IProps {
  renderIcon: any;
  disabled?: boolean;
  handleClick?: () => void;
  buttonLabel?: string;
  fullWidth?: boolean;
}
const Button = ({
  renderIcon,
  disabled,
  handleClick,
  buttonLabel,
  fullWidth,
}: IProps) => {
  return (
    <ButtonStyle
      renderIcon={renderIcon}
      disabled={disabled}
      onClick={handleClick}
      width={fullWidth}
    >
      {buttonLabel}
    </ButtonStyle>
  );
};

export default Button;

type ButtonProps = { width: boolean };

const ButtonStyle = styled(Btn)<ButtonProps>`
  max-width: 30rem;
  width: ${({ width }) => (width ? '100%' : 'auto')};
  background-color: ${({ theme }) => theme.colors.button};
  color: ${({ theme }) => theme.colors.black};
  &:hover {
    background-color: ${({ theme }) => theme.colors.normalText};
    color: ${({ theme }) => theme.colors.white};
  }
  svg {
    fill: ${({ theme }) => theme.colors.white} !important;
  }
`;
