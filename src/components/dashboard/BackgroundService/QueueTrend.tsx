import { ChartTheme, LineChartOptions, ScaleTypes } from '@carbon/charts/interfaces';
import { LineChart } from '@carbon/charts-react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { px } from '@/utils';

const socialItems = [
  {
    name: 'Transaction',
    color: '#FF73AD',
  },
  {
    name: 'OTP',
    color: '#2DA8FF',
  },
  {
    name: 'None-Transaction',
    color: '#D4BBFF',
  },
  {
    name: 'SMS',
    color: '#7F3AE7',
  },
  {
    name: 'Email',
    color: '#0258F0',
  },
  {
    name: 'FaceBook',
    color: '#F2B301',
  },
  {
    name: 'Twitter',
    color: '#00716F',
  },
  {
    name: 'WhatsApp',
    color: '#157532',
  },
];

const QueueTrend = ({
  heading,
  data,
  isFetching,
}: {
  heading: string;
  data: {
    description: string;
    tpsformance: number;
    queueCountPerformance: number;
    queueCount: number;
    tps: number;
  }[];
  isFetching: boolean;
}) => {
  const dataLength = data.length;

  const [lineData, setLineData] = useState<
    {
      group: string;
      value: number;
      date: any;
    }[]
  >([]);

  const options: LineChartOptions = {
    toolbar: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    resizable: true,
    color: {
      scale: {
        Transaction: '#FF73AD',
        OTP: '#2DA8FF',
        'None-Transaction': '#D4BBFF',
        SMS: '#7F3AE7',
        WhatsApp: '#157532',
        Email: '#0258F0',
        Twitter: '#00716F',
        FaceBook: '#F2B301',
      },
    },
    theme: ChartTheme.G100,
    grid: {
      x: {
        enabled: false,
      },
      y: {
        enabled: false,
      },
    },
    axes: {
      bottom: {
        mapsTo: 'date',
        scaleType: ScaleTypes.TIME,
      },
      left: {
        mapsTo: 'value',
        scaleType: ScaleTypes.LINEAR,
      },
    },
    timeScale: {
      showDayName: false,
    },
    curve: 'curveMonotoneX',
    height: '150px',
  };

  useEffect(() => {
    if (!isFetching) {
      const updatedData = [
        ...lineData,
        ...data.map((lineData) => {
          return {
            group: lineData.description,
            value: lineData.queueCount,
            date: moment(),
          };
        }),
      ];
      if (updatedData.length > dataLength * 5) {
        updatedData.splice(0, dataLength);
      }
      setLineData(updatedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  return (
    <MonitorContainerBox>
      <MonitorHeader>
        <MonitorHeaderParagraph>{heading} Trend</MonitorHeaderParagraph>
      </MonitorHeader>
      <MonitorContentBox>
        {data?.map((item, index) => (
          <MonitorSubHeaderTitle key={index}>
            <Box color={socialItems.find((social) => social.name === item.description)?.color ?? '#F2B301'}></Box>
            {item?.description}
          </MonitorSubHeaderTitle>
        ))}
        <GraphContainer>{lineData.length > 0 && <LineChart data={lineData} options={options} />}</GraphContainer>
      </MonitorContentBox>
    </MonitorContainerBox>
  );
};

export default QueueTrend;

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
  min-height: ${px(250)};
  max-height: ${px(250)};
  grid-template-columns: repeat(5, 1fr);
  padding: 0 ${px(16)};
  padding-bottom: ${px(16)};
  background: ${({ theme }) => theme.colors.bgPrimary};
`;

const GraphContainer = styled.div`
  grid-column: 1/6;
  margin: ${px(16)} 0;
  background: ${({ theme }) => theme.colors.bgPrimaryLight};
`;
const MonitorSubHeaderTitle = styled.div`
  font-size: ${px(13)};
  display: flex;
  min-height: ${px(50)};
  max-height: ${px(50)};
  align-items: center;
  line-height: ${px(18)};
`;

type BoxProps = {
  color: string;
};

const Box = styled.div<BoxProps>`
  width: ${px(24)};
  height: ${px(8)};
  background-color: ${({ color }) => color};
  margin-right: ${px(6)};
`;
