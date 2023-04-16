import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { IDashboardSmsEmailSmsSmsNetworkCountDonutChart } from '@/interfaces/dashboard';
import { useGetDashboardSmsEmailSmsNetworkCountDonutChartQuery } from '@/redux/api';
import { getPollingInterval, px } from '@/utils';

import SmsDeliveryContainer from '../smsDeliveryStatus';
import EmailDeliveryStatus from './EmailDeliveryStatus';
import OutBoundSmcStatus from './OutBoundSmcStatus';
import SmsDeliveryStatus from './SMSDeliveryStatus';

const SmsandEmail = () => {
  const [loading, setLoading] = useState(true);
  const { data: smsDeliveryData, isFetching: smsDeliveryFetching } = useGetDashboardSmsEmailSmsNetworkCountDonutChartQuery(undefined, { pollingInterval: getPollingInterval() });

  useEffect(() => {
    if (!smsDeliveryFetching) {
      setLoading(false);
    }
  }, [smsDeliveryFetching]);
  return (
    <>
      <SmsDeliveryContainer />
      <DeliveryContainer>
        {!loading &&
          smsDeliveryData?.data?.map((item: IDashboardSmsEmailSmsSmsNetworkCountDonutChart, index: number) => (
            <SmsDeliveryStatus key={index} heading={item.serviceType} data={item.smsDelivery} />
          ))}{' '}
        {(loading || !smsDeliveryData?.data) && (
          <>
            <SmsDeliveryStatus />
            <SmsDeliveryStatus />
            <SmsDeliveryStatus />
          </>
        )}
      </DeliveryContainer>
      <ProgressStatusContainer>
        <OutBoundSmcStatus />
        <EmailDeliveryStatus />
      </ProgressStatusContainer>
    </>
  );
};

export default SmsandEmail;

const ProgressStatusContainer = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.white};
  gap: ${px(16)};
  margin-bottom: ${px(16)};
`;

const DeliveryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  color: ${({ theme }) => theme.colors.white};
  gap: ${px(16)};
  margin-bottom: ${px(16)};
  width: 100%;
`;
