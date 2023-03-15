import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { px } from '@/utils';

const indicatorData: any[] = [
  { title: 'Delivered', color: '#0E6027' },
  { title: 'Sent', color: '#0258F0' },
  { title: 'Queue', color: '#DEA504' },
  { title: 'Rejected', color: '#BA1B23' },
  { title: 'Pending', color: '#4C4C4C' },
];

const PercentageBar = ({
  data,
}: {
  data: {
    status: string;
    totalCount: number;
  }[];
}) => {
  const totalCount = data.reduce((accumulator, currentValue) => accumulator + currentValue.totalCount, 0);
  const [sortedData, setSortedData] = useState<
    {
      status: string;
      totalCount: number;
    }[]
  >([]);
  useEffect(() => {
    if (data) {
      const sortedArray: any[] = [];
      sortedArray[0] = data.find((status) => status.status === 'Delivered');
      sortedArray[1] = data.find((status) => status.status === 'Sent');
      sortedArray[2] = data.find((status) => status.status === 'Queue');
      sortedArray[3] = data.find((status) => status.status === 'Rejected');
      sortedArray[4] = data.find((status) => status.status === 'Pending');

      setSortedData(sortedArray);
    }
  }, [data]);

  const getBarPercentage = ({ status }: { status: string }) => {
    const statusCount = data.find((bar) => bar.status === status)?.totalCount ?? 0;
    return Number(((statusCount / totalCount) * 100).toFixed(1)) ?? 0;
  };

  return (
    <BarContainer>
      {sortedData?.map((stat) => (
        <>
          {getBarPercentage({ status: stat?.status }) > 0 && (
            <Bar key={stat.status} size={`${getBarPercentage({ status: stat.status })}%`} color={indicatorData.find((indicator) => indicator.title === stat.status).color}>
              {getBarPercentage({ status: stat.status })}%
            </Bar>
          )}
        </>
      ))}
    </BarContainer>
  );
};

export default PercentageBar;

const BarContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;
const Bar = styled.div<{ size?: string; color?: string }>`
  width: ${(props) => props.size};
  height: ${px(32)};
  text-align: left;
  background-color: ${(props) => props.color};
  padding-left: ${px(4)};
  padding-top: ${px(10)};
  color: ${({ theme }) => theme.colors.white};
`;
