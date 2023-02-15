import { px } from '@/utils';
import React from 'react';
import styled from 'styled-components';

const tableItem = ['Transaction Count', 'Non-transaction Count', 'OTP count'];

const ProgressStatusTable = ({ heading }: { heading: string }) => {
  return (
    <MonitorContainerBox>
      <MonitorHeader>
        <MonitorHeaderParagraph>{heading}</MonitorHeaderParagraph>
      </MonitorHeader>
      <MonitorContentBox>
        <MonitorSubHeader></MonitorSubHeader>
        <MonitorSubHeader>00-10 sec</MonitorSubHeader>
        <MonitorSubHeader>11-30 sec</MonitorSubHeader>
        <MonitorSubHeader>30-60 sec</MonitorSubHeader>
        <MonitorSubHeader> &#62; 60 sec</MonitorSubHeader>
        <Divider></Divider>
        {tableItem?.map((item, index) => (
          <React.Fragment key={index}>
            <MonitorSubHeaderTitle>{item}</MonitorSubHeaderTitle>
            <MonitorSubHeaderParagraph>
              <MonitorSubHeaderValue>34,023</MonitorSubHeaderValue>
              <MonitorSubHeaderPercentage color={'secondaryLight'}>
                34%
              </MonitorSubHeaderPercentage>
            </MonitorSubHeaderParagraph>{' '}
            <MonitorSubHeaderParagraph>
              <MonitorSubHeaderValue> 50,232 </MonitorSubHeaderValue>
              <MonitorSubHeaderPercentage color={'dangerLight'}>
                34%
              </MonitorSubHeaderPercentage>
            </MonitorSubHeaderParagraph>{' '}
            <MonitorSubHeaderParagraph>
              <MonitorSubHeaderValue> 50,232 </MonitorSubHeaderValue>
              <MonitorSubHeaderPercentage color={'successLight'}>
                34%
              </MonitorSubHeaderPercentage>
            </MonitorSubHeaderParagraph>{' '}
            <MonitorSubHeaderParagraph>
              <MonitorSubHeaderValue> 50,232 </MonitorSubHeaderValue>
              <MonitorSubHeaderPercentage color={'primaryLight'}>
                34%
              </MonitorSubHeaderPercentage>
            </MonitorSubHeaderParagraph>
          </React.Fragment>
        ))}
        <Divider></Divider>{' '}
      </MonitorContentBox>
    </MonitorContainerBox>
  );
};

export default ProgressStatusTable;

const MonitorContainerBox = styled.div``;

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
