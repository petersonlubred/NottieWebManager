import { px } from '@/utils';
import React from 'react';
import styled from 'styled-components';
import Icon from '../Icons';

const Logo = () => {
  return (
    <LogoBox>
      <Icon id="logo-icon" width={16} height={17} />
      <LogoText>nottie.net</LogoText>
    </LogoBox>
  );
};

export default Logo;

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 100%;
  margin-top: ${px(34)};
  cursor: pointer;
`;

const LogoText = styled.p`
  font-family: ${({ theme }) => theme.fontFamilies.heading};
  font-size: ${({ theme }) => theme.fontSizes.l};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white};
  margin: 0;
  ${({ theme }) => theme.media.md} {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
  ${({ theme }) => theme.media.lg} {
    font-size: ${({ theme }) => theme.fontSizes.xxl};
  }
`;
