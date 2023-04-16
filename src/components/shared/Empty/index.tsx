import React from 'react';
import styled from 'styled-components';

import { px } from '@/utils';

import Icon from '../Icons';

interface Iprops {
  title: string;
  text?: string;
}
const Empty = ({ title, text }: Iprops) => {
  return (
    <NoDataContainer>
      <Icon id="empty-drawer-icon" width={43} height={51} />
      <NoDataTitle>{title}</NoDataTitle>
      <NoDataText>{text}</NoDataText>
    </NoDataContainer>
  );
};

export default Empty;

const NoDataContainer = styled.div`
  padding: ${px(40)} 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkPrimary50};
`;

const NoDataTitle = styled.p`
  font-family: ${({ theme }) => theme.fontFamilies.heading};
  font-size: ${px(26)};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white};
  margin-top: ${px(29)};
  line-height: ${px(34)}
  margin-bottom: ${px(16)};
  width: ${px(383)};
  text-align:center;
`;

const NoDataText = styled.p`
  font-family: ${({ theme }) => theme.fontFamilies.heading};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.lightText};
`;
