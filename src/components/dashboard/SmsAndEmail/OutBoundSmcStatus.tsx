import React from 'react';
import styled from 'styled-components';

import { px } from '@/utils';

const tableItem = [
  { name: 'MTN', value: 287 },
  { name: 'Airtel', value: 123 },
  { name: 'Glo', value: 29 },
  { name: '9mobile', value: 162 },
];

const OutBoundSmcStatus = () => {
  return (
    <MonitorContainerBox>
      <MonitorHeader>
        <MonitorHeaderParagraph>Outbound SMSC status</MonitorHeaderParagraph>
      </MonitorHeader>
      <MonitorContentBox>
        <MonitorSubHeader>SMSC</MonitorSubHeader>
        <MonitorSubHeader>TX</MonitorSubHeader>
        <MonitorSubHeader>RX</MonitorSubHeader>
        <MonitorSubHeader>TXRX</MonitorSubHeader>
        <MonitorSubHeader style={{ textAlign: 'right' }}>TPS</MonitorSubHeader>
        <Divider></Divider>
        {tableItem?.map((item, index) => (
          <React.Fragment key={index}>
            <MonitorSubHeaderTitle>{item?.name}</MonitorSubHeaderTitle>
            <MonitorSubHeaderParagraph>
              <MonitorSubHeaderValue>50</MonitorSubHeaderValue>
            </MonitorSubHeaderParagraph>{' '}
            <MonitorSubHeaderParagraph>
              <MonitorSubHeaderValue> 50 </MonitorSubHeaderValue>
            </MonitorSubHeaderParagraph>{' '}
            <MonitorSubHeaderParagraph>
              <MonitorSubHeaderValue> 50 </MonitorSubHeaderValue>
            </MonitorSubHeaderParagraph>{' '}
            <MonitorSubHeaderTPSParagraph value={item?.value}>
              <MonitorSubHeaderTPSValue>
                {item?.value}{' '}
              </MonitorSubHeaderTPSValue>
            </MonitorSubHeaderTPSParagraph>
          </React.Fragment>
        ))}
        <Divider></Divider>{' '}
      </MonitorContentBox>
    </MonitorContainerBox>
  );
};

export default OutBoundSmcStatus;

const MonitorContainerBox = styled.div`
  width: 50%;
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
  background-color: ${({ theme }) => theme.colors.bgPrimary};
`;

const MonitorSubHeader = styled.div`
  font-size: ${px(14)};
  line-height: ${px(18)};
  font-weight: 600;
  padding: ${px(16)};
  text-align: left;
`;

const MonitorSubHeaderParagraph = styled.div`
  font-size: ${px(16)};
  text-align: left;
  line-height: ${px(18)};
  font-weight: 400;
  padding: ${px(16)};
  background-color: ${({ theme }) => theme.colors.bgPrimary};
`;

const MonitorSubHeaderTPSParagraph = styled.div<{ value: number }>`
  font-size: ${px(16)};
  text-align: left;
  line-height: ${px(18)};
  font-weight: 400;
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

const MonitorSubHeaderValue = styled.div``;

const MonitorSubHeaderTPSValue = styled.div`
  font-size: ${px(22)};
  text-align: right;
  line-height: ${px(18)};
  font-weight: 600;
`;
