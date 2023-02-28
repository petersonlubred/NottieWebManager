import React from 'react';
import styled from 'styled-components';

import Icon from '@/components/shared/Icons';
import { px } from '@/utils';

interface Iprops {
  navItem?: { title: string }[];
  handleSetIndex?: (_index: number) => void;
  title?: string;
  subtitle?: string;
  isDashboard?: boolean;
}

const PageHeader = ({ title, subtitle, isDashboard }: Iprops) => {
  return (
    <HeaderContainer>
      <HeaderDashboardTitleBox>
        <HeaderTitle>{title}</HeaderTitle>
        <HeaderDescription>{subtitle}.</HeaderDescription>
      </HeaderDashboardTitleBox>
      {isDashboard && (
        <HeaderStatisticsSection>
          <HeaderStatisticsBox>
            <HeaderStatisticsTitle style={{ visibility: 'hidden' }}>Header</HeaderStatisticsTitle>
            <HeaderStatisticsTitle>OTP</HeaderStatisticsTitle>
            <HeaderStatisticsValue>Transaction</HeaderStatisticsValue>
            <HeaderStatisticsValue>Non-transaction</HeaderStatisticsValue>
          </HeaderStatisticsBox>
          <HeaderStatisticsBox>
            <HeaderStatisticsValue>
              <Icon id="sms-icon" width={14} height={13} />
              SMS
            </HeaderStatisticsValue>
            <HeaderStatisticsValue>1,200</HeaderStatisticsValue>
            <HeaderStatisticsValue>1,200</HeaderStatisticsValue>
            <HeaderStatisticsValue>1,200</HeaderStatisticsValue>
          </HeaderStatisticsBox>
          <HeaderStatisticsBox>
            <HeaderStatisticsValue>
              <Icon id="mail-icon" width={14} height={10} />
              Email
            </HeaderStatisticsValue>
            <HeaderStatisticsValue>1,200</HeaderStatisticsValue>
            <HeaderStatisticsValue>1,200</HeaderStatisticsValue>
            <HeaderStatisticsValue>1,200</HeaderStatisticsValue>
          </HeaderStatisticsBox>
          <HeaderStatisticsBox>
            <HeaderStatisticsValue>
              <Icon id="facebook-icon" width={12} height={12} />
              Facebook
            </HeaderStatisticsValue>
            <HeaderStatisticsValue>1,200</HeaderStatisticsValue>
            <HeaderStatisticsValue>1,200</HeaderStatisticsValue>
            <HeaderStatisticsValue>1,200</HeaderStatisticsValue>
          </HeaderStatisticsBox>
          <HeaderStatisticsBox>
            <HeaderStatisticsValue>
              <Icon id="facebook-icon" width={12} height={10} />
              Twitter
            </HeaderStatisticsValue>
            <HeaderStatisticsValue>1,200</HeaderStatisticsValue>
            <HeaderStatisticsValue>1,200</HeaderStatisticsValue>
            <HeaderStatisticsValue>1,200</HeaderStatisticsValue>
          </HeaderStatisticsBox>
          <HeaderStatisticsBox>
            <HeaderStatisticsValue>
              <Icon id="whatsapp-icon" width={13} height={13} />
              Whatsapp
            </HeaderStatisticsValue>
            <HeaderStatisticsValue>1,200</HeaderStatisticsValue>
            <HeaderStatisticsValue>1,200</HeaderStatisticsValue>
            <HeaderStatisticsValue>1,200</HeaderStatisticsValue>
          </HeaderStatisticsBox>
        </HeaderStatisticsSection>
      )}
    </HeaderContainer>
  );
};

export default PageHeader;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-left: ${px(24)};
  padding-right: ${px(24)};
  padding-top: ${px(21)};
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.bgPrimary};
`;

const HeaderStatisticsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: ${px(50)};
  text-align: right;

  & > div:first-child {
    text-align: left;
  }
`;

const HeaderStatisticsBox = styled.div`
  white-space: nowrap;
`;

const HeaderStatisticsTitle = styled.p`
  margin-bottom: ${px(10)};
  &:first-child {
    margin-bottom: ${px(21)};
  }
`;

const HeaderStatisticsValue = styled.p`
  margin-bottom: ${px(10)};

  &:first-child {
    margin-bottom: ${px(21)};
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.white};
    gap: ${px(3)};
  }
`;

const HeaderDashboardTitleBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  position: relative;
`;

const HeaderTitle = styled.h1`
  font-size: ${px(26)};
  line-height: ${px(34)};
  font-weight: 400;
  margin: 0;
  margin-bottom: ${px(16)};
`;

const HeaderDescription = styled.p`
  font-size: ${px(16)};
  line-height: ${px(24)};
  font-weight: 400;
  margin: 0;
  margin-bottom: ${px(36)};
  color: ${({ theme }) => theme.colors.lightText};
`;
