import React from 'react';
import styled from 'styled-components';

import { px } from '@/utils';

const QueueMonitor = ({
  heading,
  data,
}: {
  heading: string;
  data?: {
    description: string;
    tpsformance: number;
    queueCountPerformance: number;
    queueCount: number;
    tps: number;
  }[];
}) => {
  return (
    <MonitorContainerBox>
      <MonitorHeader>
        <MonitorHeaderParagraph>{heading}</MonitorHeaderParagraph>
      </MonitorHeader>
      <MonitorContentBox>
        <MonitorSubHeader></MonitorSubHeader>
        <MonitorSubHeader>Queue</MonitorSubHeader>
        <MonitorSubHeader>TPS</MonitorSubHeader>
        <Divider></Divider>
        {data?.map((queueData, index) => (
          <React.Fragment key={index}>
            <MonitorSubHeaderTitle>
              <BoxContainer>
                <Box value={queueData.queueCount}></Box>
                <Box value={queueData.tps}></Box>
              </BoxContainer>
              {queueData.description}
            </MonitorSubHeaderTitle>
            <MonitorSubHeaderParagraph value={queueData.queueCount}>{queueData.queueCount}</MonitorSubHeaderParagraph>
            <MonitorSubHeaderParagraph value={queueData.tps}>{queueData.tps}</MonitorSubHeaderParagraph> <Divider></Divider>
          </React.Fragment>
        ))}
      </MonitorContentBox>
    </MonitorContainerBox>
  );
};

export default QueueMonitor;

const MonitorContainerBox = styled.div``;

const MonitorHeader = styled.div`
  padding: ${px(16)};
  background: ${({ theme }) => theme.colors.bgPrimary};
`;

const MonitorHeaderParagraph = styled.p`
  font-size: ${px(20)};
  line-height: ${px(28)};
  font-weight: 400;
`;
const MonitorContentBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const Divider = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  grid-column: 1/5;
`;

const MonitorSubHeaderTitle = styled.div`
  font-size: ${px(14)};
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  display: flex;
  align-items: center;
  line-height: ${px(18)};
  font-weight: 600;
  padding: ${px(16)};
  width: ${px(286)};
`;

type MonitorSubHeaderParagraphProps = {
  value: number;
};

const MonitorSubHeader = styled.p`
  font-size: ${px(14)};
  line-height: ${px(18)};
  font-weight: 600;
  padding: ${px(16)};
  text-align: right;
`;

const BoxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${px(3)};
  margin-right: ${px(13)};
`;

const Box = styled.div<MonitorSubHeaderParagraphProps>`
  width: ${px(16)};
  height: ${px(16)};
  background-color: ${({ value }) =>
    value < 100 ? '#FA4D56' : value < 200 ? '#FEC526' : value < 10000 ? '#42BE65' : value < 100000 ? '#FEC526' : value < 1000000 ? '#FA4D56' : '#42BE65'};
`;

const MonitorSubHeaderParagraph = styled.p<MonitorSubHeaderParagraphProps>`
  font-size: ${px(22)};
  text-align: right;
  line-height: ${px(18)};
  font-weight: 600;
  padding: ${px(16)};
  background-color: ${({ value }) =>
    value < 100 ? '#3B1A1A' : value < 200 ? '#232016' : value < 10000 ? '#171e19' : value < 100000 ? '#232016' : value < 1000000 ? '#3B1A1A' : '#171e19'};
  color: ${({ value }) => (value < 100 ? '#F39698' : value < 200 ? '#F1C21B' : value < 10000 ? '#37D263' : value < 100000 ? '#F1C21B' : value < 1000000 ? '#F39698' : '#37D263')};
`;
