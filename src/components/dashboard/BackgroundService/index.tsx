import { Select, SelectItem, SelectSkeleton, SkeletonPlaceholder } from 'carbon-components-react';
import React, { useEffect, useState } from 'react';
// import { useInView } from 'react-cool-inview';
import styled from 'styled-components';

import {
  useGetDashboardServiceMicroservicesHeartbeatQuery,
  useGetDashboardServiceQueueMonitorQuery,
  useGetDashboardServiceSlaMessageQuery,
  useGetDashboardServiceSlaSourceDataQuery,
  useGetDatasourcesQuery,
} from '@/redux/api';
import { getPollingInterval, px } from '@/utils';

import MicroService from './MicroService';
import MicroServiceheader from './MicroServiceHeader';
import MicroServiceLoader from './MicroserviceLoader';
import QueueMonitor from './QueueMonitor';
import QueueTrend from './QueueTrend';
import Sla from './Sla';

const BackgroundService = () => {
  const [queueDataLoading, setQueueDataLoading] = useState(true);
  const [slaLoading, setSlaLoading] = useState(true);
  const [heartBeatLoading, setHeartBeatLoading] = useState(true);
  const [microServiceTotalHeartbeat, setMicroServiceTotalHeartbeat] = useState<{
    ok: number;
    check: number;
    critical: number;
    idle: number;
  }>();
  const [dataSourceId, setDataSourceId] = useState<string>('');
  const { data: dataSource, isFetching: fetchingDataSource } = useGetDatasourcesQuery(undefined, { pollingInterval: getPollingInterval() });
  const { data: queueData, isFetching: fetchingQueueDataSource } = useGetDashboardServiceQueueMonitorQuery(
    { dataSourceId: dataSourceId },
    { pollingInterval: getPollingInterval(), skip: !dataSourceId }
  );
  const { data: microServiceHeartBeat, isFetching: fetchingMicroService } = useGetDashboardServiceMicroservicesHeartbeatQuery(undefined, {
    pollingInterval: getPollingInterval(),
  });
  const { data: SlaMessage, isFetching: slaMessageFetching } = useGetDashboardServiceSlaMessageQuery(undefined, { pollingInterval: getPollingInterval() });
  const { data: SlaSource, isFetching: slaSourceFetching } = useGetDashboardServiceSlaSourceDataQuery(undefined, { pollingInterval: getPollingInterval() });
  const threeArray = new Array(3).fill(0);

  useEffect(() => {
    if (!fetchingDataSource && dataSource?.data) {
      setDataSourceId(dataSource?.data[0].dataSourceId);
    }
  }, [dataSource?.data, fetchingDataSource]);

  useEffect(() => {
    if (!fetchingMicroService && microServiceHeartBeat?.data) {
      setMicroServiceTotalHeartbeat(microServiceHeartBeat.data.totalHeartbeatCount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchingMicroService, microServiceHeartBeat]);

  useEffect(() => {
    if (!fetchingQueueDataSource) {
      setQueueDataLoading(false);
    }
  }, [fetchingQueueDataSource]);

  useEffect(() => {
    if (!slaMessageFetching && !slaSourceFetching) {
      setSlaLoading(false);
    }
  }, [slaMessageFetching, slaSourceFetching]);

  useEffect(() => {
    if (!fetchingMicroService) {
      setHeartBeatLoading(false);
    }
  }, [fetchingMicroService]);

  return (
    <>
      <DataSourceBox>
        <DataBoxParagraph>Data source:</DataBoxParagraph>
        <SelectContainer>
          {!dataSourceId ? (
            <SelectSkeleton />
          ) : (
            <Select
              id="select-1"
              labelText=""
              defaultValue={dataSourceId}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                setDataSourceId(event.target.value);
              }}
            >
              <SelectItem text="Choose option" value={''} />
              {dataSource?.data.map((item, index) => (
                <SelectItem key={index} text={item?.databaseName} value={item.dataSourceId} />
              ))}
            </Select>
          )}
        </SelectContainer>
      </DataSourceBox>
      {(queueDataLoading || !queueData?.data) && (
        <SkeletonContainer>
          <SkeletonPlaceholder />
          <SkeletonPlaceholder />
          <SkeletonPlaceholder />
          <SkeletonPlaceholder />
          <SkeletonPlaceholder />
          <SkeletonPlaceholder />
        </SkeletonContainer>
      )}
      <MonitorContainer>
        {!queueDataLoading && queueData?.data?.map((item, index) => <QueueMonitor heading={item.serviceType} key={index} data={item.queueMonitor} />)}
      </MonitorContainer>
      <MonitorContainer>
        {!queueDataLoading &&
          queueData?.data?.map((item, index) => <QueueTrend heading={item.serviceType} key={index} data={item.queueMonitor} isFetching={fetchingQueueDataSource} />)}
      </MonitorContainer>
      <MicroServiceContainer>
        <MicroServiceheader totalHeartbeatCount={microServiceTotalHeartbeat} />{' '}
        <MicroserviceFlex>
          <div>
            {microServiceHeartBeat?.data?.microservices.map((microservice, index: number) => (
              <ServiceContainer key={microservice.serviceType}>
                <MicroService
                  data={microservice}
                  showDivider={index !== microServiceHeartBeat?.data?.microservices.length - 1}
                  // innerRef={microService.length - 1 === microIndex && index === micro.microservices.length - 1 ? observe : null}
                />
              </ServiceContainer>
            ))}
          </div>
          {(heartBeatLoading || !microServiceHeartBeat?.data) && (
            <>
              <div>
                {threeArray.map((_, index) => (
                  <MicroServiceLoader key={index} showDivider={index !== threeArray.length - 1} />
                ))}
              </div>
              <div>
                {threeArray.map((_, index) => (
                  <MicroServiceLoader key={index} showDivider={index !== threeArray.length - 1} />
                ))}
              </div>
              <div>
                {threeArray.map((_, index) => (
                  <MicroServiceLoader key={index} showDivider={index !== threeArray.length - 1} />
                ))}
              </div>
              <div>
                {threeArray.map((_, index) => (
                  <MicroServiceLoader key={index} showDivider={index !== threeArray.length - 1} />
                ))}
              </div>
              <div>
                {threeArray.map((_, index) => (
                  <MicroServiceLoader key={index} showDivider={index !== threeArray.length - 1} />
                ))}
              </div>
            </>
          )}
        </MicroserviceFlex>
      </MicroServiceContainer>
      <ProgressStatusContainer>
        {!slaLoading && (SlaMessage?.data || SlaSource?.data) ? (
          <>
            {' '}
            <Sla heading="Sla Message Progress Status" data={SlaMessage?.data} />
            <Sla heading="Sla Source Progress Status" data={SlaSource?.data} />
          </>
        ) : (
          <>
            {' '}
            <SkeletonPlaceholder />
            <SkeletonPlaceholder />
          </>
        )}
      </ProgressStatusContainer>
    </>
  );
};

