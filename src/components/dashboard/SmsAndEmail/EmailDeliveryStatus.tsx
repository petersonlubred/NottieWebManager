import { GroupedBarChartOptions } from '@carbon/charts/interfaces';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import { px } from '@/utils';

const EmailDeliveryStatus = () => {
  const chartRef = useRef<any>();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const { GroupedBarChart } = chartRef.current || {};

  useEffect(() => {
    chartRef.current = {
      GroupedBarChart: require('@carbon/charts-react').GroupedBarChart,
    };
  }, []);

  const [data, setData] = React.useState<any>([]);
  const [options, setOptions] = React.useState<any>({});

  const Data = useMemo(() => {
    return [
      {
        group: 'Successfully sent',
        key: 'Transaction',
        value: 65000,
      },
      {
        group: 'Successfully sent',
        key: 'Non-transaction',
        value: 29123,
      },
      {
        group: 'Successfully sent',
        key: 'OTP',
        value: 35213,
      },
      {
        group: 'Rejected/Error',
        key: 'Transaction',
        value: 32432,
      },
      {
        group: 'Rejected/Error',
        key: 'Non-transaction',
        value: 21312,
      },
      {
        group: 'Rejected/Error',
        key: 'OTP',
        value: 56456,
      },
    ];
  }, []);

  const Options: GroupedBarChartOptions = useMemo(() => {
    return {
      grid: {
        x: {
          enabled: false,
          stroke: '#E0E0E0',
        },
      },
      toolbar: {
        enabled: false,
      },
      axes: {
        left: {
          mapsTo: 'value',
        },
        bottom: {
          scaleType: 'labels',
          mapsTo: 'key',
        },
        data: {
          loading: true,
        },
      },
      color: {
        scale: {
          'Successfully sent': '#157532',
          'Rejected/Error': '#C51C24',
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
      bars: {
        maxWidth: 32,
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
        <EmailDeliveryHeaderParagraph>Email delivery status</EmailDeliveryHeaderParagraph>
      </EmailDeliveryHeader>
      <StatusContainer>
        <BoxContainer>
          <Box value={'#157532'}></Box> Successfully sent
        </BoxContainer>{' '}
        <BoxContainer>
          <Box value={'#C51C24'}></Box> Rejected/Error
        </BoxContainer>{' '}
      </StatusContainer>{' '}
      <ChartContainer>{isMounted && <GroupedBarChart data={data} options={options}></GroupedBarChart>}</ChartContainer>
    </EmailDeliveryContainerBox>
  );
};

export default EmailDeliveryStatus;

const EmailDeliveryContainerBox = styled.div`
  align-self: stretch;
  width: 50%;
  background-color: ${({ theme }) => theme.colors.bgPrimary};
`;

const EmailDeliveryHeader = styled.div`
  padding: ${px(16)};
  background: ${({ theme }) => theme.colors.bgPrimary};
  margin-bottom: ${px(8)};
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

const BoxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${px(3)};
  margin-right: ${px(13)};
  margin-left: ${px(24)};
  gap: ${px(6)};
`;

const Box = styled.div<{ value: string }>`
  width: ${px(12)};
  height: ${px(12)};
  background-color: ${({ value }) => value};
`;

const ChartContainer = styled.div`
  padding: ${px(16)};
  height: ${px(200)};
  overflow: hidden;

  .cds--cc--layout-column:nth-child(1) {
    display: none;
  }

  .cds--cc--grid rect.chart-grid-backdrop {
    fill: ${({ theme }) => theme.colors.bgPrimary};
    stroke: transparent;
  }
  .cds--cc--axes g.axis path.domain {
    stroke: none;
  }
  .cds--cc--grid g.x.grid g.tick line,
  .cds--cc--grid g.y.grid g.tick line {
    stroke: ${({ theme }) => theme.colors.bgPrimaryLight};
  }

  button {
    svg {
      fill: ${({ theme }) => theme.colors.white};
    }
    &:hover {
      background-color: ${({ theme }) => theme.colors.bgHover};
    }
  }

  text {
    fill: ${({ theme }) => theme.colors.white} !important;
  }
`;
