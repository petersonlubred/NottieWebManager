import { DataTableSkeleton } from 'carbon-components-react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useGetDashboardSmsEmailOutboundSmcQuery } from '@/redux/api';
import { getPollingInterval, px } from '@/utils';
import { mapPerformance } from '@/utils/helpers/helpers';

const OutBoundSmcStatus = () => {
  const [loading, setLoading] = useState(true);
  const { data, isFetching } = useGetDashboardSmsEmailOutboundSmcQuery(undefined, { pollingInterval: getPollingInterval() });

  useEffect(() => {
    if (!isFetching) {
      setLoading(false);
    }
  }, [isFetching]);

  return (
    <MonitorContainerBox>
      <MonitorHeader>
        <MonitorHeaderParagraph>Outbound SMSC status</MonitorHeaderParagraph>
      </MonitorHeader>
      <MonitorContentBox>
        <MonitorSubHeader>SMSC</MonitorSubHeader>
        <MonitorSubHeader>TX</MonitorSubHeader>
        <MonitorSubHeader>RX</MonitorSubHeader>
        <MonitorSubHeader>TXRX</MonitorSubHeader>
        <MonitorSubHeader style={{ textAlign: 'right' }}>TPS</MonitorSubHeader>
        <Divider></Divider>
        {!loading &&
          data?.data.map((item, index) => (
            <React.Fragment key={index}>
              <MonitorSubHeaderTitle>{item?.smscName}</MonitorSubHeaderTitle>
              <MonitorSubHeaderParagraph>
                <MonitorSubHeaderValue>{item?.tx}</MonitorSubHeaderValue>
              </MonitorSubHeaderParagraph>{' '}
              <MonitorSubHeaderParagraph>
                <MonitorSubHeaderValue>{item?.rx}</MonitorSubHeaderValue>
              </MonitorSubHeaderParagraph>{' '}
              <MonitorSubHeaderParagraph>
                <MonitorSubHeaderValue>{item?.txRx}</MonitorSubHeaderValue>
              </MonitorSubHeaderParagraph>{' '}
              <MonitorSubHeaderTPSParagraph value={Number(item?.tpsPerformance)}>
                <MonitorSubHeaderTPSValue>{item?.tps} </MonitorSubHeaderTPSValue>
              </MonitorSubHeaderTPSParagraph>
            </React.Fragment>
          ))}
        <Divider></Divider>
      </MonitorContentBox>
      {(loading || !data?.data) && <DataTableSkeleton showHeader={false} showToolbar={false} compact rowCount={4} columnCount={5} />}
    </MonitorContainerBox>
  );
};

export default OutBoundSmcStatus;

const MonitorContainerBox = styled.div`
  width: 50%;
`;

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
  background-color: ${({ theme }) => theme.colors.bgPrimary};
`;

const MonitorSubHeader = styled.div`
  font-size: ${px(14)};
  line-height: ${px(18)};
  font-weight: 600;
  padding: ${px(16)};
  text-align: left;
`;

const MonitorSubHeaderParagraph = styled.div`
  font-size: ${px(16)};
  text-align: left;
  line-height: ${px(18)};
  font-weight: 400;
  padding: ${px(16)};
  background-color: ${({ theme }) => theme.colors.bgPrimary};
`;

const MonitorSubHeaderTPSParagraph = styled.div<{ value: number }>`
  font-size: ${px(16)};
  text-align: left;
  line-height: ${px(18)};
  font-weight: 400;
  padding: ${px(16)};
  background-color: ${({ value }) => mapPerformance(value).background};
  color: ${({ value }) => mapPerformance(value).text};
`;

const MonitorSubHeaderValue = styled.div``;

const MonitorSubHeaderTPSValue = styled.div`
  font-size: ${px(22)};
  text-align: right;
  line-height: ${px(18)};
  font-weight: 600;
`;
