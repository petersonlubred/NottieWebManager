import { DataTableSkeleton } from '@carbon/react';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import Icon from '@/components/shared/Icons';
import { IDashboardSmsEmailMessageCount } from '@/interfaces/dashboard';
import { useGetDashboardSmsEmailMessageCountQuery } from '@/redux/api/dashboardApi';
import { setLastSync } from '@/redux/slices/dashboard';
import { getPollingInterval, px } from '@/utils';

interface Iprops {
  navItem?: { title: string }[];
  handleSetIndex?: (_index: number) => void;
  title?: string;
  subtitle?: string;
  isDashboard?: boolean;
}

interface Ifigures {
  data: IDashboardSmsEmailMessageCount;
  key: string;
  index: number;
}

const PageHeader = ({ title, subtitle, isDashboard }: Iprops) => {
  const { data, isFetching } = useGetDashboardSmsEmailMessageCountQuery(undefined, { skip: !isDashboard, pollingInterval: getPollingInterval() });
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFetching) {
      dispatch(setLastSync(moment(new Date()).calendar().toString()));
    }
  }, [isFetching, dispatch]);

  const getFigure = ({ data, key, index }: Ifigures) => {
    return data?.data[index]?.messageTypes?.find((messageType) => messageType.description === key)?.totalCount || 0;
  };
  return (
    <HeaderContainer>
      <HeaderDashboardTitleBox>
        <HeaderTitle>{title}</HeaderTitle>
        <HeaderDescription>{subtitle}.</HeaderDescription>
      </HeaderDashboardTitleBox>
      {isDashboard && isFetching && <DataTableSkeleton showHeader={false} showToolbar={false} size="compact" rowCount={3} columnCount={6} />}
      {isDashboard && !isFetching && (
        <HeaderStatisticsSection>
          <HeaderStatisticsBox>
            <HeaderStatisticsTitle style={{ visibility: 'hidden' }}>Header</HeaderStatisticsTitle>
            {data?.data.map((header) => (
              <HeaderStatisticsTitle key={header.serviceType}>{header.serviceType}</HeaderStatisticsTitle>
            ))}
          </HeaderStatisticsBox>
          <HeaderStatisticsBox>
            <HeaderStatisticsValue>
              <Icon id="sms-icon" width={14} height={13} />
              SMS
            </HeaderStatisticsValue>
            <HeaderStatisticsValue>{getFigure({ data: data as IDashboardSmsEmailMessageCount, key: 'SMS', index: 0 })}</HeaderStatisticsValue>
            <HeaderStatisticsValue>{getFigure({ data: data as IDashboardSmsEmailMessageCount, key: 'SMS', index: 1 })}</HeaderStatisticsValue>
            <HeaderStatisticsValue>{getFigure({ data: data as IDashboardSmsEmailMessageCount, key: 'SMS', index: 2 })}</HeaderStatisticsValue>
          </HeaderStatisticsBox>
          <HeaderStatisticsBox>
            <HeaderStatisticsValue>
              <Icon id="mail-icon" width={14} height={10} />
              Email
            </HeaderStatisticsValue>
            <HeaderStatisticsValue>{getFigure({ data: data as IDashboardSmsEmailMessageCount, key: 'Email', index: 0 })}</HeaderStatisticsValue>
            <HeaderStatisticsValue>{getFigure({ data: data as IDashboardSmsEmailMessageCount, key: 'Email', index: 1 })}</HeaderStatisticsValue>
            <HeaderStatisticsValue>{getFigure({ data: data as IDashboardSmsEmailMessageCount, key: 'Email', index: 2 })}</HeaderStatisticsValue>
          </HeaderStatisticsBox>
          <HeaderStatisticsBox>
            <HeaderStatisticsValue>
              <Icon id="facebook-icon" width={12} height={12} />
              Facebook
            </HeaderStatisticsValue>
            <HeaderStatisticsValue>{getFigure({ data: data as IDashboardSmsEmailMessageCount, key: 'Facebook', index: 0 })}</HeaderStatisticsValue>
            <HeaderStatisticsValue>{getFigure({ data: data as IDashboardSmsEmailMessageCount, key: 'Facebook', index: 1 })}</HeaderStatisticsValue>
            <HeaderStatisticsValue>{getFigure({ data: data as IDashboardSmsEmailMessageCount, key: 'Facebook', index: 2 })}</HeaderStatisticsValue>
          </HeaderStatisticsBox>
          <HeaderStatisticsBox>
            <HeaderStatisticsValue>
              <Icon id="facebook-icon" width={12} height={10} />
              Twitter
            </HeaderStatisticsValue>
            <HeaderStatisticsValue>{getFigure({ data: data as IDashboardSmsEmailMessageCount, key: 'Twitter', index: 0 })}</HeaderStatisticsValue>
            <HeaderStatisticsValue>{getFigure({ data: data as IDashboardSmsEmailMessageCount, key: 'Twitter', index: 1 })}</HeaderStatisticsValue>
            <HeaderStatisticsValue>{getFigure({ data: data as IDashboardSmsEmailMessageCount, key: 'Twitter', index: 2 })}</HeaderStatisticsValue>
          </HeaderStatisticsBox>
          <HeaderStatisticsBox>
            <HeaderStatisticsValue>
              <Icon id="whatsapp-icon" width={13} height={13} />
              Whatsapp
            </HeaderStatisticsValue>
            <HeaderStatisticsValue>{getFigure({ data: data as IDashboardSmsEmailMessageCount, key: 'WhatsApp', index: 0 })}</HeaderStatisticsValue>
            <HeaderStatisticsValue>{getFigure({ data: data as IDashboardSmsEmailMessageCount, key: 'WhatsApp', index: 1 })}</HeaderStatisticsValue>
            <HeaderStatisticsValue>{getFigure({ data: data as IDashboardSmsEmailMessageCount, key: 'WhatsApp', index: 2 })}</HeaderStatisticsValue>
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
  gap: 2px;
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

const HeaderTitle = styled.div`
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
