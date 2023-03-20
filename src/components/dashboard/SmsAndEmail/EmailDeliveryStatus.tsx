import { GroupedBarChart } from '@carbon/charts-react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { IDashboardSmsEmailEmailDeliveryStatusColumnChart } from '@/interfaces/dashboard';
import { useGetDashboardSmsEmailEmailDeliveryStatusColumnChartQuery } from '@/redux/api';
import { getPollingInterval, px } from '@/utils';

interface IMappedData {
  group: string;
  key: string;
  value: number;
}

const EmailDeliveryStatus = () => {
  const [loading, setLoading] = useState(true);
  const { data: emailDeliveryData, isFetching: emailDeliveryDataFetching } = useGetDashboardSmsEmailEmailDeliveryStatusColumnChartQuery(undefined, {
    pollingInterval: getPollingInterval(),
  });
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (!emailDeliveryDataFetching) {
      setLoading(false);
    }
  }, [emailDeliveryDataFetching]);

  const getMembers = (members: IDashboardSmsEmailEmailDeliveryStatusColumnChart[]) => {
    let deliveryStatuses: IMappedData[] = [];
    members.map((m) => {
      if (m.deliveryStatuses && m.deliveryStatuses.length) {
        deliveryStatuses = [
          ...deliveryStatuses,
          m.deliveryStatuses.map((delivery) => {
            return {
              group: delivery.status,
              key: m.serviceType,
              value: delivery.totalCount,
            };
          }) as unknown as IMappedData,
        ];
      }
      return m;
    });

    return deliveryStatuses.flat();
  };

  useEffect(() => {
    if (emailDeliveryData?.data) setData(getMembers(emailDeliveryData?.data));
  }, [emailDeliveryData?.data]);

  const options: any = {
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
    },
    color: {
      scale: {
        Queue: '#DEA504',
        Sent: '#0258F0',
      },
    },
    data: {
      loading: loading || !emailDeliveryData?.data,
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

  return (
    <EmailDeliveryContainerBox>
      <EmailDeliveryHeader>
        <EmailDeliveryHeaderParagraph>Email delivery status</EmailDeliveryHeaderParagraph>
      </EmailDeliveryHeader>
      <StatusContainer>
        <BoxContainer>
          <Box value={'#DEA504'}></Box> Queue
        </BoxContainer>{' '}
        <BoxContainer>
          <Box value={'#0258F0'}></Box> Sent
        </BoxContainer>{' '}
      </StatusContainer>{' '}
      <ChartContainer>
        <GroupedBarChart data={data ?? []} options={options}></GroupedBarChart>
      </ChartContainer>
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
  height: ${px(250)};
  overflow: hidden;

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
