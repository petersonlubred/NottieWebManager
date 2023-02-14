import { px } from '@/utils';
import React from 'react';
import styled from 'styled-components';
import { Select, SelectItem } from '@carbon/react';
import QueueMonitor from '@/components/dashboard/QueueMonitor';
import QueueTrend from '@/components/dashboard/QueueTrend';
import MicroService from '@/components/dashboard/MicroService';
import MicroServiceheader from '@/components/dashboard/MicroServiceHeader';
import ProgressStatusTable from '@/components/dashboard/ProgressStatusTable';

const queueMonitors = [
  'OTP Queue monitor',
  'Transaction Queue monitor',
  'Non-transaction Queue monitor',
];
const queueTrends = [
  'OTP Queue & TPS trend',
  'Transaction Queue & TPS trend',
  'Non-transaction Queue & TPS trend',
];

const microservices = [
  'Transaction',
  'Transaction SMS',
  'Transaction Email',
  'Non-Transaction',
  'Non-Transaction SMS',
  'Non-Transaction Email',
  'OTP',
  'OTP-SMS',
  'OTP-Email',
];
const progressStatus = ['SLA progress status', 'SLA progress status'];
const BackgroundService = () => {
  return (
    <>
      <DataSourceBox>
        <DataBoxParagraph>Data source:</DataBoxParagraph>
        <SelectContainer>
          <Select id="select-1" labelText="">
            <SelectItem text="Choose option" />
            <SelectItem text="Option 1" value="option-1" />
            <SelectItem text="Option 2" value="option-2" />
          </Select>
        </SelectContainer>
      </DataSourceBox>
      <MonitorContainer>
        {queueMonitors?.map((item, index) => (
          <QueueMonitor heading={item} key={index} />
        ))}
      </MonitorContainer>
      <MonitorContainer>
        {queueTrends?.map((item, index) => (
          <QueueTrend heading={item} key={index} />
        ))}
      </MonitorContainer>
      <MicroServiceContainer>
        <MicroServiceheader />
        {microservices.slice(0, 3)?.map((item, index) => (
          <MicroService heading={item} key={index} />
        ))}
        <Divider></Divider>
        {microservices.slice(3, 6)?.map((item, index) => (
          <MicroService heading={item} key={index} />
        ))}{' '}
        <Divider></Divider>{' '}
        {microservices.slice(6, 9)?.map((item, index) => (
          <MicroService heading={item} key={index} />
        ))}{' '}
      </MicroServiceContainer>
      <ProgressStatusContainer>
        {progressStatus?.map((item, index) => (
          <ProgressStatusTable heading={item} key={index} />
        ))}
      </ProgressStatusContainer>
    </>
  );
};

export default BackgroundService;

const DataSourceBox = styled.div`
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-top: ${px(-4)};
  margin-bottom: ${px(20)};
`;

const SelectContainer = styled.div`
  select {
    height: ${px(32)} !important;
  }
  svg {
    fill: ${({ theme }) => theme.colors.white};
  }
`;

const DataBoxParagraph = styled.p`
  font-size: ${px(14)};
  line-height: ${px(18)};
`;

const MonitorContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  color: ${({ theme }) => theme.colors.white};
  gap: ${px(16)};
  margin-bottom: ${px(16)};
`;
const ProgressStatusContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  color: ${({ theme }) => theme.colors.white};
  gap: ${px(16)};
  margin-bottom: ${px(16)};
`;

const MicroServiceContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  color: ${({ theme }) => theme.colors.white};
  column-gap: ${px(16)};
  padding: ${px(16)};
  margin-bottom: ${px(16)};
  background-color: ${({ theme }) => theme.colors.bgPrimary};
`;

const Divider = styled.div`
  grid-column: 1 / 4;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  margin-bottom: ${px(16)};
`;