export default BackgroundService;

const DataSourceBox = styled.div`
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-top: ${px(-4)};
  margin-bottom: ${px(20)};
`;

const SelectContainer = styled.div`
  min-width: ${px(150)} !important;
  select {
    height: ${px(32)} !important;
  }
  svg {
    fill: ${({ theme }) => theme.colors.white};
  }
`;

const DataBoxParagraph = styled.p`
  font-size: ${px(14)};
  line-height: ${px(18)};
  margin-right: ${px(12)};
`;

const MonitorContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  color: ${({ theme }) => theme.colors.white};
  gap: ${px(16)};
  margin-bottom: ${px(16)};
`;
const ProgressStatusContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  color: ${({ theme }) => theme.colors.white};
  gap: ${px(16)};
  margin-bottom: ${px(16)};

  .cds--skeleton__placeholder {
    width: 100% !important;
    height: 25rem !important;
  }
`;

const MicroServiceContainer = styled.div`
  color: ${({ theme }) => theme.colors.white};
  padding: ${px(16)};
  margin-bottom: ${px(16)};
  background-color: ${({ theme }) => theme.colors.bgPrimary};
`;

const ServiceContainer = styled.div`
  max-width: fit-content;
`;

const MicroserviceFlex = styled.div`
  display: flex;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SkeletonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-gap: 1rem;

  .cds--skeleton__placeholder {
    width: 100% !important;
    height: 20rem !important;
  }
`;
