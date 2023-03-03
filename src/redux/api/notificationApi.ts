import { BaseQueryFn, createApi, FetchArgs } from '@reduxjs/toolkit/query/react';

import { IPageQuery } from '@/interfaces/notification';

import { TransactionResponse } from './../../interfaces/notification';
import { baseQueryWithReauth, createRequestWithParams, CustomError } from './shared';

export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  tagTypes: ['alertProfile', 'alertNotification', 'alertException', 'alertExclusion', 'alertSubscription'],
  baseQuery: baseQueryWithReauth as BaseQueryFn<string | FetchArgs, unknown, CustomError, Record<string, any>>,

  endpoints: (builder) => ({
    getTransaction: builder.query<TransactionResponse, IPageQuery & { extraPath: string }>({
      query: ({ extraPath, ...rest }) => createRequestWithParams(`AlertNotification/Transaction/${extraPath}`, { ...rest }),
    }),
    getTransactionSMS: builder.query<TransactionResponse, IPageQuery & { extraPath: string }>({
      query: ({ extraPath, ...rest }) => createRequestWithParams(`AlertNotification/Transaction/${extraPath}/Sms`, { ...rest }),
    }),
    getTransactionEmail: builder.query<TransactionResponse, IPageQuery & { extraPath: string }>({
      query: ({ extraPath, ...rest }) => createRequestWithParams(`AlertNotification/Transaction/${extraPath}/Email`, { ...rest }),
    }),
    getNonTransaction: builder.query<any, IPageQuery & { extraPath: string }>({
      query: ({ extraPath, ...rest }) => createRequestWithParams(`AlertNotification/NoneTransaction/${extraPath}`, { ...rest }),
    }),
    getNonTransactionSMS: builder.query<any, IPageQuery & { extraPath: string }>({
      query: ({ extraPath, ...rest }) => createRequestWithParams(`AlertNotification/NoneTransaction/${extraPath}/Sms`, { ...rest }),
    }),
    getNonTransactionEmail: builder.query<any, IPageQuery & { extraPath: string }>({
      query: ({ extraPath, ...rest }) => createRequestWithParams(`AlertNotification/NoneTransaction/${extraPath}/Email`, { ...rest }),
    }),
    getOtp: builder.query<any, IPageQuery & { extraPath: string }>({
      query: ({ extraPath, ...rest }) => createRequestWithParams(`AlertNotification/Otp/${extraPath}`, { ...rest }),
    }),
    getOtpSMS: builder.query<any, IPageQuery & { extraPath: string }>({
      query: ({ extraPath, ...rest }) => createRequestWithParams(`AlertNotification/Otp/${extraPath}/Sms`, { ...rest }),
    }),
    getOtpEmail: builder.query<any, IPageQuery & { extraPath: string }>({
      query: ({ extraPath, ...rest }) => createRequestWithParams(`AlertNotification/Otp/${extraPath}/Email`, { ...rest }),
    }),
  }),
});

export const {
  useGetTransactionQuery,
  useGetTransactionEmailQuery,
  useGetTransactionSMSQuery,
  useGetNonTransactionQuery,
  useGetOtpQuery,
  useGetNonTransactionEmailQuery,
  useGetNonTransactionSMSQuery,
  useGetOtpEmailQuery,
  useGetOtpSMSQuery,
} = notificationApi;
