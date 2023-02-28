import { BaseQueryFn, createApi, FetchArgs } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth, createRequest, CustomError } from './shared';

export const alertApi = createApi({
  reducerPath: 'alertApi',
  baseQuery: baseQueryWithReauth as BaseQueryFn<string | FetchArgs, unknown, CustomError, Record<string, any>>,
  endpoints: (builder) => ({
    getTransaction: builder.query<any, { start: Date; end: Date }>({
      query: ({ start, end }) => createRequest(`AlertNotification/Transaction/${start}/${end}`),
    }),
    getNonTransaction: builder.query<any, { start: Date; end: Date }>({
      query: ({ start, end }) => createRequest(`AlertNotification/NoneTransaction${start}/${end}`),
    }),
    getOtp: builder.query<any, { start: Date; end: Date }>({
      query: ({ start, end }) => createRequest(`AlertNotification/Otp/${start}/${end}`),
    }),
  }),
});

export const { useGetTransactionQuery } = alertApi;
