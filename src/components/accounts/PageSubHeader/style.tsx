import styled from 'styled-components';

import { px } from '@/utils';

export const PageSubHeaderContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.bgPrimary};
`;

export const Paragraph = styled.p`
  font-family: ${({ theme }) => theme.fontFamilies.heading};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.l};
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  line-height: ${px(28)};
  padding: ${px(16)};
  padding-bottom: ${px(24)};
`;

export const SearchSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SelectedPanel = styled.div`
  color: #211a00;
  background-color: ${({ theme }) => theme.colors.button};
  display: flex;
  align-items: center;
  padding: 0 ${px(16)};
  justify-content: space-between;
`;

export const SelectedCount = styled.p`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.m};
  line-height: ${px(18)};
`;

export const PanelList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PanelItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${px(16)};
  cursor: pointer;
  gap: ${px(8)};
`;

export const PanelText = styled.p`
  font-weight: 400;
  line-height: ${px(18)};
  font-size: ${({ theme }) => theme.fontSizes.m};
`;

export const PanelIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
