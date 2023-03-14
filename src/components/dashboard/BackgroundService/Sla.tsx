import React from 'react';
import styled from 'styled-components';

import { IDashboardBackgroundServiceSla } from '@/interfaces/dashboard';
import { px } from '@/utils';

const Sla = ({ heading, data }: { heading: string; data?: IDashboardBackgroundServiceSla[] }) => {
  const getSlaStatus = ({ data, timeBound }: { data: IDashboardBackgroundServiceSla; timeBound: string }) => {
    return data.slaProgressStatuses.find((d) => d.timeBound.includes(timeBound));
  };
  return (
    <MonitorContainerBox>
      <MonitorHeader>
        <MonitorHeaderParagraph>{heading}</MonitorHeaderParagraph>
      </MonitorHeader>
      <MonitorContentBox>
        <MonitorSubHeader></MonitorSubHeader>
        <MonitorSubHeader>0-30 sec</MonitorSubHeader>
        <MonitorSubHeader>31-60 sec</MonitorSubHeader>
        <MonitorSubHeader>1-2 min</MonitorSubHeader>
        <MonitorSubHeader> &#62; 2 min</MonitorSubHeader>
        <Divider></Divider>
        {data?.map((item, index) => (
          <React.Fragment key={index}>
            <MonitorSubHeaderTitle>{item.serviceType}</MonitorSubHeaderTitle>
            <MonitorSubHeaderParagraph>
              <MonitorSubHeaderValue>{getSlaStatus({ data: item, timeBound: '0-30' })?.count ?? 0} </MonitorSubHeaderValue>
              <MonitorSubHeaderPercentage color={'secondaryLight'}>{getSlaStatus({ data: item, timeBound: '0-30' })?.percentage ?? 0}%</MonitorSubHeaderPercentage>
            </MonitorSubHeaderParagraph>{' '}
            <MonitorSubHeaderParagraph>
              <MonitorSubHeaderValue> {getSlaStatus({ data: item, timeBound: '31-60' })?.count ?? 0} </MonitorSubHeaderValue>
              <MonitorSubHeaderPercentage color={'dangerLight'}>{getSlaStatus({ data: item, timeBound: '31-60' })?.percentage ?? 0}%</MonitorSubHeaderPercentage>
            </MonitorSubHeaderParagraph>{' '}
            <MonitorSubHeaderParagraph>
              <MonitorSubHeaderValue> {getSlaStatus({ data: item, timeBound: '1-2' })?.count ?? 0}</MonitorSubHeaderValue>
              <MonitorSubHeaderPercentage color={'successLight'}>{getSlaStatus({ data: item, timeBound: '1-2' })?.percentage ?? 0}%</MonitorSubHeaderPercentage>
            </MonitorSubHeaderParagraph>{' '}
            <MonitorSubHeaderParagraph>
              <MonitorSubHeaderValue> {getSlaStatus({ data: item, timeBound: '2 min' })?.count ?? 0}</MonitorSubHeaderValue>
              <MonitorSubHeaderPercentage color={'primaryLight'}>{getSlaStatus({ data: item, timeBound: '2 min' })?.percentage ?? 0}%</MonitorSubHeaderPercentage>
            </MonitorSubHeaderParagraph>
          </React.Fragment>
        ))}
        <Divider></Divider>{' '}
      </MonitorContentBox>
    </MonitorContainerBox>
  );
};

export default Sla;

const MonitorContainerBox = styled.div`
  min-height: ${px(370)};
  max-height: ${px(370)};
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const MonitorHeader = styled.div`
  padding: ${px(16)};
  background: ${({ theme }) => theme.colors.bgPrimary};
`;

const MonitorHeaderParagraph = styled.div`
  font-size: ${px(20)};
  line-height: ${px(28)};
  font-weight: 400;
`;
const MonitorContentBox = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.slabackground};
`;

const Divider = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  grid-column: 1/6;
`;

const MonitorSubHeaderTitle = styled.div`
  font-size: ${px(16)};
  display: flex;
  align-items: center;
  line-height: ${px(18)};
  padding: ${px(16)};
`;

const MonitorSubHeader = styled.div`
  font-size: ${px(14)};
  line-height: ${px(18)};
  font-weight: 600;
  padding: ${px(16)};
  text-align: right;
`;

const MonitorSubHeaderParagraph = styled.div`
  font-size: ${px(16)};
  text-align: right;
  line-height: ${px(18)};
  font-weight: 400;
  padding: ${px(16)};
  background-color: ${({ theme }) => theme.colors.bgPrimary};
`;

const MonitorSubHeaderValue = styled.div`
  margin-bottom: ${px(14.5)};
`;
const MonitorSubHeaderPercentage = styled.p<{ color: string }>`
  font-size: ${px(14)};
  color: ${({ color, theme }) => theme.colors[color]};
`;
