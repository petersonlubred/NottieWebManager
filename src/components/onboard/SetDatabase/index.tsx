import { IbmCloudDedicatedHost } from '@carbon/icons-react';
import React from 'react';
import styled from 'styled-components';

import { px } from '@/utils';

interface IProps {
  toggleLogin: () => void;
}

const SetDatabase = ({ toggleLogin }: IProps) => {
  return (
    <SetDatabaseBox onClick={toggleLogin}>
      <SetDatabaseText>Setup database</SetDatabaseText>
      <SetDatabaseIcon>
        <IbmCloudDedicatedHost />
      </SetDatabaseIcon>
    </SetDatabaseBox>
  );
};

export default SetDatabase;

const SetDatabaseBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: ${px(197)};
    height: ${px(48)}};
    cursor: pointer;
    padding: ${px(16)};
    background-color: ${({ theme }) => theme.colors.bgHover};
`;

const SetDatabaseText = styled.p`
  font-family: ${({ theme }) => theme.fontFamilies.heading};
  font-size: ${({ theme }) => theme.fontSizes.l};
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.m};
  color: ${({ theme }) => theme.colors.white};
  margin: 0;
  ${({ theme }) => theme.media.md} {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
  ${({ theme }) => theme.media.lg} {
    font-size: ${({ theme }) => theme.fontSizes.xxl};
  }
`;

const SetDatabaseIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${px(20)};
  height: ${px(20)};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};
`;
