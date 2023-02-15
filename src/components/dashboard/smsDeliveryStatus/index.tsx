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
      <ContentContainer>
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
      </ContentContainer>
    </Container>
  );
};

export default SmsDeliveryContainer;

const Container = styled.div`
  width: ${px(1468)};
  height: ${px(185)};
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  width: 95%;
  margin: auto;

  flex: none;
  order: 0;
  flex-grow: 0;
`;

const ContentContainer = styled.div`
  padding: 1rem;
  padding-left: 2.6rem;
  width: 100%;
  margin: auto;

`;

const Header = styled.p`
  font-family: ${({ theme }) => theme.fontFamilies.default};
  font-weight: 400;
  font-size: ${px(20)};
  line-height: ${px(28)};
  color: ${({ theme }) => theme.colors.lightBackground};

  margin-bottom: 2rem;
`;

const IndicatorContainer = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const IndicatorBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
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

  letter-spacing: 0.16px;

  color: ${({ theme }) => theme.colors.lightBackground};

  flex: none;
  order: 1;
  flex-grow: 0;
`;
const PercentageBarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PercentageBox = styled.div`
  width: 100%;
`;
const PercentageHeader = styled.p`
  font-family: ${({ theme }) => theme.fontFamilies.default};
  font-style: normal;
  font-weight: 600;
  font-size: ${px(14)};
  line-height: ${px(18)};
  margin-bottom: 8px;

  letter-spacing: 0.16px;
  text-align: left;

  color: ${({ theme }) => theme.colors.lightBackground};
`;
