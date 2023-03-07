import { BaseQueryFn, createApi, FetchArgs } from '@reduxjs/toolkit/query/react';

import { IDashboardSmsEmailEmailDeliveryStatusColumnChartResponse, IDashboardSmsEmailMessageCount, IDashboardSmsEmailSmsDeliveryStatusBarChartResponse, IDashboardSmsEmailSmsOutboundSmcResponse, IDashboardSmsEmailSmsSmsNetworkCountDonutChartResponse } from './../../interfaces/dashboard';
import { baseQueryWithReauth, createRequest, CustomError } from './shared';

export const dashboardApi = createApi({
    reducerPath: 'dashboardApi',
    baseQuery: baseQueryWithReauth as BaseQueryFn<string | FetchArgs, unknown, CustomError, Record<string, any>>,
    endpoints: (builder) => ({
        getDashboardSmsEmailMessageCount: builder.query<IDashboardSmsEmailMessageCount, void>({
            query: () => createRequest('DashboardSmsEmail/MessageCount'),
            keepUnusedDataFor: 5,
        }),
        getDashboardSmsEmailSmsDeliveryStatusBarChart: builder.query<IDashboardSmsEmailSmsDeliveryStatusBarChartResponse, void>({
            query: () => createRequest('DashboardSmsEmail/SmsDeliveryStatus/BarChart'),
            keepUnusedDataFor: 5,
        }),
        getDashboardSmsEmailSmsNetworkCountDonutChart: builder.query<IDashboardSmsEmailSmsSmsNetworkCountDonutChartResponse, void>({
            query: () => createRequest('DashboardSmsEmail/SmsNetworkCount/DonutChart'),
            keepUnusedDataFor: 5,
        }),
        getDashboardSmsEmailOutboundSmc: builder.query<IDashboardSmsEmailSmsOutboundSmcResponse, void>({
            query: () => createRequest('DashboardSmsEmail/OutboundSmc'),
            keepUnusedDataFor: 5,
        }),
        getDashboardSmsEmailEmailDeliveryStatusColumnChart: builder.query<IDashboardSmsEmailEmailDeliveryStatusColumnChartResponse, void>({
            query: () => createRequest('DashboardSmsEmail/EmailDeliveryStatus/ColumnChart'),
            keepUnusedDataFor: 5,
        }),

    }),
});

export const { useGetDashboardSmsEmailEmailDeliveryStatusColumnChartQuery, useGetDashboardSmsEmailMessageCountQuery, useGetDashboardSmsEmailOutboundSmcQuery, useGetDashboardSmsEmailSmsDeliveryStatusBarChartQuery, useGetDashboardSmsEmailSmsNetworkCountDonutChartQuery, } = dashboardApi;
