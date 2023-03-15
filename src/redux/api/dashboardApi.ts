import { BaseQueryFn, createApi, FetchArgs } from '@reduxjs/toolkit/query/react';

import {
  DashboardSmsEmailMessageCountsResponse,
  IDashboardBackgroundServiceMicroserviceHeartBeatResponse,
  IDashboardBackgroundServicesResponse,
  IDashboardBackgroundServicesSlaResponse,
  IDashboardSmsEmailEmailDeliveryStatusColumnChartsResponse,
  IDashboardSmsEmailSmsDeliveryStatusBarChartsResponse,
  IDashboardSmsEmailSmsOutboundSmcsResponse,
  IDashboardSmsEmailSmsSmsNetworkCountDonutChartsResponse,
} from './../../interfaces/dashboard';
import { baseQueryWithReauth, createRequest, CustomError } from './shared';

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: baseQueryWithReauth as BaseQueryFn<string | FetchArgs, unknown, CustomError, Record<string, any>>,
  endpoints: (builder) => ({
    getDashboardSmsEmailMessageCount: builder.query<DashboardSmsEmailMessageCountsResponse, void>({
      query: () => createRequest('DashboardSmsEmail/MessageCount'),
      keepUnusedDataFor: 5,
    }),
    getDashboardSmsEmailSmsDeliveryStatusBarChart: builder.query<IDashboardSmsEmailSmsDeliveryStatusBarChartsResponse, void>({
      query: () => createRequest('DashboardSmsEmail/SmsDeliveryStatus/BarChart'),
      keepUnusedDataFor: 5,
    }),
    getDashboardSmsEmailSmsNetworkCountDonutChart: builder.query<IDashboardSmsEmailSmsSmsNetworkCountDonutChartsResponse, void>({
      query: () => createRequest('DashboardSmsEmail/SmsNetworkCount/DonutChart'),
      keepUnusedDataFor: 5,
    }),
    getDashboardSmsEmailOutboundSmc: builder.query<IDashboardSmsEmailSmsOutboundSmcsResponse, void>({
      query: () => createRequest('DashboardSmsEmail/OutboundSmsc'),
      keepUnusedDataFor: 5,
    }),
    getDashboardSmsEmailEmailDeliveryStatusColumnChart: builder.query<IDashboardSmsEmailEmailDeliveryStatusColumnChartsResponse, void>({
      query: () => createRequest('DashboardSmsEmail/EmailDeliveryStatus/ColumnChart'),
      keepUnusedDataFor: 5,
    }),
    getDashboardServiceQueueMonitor: builder.query<IDashboardBackgroundServicesResponse, { dataSourceId: string }>({
      query: ({ dataSourceId }) => createRequest(`DashboardService/QueueMonitorStatus/${dataSourceId}`),
      keepUnusedDataFor: 5,
    }),
    getDashboardServiceMicroservicesHeartbeat: builder.query<IDashboardBackgroundServiceMicroserviceHeartBeatResponse, void>({
      query: () => createRequest('DashboardService/MicroservicesHeartbeat'),
      keepUnusedDataFor: 5,
    }),
    getDashboardServiceSlaSourceData: builder.query<IDashboardBackgroundServicesSlaResponse, void>({
      query: () => createRequest('DashboardService/SlaSourceData'),
      keepUnusedDataFor: 5,
    }),
    getDashboardServiceSlaMessage: builder.query<IDashboardBackgroundServicesSlaResponse, void>({
      query: () => createRequest('DashboardService/SlaMessage'),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetDashboardSmsEmailEmailDeliveryStatusColumnChartQuery,
  useGetDashboardSmsEmailMessageCountQuery,
  useGetDashboardSmsEmailOutboundSmcQuery,
  useGetDashboardSmsEmailSmsDeliveryStatusBarChartQuery,
  useGetDashboardSmsEmailSmsNetworkCountDonutChartQuery,
  useGetDashboardServiceQueueMonitorQuery,
  useGetDashboardServiceMicroservicesHeartbeatQuery,
  useGetDashboardServiceSlaMessageQuery,
  useGetDashboardServiceSlaSourceDataQuery,
} = dashboardApi;
