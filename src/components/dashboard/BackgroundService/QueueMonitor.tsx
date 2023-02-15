import { px } from '@/utils';
import React from 'react';
import styled from 'styled-components';

const QueueMonitor = ({ heading }: { heading: string }) => {
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
        <MonitorSubHeaderTitle>
          <BoxContainer>
            <Box value={2870232}></Box>
            <Box value={287}></Box>
          </BoxContainer>
          SMS
        </MonitorSubHeaderTitle>
        <MonitorSubHeaderParagraph value={2870232}>
          2,870,232
        </MonitorSubHeaderParagraph>
        <MonitorSubHeaderParagraph value={287}>287</MonitorSubHeaderParagraph>{' '}
        <Divider></Divider>{' '}
        <MonitorSubHeaderTitle>
          <BoxContainer>
            <Box value={129030}></Box>
            <Box value={123}></Box>
          </BoxContainer>
          Email
        </MonitorSubHeaderTitle>
        <MonitorSubHeaderParagraph value={129030}>
          129,030{' '}
        </MonitorSubHeaderParagraph>
        <MonitorSubHeaderParagraph value={123}>123</MonitorSubHeaderParagraph>{' '}
        <Divider></Divider>{' '}
        <MonitorSubHeaderTitle>
          <BoxContainer>
            <Box value={1287029}></Box>
            <Box value={29}></Box>
          </BoxContainer>
          Facebook
        </MonitorSubHeaderTitle>
        <MonitorSubHeaderParagraph value={1287029}>
          1,287,029{' '}
        </MonitorSubHeaderParagraph>
        <MonitorSubHeaderParagraph value={29}>29</MonitorSubHeaderParagraph>{' '}
        <Divider></Divider>{' '}
        <MonitorSubHeaderTitle>
          <BoxContainer>
            <Box value={10123}></Box>
            <Box value={6}></Box>
          </BoxContainer>
          Twitter
        </MonitorSubHeaderTitle>
        <MonitorSubHeaderParagraph value={10123}>
          10,123{' '}
        </MonitorSubHeaderParagraph>
        <MonitorSubHeaderParagraph value={6}>6</MonitorSubHeaderParagraph>{' '}
        <Divider></Divider>{' '}
        <MonitorSubHeaderTitle>
          {' '}
          <BoxContainer>
            <Box value={28914}></Box>
            <Box value={876}></Box>
          </BoxContainer>
          Whatsapp
        </MonitorSubHeaderTitle>
        <MonitorSubHeaderParagraph value={28914}>
          28,914{' '}
        </MonitorSubHeaderParagraph>
        <MonitorSubHeaderParagraph value={876}>876</MonitorSubHeaderParagraph>{' '}
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
    value < 100
      ? '#FA4D56'
      : value < 200
      ? '#FEC526'
      : value < 10000
      ? '#42BE65'
      : value < 100000
      ? '#FEC526'
      : value < 1000000
      ? '#FA4D56'
      : '#42BE65'};
`;

const MonitorSubHeaderParagraph = styled.p<MonitorSubHeaderParagraphProps>`
  font-size: ${px(22)};
  text-align: right;
  line-height: ${px(18)};
  font-weight: 600;
  padding: ${px(16)};
  background-color: ${({ value }) =>
    value < 100
      ? '#3B1A1A'
      : value < 200
      ? '#232016'
      : value < 10000
      ? '#171e19'
      : value < 100000
      ? '#232016'
      : value < 1000000
      ? '#3B1A1A'
      : '#171e19'};
  color: ${({ value }) =>
    value < 100
      ? '#F39698'
      : value < 200
      ? '#F1C21B'
      : value < 10000
      ? '#37D263'
      : value < 100000
      ? '#F1C21B'
      : value < 1000000
      ? '#F39698'
      : '#37D263'};
`;
