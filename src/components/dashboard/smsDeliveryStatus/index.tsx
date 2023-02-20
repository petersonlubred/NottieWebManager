import React from 'react';
import PercentageBar from '../percentageBar';
import styled from 'styled-components';
import { px } from '@/utils';

const indicatorData: any[] = [
  { title: 'Delivered', color: '#0E6027' },
  { title: 'Pending', color: '#0258F0' },
  { title: 'Undelivered', color: '#DEA504' },
  { title: 'Rejected', color: '#BA1B23' },
  { title: 'Expired', color: '#4C4C4C' },
];

const SmsDeliveryContainer = () => {
  return (
    <Container>
      <Header>SMS delivery status</Header>
      <IndicatorContainer>
        {indicatorData.map((item: any, index) => (
          <IndicatorBox key={index}>
            <Indicator bgColor={item.color}></Indicator>
            <IndicatorTitle>{item.title}</IndicatorTitle>
          </IndicatorBox>
        ))}
      </IndicatorContainer>
      <PercentageBarContainer>
        <PercentageBox>
          <PercentageHeader>Transaction</PercentageHeader>
          <PercentageBar />
        </PercentageBox>
        <PercentageBox>
          <PercentageHeader>Non-transaction</PercentageHeader>
          <PercentageBar />
        </PercentageBox>
        <PercentageBox>
          <PercentageHeader>OTP</PercentageHeader>
          <PercentageBar />
        </PercentageBox>
      </PercentageBarContainer>
    </Container>
  );
};

export default SmsDeliveryContainer;

const Container = styled.div`
  height: ${px(185)};
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  margin-bottom: ${px(16)};
  flex: none;
  order: 0;
  flex-grow: 0;
  padding: ${px(16)};
`;

const Header = styled.p`
  font-family: ${({ theme }) => theme.fontFamilies.default};
  font-weight: 400;

  font-size: ${px(20)};
  line-height: ${px(28)};
  color: ${({ theme }) => theme.colors.lightBackground};

  margin-bottom: 22px;
`;

const IndicatorContainer = styled.div`
  display: flex;
  gap: ${px(24)};
  align-items: center;
  margin-bottom: ${px(24)};
`;

const IndicatorBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${px(6)};
`;

const Indicator = styled.div<{ bgColor?: string }>`
  width: ${px(23)};
  height: ${px(12)};
  background-color: ${(props) => props.bgColor};
`;

const IndicatorTitle = styled.span`
  font-family: ${({ theme }) => theme.fontFamilies.default};
  font-style: normal;
  font-weight: 400;
  font-size: ${px(12)};
  line-height: ${px(18)};

  letter-spacing: ${px(0.16)};

  color: ${({ theme }) => theme.colors.lightBackground};

  flex: none;
  order: 1;
  flex-grow: 0;
`;
const PercentageBarContainer = styled.div`
  display: flex;
  gap: ${px(48)};
  align-items: center;
  margin-bottom: ${px(18)};
`;

const PercentageBox = styled.div`
  width: 100%;
  padding: 0;
`;
const PercentageHeader = styled.p`
  font-family: ${({ theme }) => theme.fontFamilies.default};
  font-style: normal;
  font-weight: 600;
  font-size: ${px(14)};
  line-height: ${px(18)};
  margin-bottom: ${px(7)};

  letter-spacing: ${px(0.16)};
  text-align: left;

  color: ${({ theme }) => theme.colors.lightBackground};
`;
