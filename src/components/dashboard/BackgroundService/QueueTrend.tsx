import React from 'react';
import styled from 'styled-components';

import { px } from '@/utils';

const socialItems = [
  {
    name: 'SMS',
    time: '3:00AM',
    color: '#7F3AE7',
  },
  {
    name: 'Email',
    time: '3:00AM',
    color: '#0258F0',
  },
  {
    name: 'Facebook',
    time: '3:00AM',
    color: '#F2B301',
  },
  {
    name: 'Twitter',
    time: '12:00AM',
    color: '#00716F',
  },
  {
    name: 'Whatsapp',
    time: '6:00AM',
    color: '#157532',
  },
];

const QueueTrend = ({ heading }: { heading: string }) => {
  return (
    <MonitorContainerBox>
      <MonitorHeader>
        <MonitorHeaderParagraph>{heading}</MonitorHeaderParagraph>
      </MonitorHeader>
      <MonitorContentBox>
        {socialItems?.map((item, index) => (
          <MonitorSubHeaderTitle key={index}>
            <Box color={item?.color}></Box>
            {item?.name}
          </MonitorSubHeaderTitle>
        ))}
        <GraphContainer></GraphContainer>
        {socialItems?.map((item, index) => (
          <MonitorSubHeaderTitle key={index}>{item?.time}</MonitorSubHeaderTitle>
        ))}
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
  grid-template-columns: repeat(5, 1fr);
  padding: 0 ${px(16)};
  padding-bottom: ${px(16)};
  background: ${({ theme }) => theme.colors.bgPrimary};
`;

const GraphContainer = styled.div`
  grid-column: 1/6;
  height: ${px(80)};
  margin: ${px(16)} 0;
  background: ${({ theme }) => theme.colors.bgPrimaryLight};
`;
const MonitorSubHeaderTitle = styled.div`
  font-size: ${px(13)};
  display: flex;
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
