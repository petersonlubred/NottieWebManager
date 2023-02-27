import { GroupedBarChartOptions } from '@carbon/charts/interfaces';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import { px } from '@/utils';

const SmsDeliveryStatus = ({ heading }: { heading: string }) => {
  const chartRef = useRef<any>();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const { DonutChart } = chartRef.current || {};

  useEffect(() => {
    chartRef.current = {
      DonutChart: require('@carbon/charts-react').DonutChart,
    };
  }, []);

  const [data, setData] = React.useState<any>([]);
  const [options, setOptions] = React.useState<any>({});

  const Data = useMemo(() => {
    return [
      {
        group: 'MTN',
        value: 65000,
      },
      {
        group: 'Airtel',
        value: 29123,
      },
      {
        group: '9Mobile',
        value: 35213,
      },
      {
        group: 'Glo',
        value: 32432,
      },
      {
        group: 'Others',
        value: 21312,
      },
    ];
  }, []);

  const Options: GroupedBarChartOptions = useMemo(() => {
    return {
      toolbar: {
        enabled: false,
      },

      color: {
        scale: {
          MTN: '#F9444C',
          Airtel: '#00726E',
          '9Mobile': '#2DA8FF',
          Glo: '#D4BBFF',
          Others: '#FF73AD',
        },
      },
      resizable: true,
      donut: {
        center: {
          label: 'Total SMS',
        },
      },
      height: '100%',
      width: '100%',
      legend: {
        enabled: false,
        position: 'top',
        truncation: {
          numCharacter: 150,
        },
      },
    };
  }, []);

  useEffect(() => {
    setData(Data);
    setOptions(Options);
  }, [Data, Options]);

  return (
    <EmailDeliveryContainerBox>
      <EmailDeliveryHeader>
        <EmailDeliveryHeaderParagraph>{heading} </EmailDeliveryHeaderParagraph>
      </EmailDeliveryHeader>
      <StatusContainer>
        <ChartContainer>
          {isMounted && <DonutChart data={data} options={options}></DonutChart>}
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
          <div>
            <Box value="#FF73AD" />
            Others
          </div>
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
  background: ${({ theme }) => theme.colors.bgPrimary};
`;

const EmailDeliveryHeaderParagraph = styled.div`
  font-size: ${px(20)};
  line-height: ${px(28)};
  font-weight: 400;
`;

const StatusContainer = styled.div`
  display: flex;
  gap: ${px(26)};
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
  .cds--cc--layout-column:nth-child(1) {
    display: none;
  }
  text {
    fill: ${({ theme }) => theme.colors.white} !important;
  }
  text.donut-title {
    fill: ${({ theme }) => theme.colors.lightText} !important;
  }
`;
