import { DonutChartOptions } from '@carbon/charts/interfaces';
import { DonutChart } from '@carbon/charts-react';
import React from 'react';
import styled from 'styled-components';

import { px } from '@/utils';

const SmsDeliveryStatus = ({
  data,
  heading,
}: {
  data?: {
    network: string;
    count: number;
  }[];
  heading?: string;
}) => {
  const mappedData = data?.map((unmapped) => {
    return {
      group: unmapped.network,
      value: unmapped.count,
    };
  });
  const options: DonutChartOptions = {
    toolbar: {
      enabled: false,
    },
    resizable: true,
    donut: {
      center: {
        label: 'Total SMS',
      },
    },
    color: {
      scale: {
        MTN: '#F9444C',
        Airtel: '#00726E',
        '9mobile': '#2DA8FF',
        Glo: '#D4BBFF',
      },
    },
    data: {
      loading: data ? false : true,
    },
    height: '280px',
  };

  return (
    <EmailDeliveryContainerBox>
      <EmailDeliveryHeader>
        <EmailDeliveryHeaderParagraph>{heading}</EmailDeliveryHeaderParagraph>
      </EmailDeliveryHeader>
      <StatusContainer>
        <ChartContainer>
          {' '}
          <DonutChart data={mappedData ?? []} options={options}></DonutChart>
        </ChartContainer>
        <BoxContainerSection>
          <BoxContainer>
            <Box value="#F9444C" />
            MTN
          </BoxContainer>
          <BoxContainer>
            <Box value="#00726E" />
            Airtel
          </BoxContainer>
          <BoxContainer>
            <Box value="#2DA8FF" />
            9mobile
          </BoxContainer>
          <BoxContainer>
            <Box value="#D4BBFF" />
            Glo
          </BoxContainer>
        </BoxContainerSection>
      </StatusContainer>
    </EmailDeliveryContainerBox>
  );
};

export default SmsDeliveryStatus;

const EmailDeliveryContainerBox = styled.div`
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  padding-bottom: ${px(16)};
`;

const EmailDeliveryHeader = styled.div`
  padding: ${px(15)};
  padding-bottom: ${px(0)};
  background: ${({ theme }) => theme.colors.bgPrimary};
`;

const EmailDeliveryHeaderParagraph = styled.div`
  font-size: ${px(20)};
  line-height: ${px(28)};
  font-weight: 400;
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
`;

const BoxContainerSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${px(24)};
`;

const BoxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${px(6)};
`;

const Box = styled.div<{ value: string }>`
  width: ${px(12)};
  height: ${px(12)};
  background-color: ${({ value }) => value};
`;

const ChartContainer = styled.div`
  padding: ${px(16)};
  height: ${px(280)};
  overflow: hidden;
  text {
    fill: ${({ theme }) => theme.colors.white} !important;
  }
  text.donut-title {
    fill: ${({ theme }) => theme.colors.lightText} !important;
  }
`;
