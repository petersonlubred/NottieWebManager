import { BaseQueryFn, createApi, FetchArgs } from '@reduxjs/toolkit/query/react';

import { EmailResponse, EmailResponses, IPageQuery, NonTransactionResponse, OtpResponse, SmsResponse, SmsResponses, TransactionResponse } from '@/interfaces/notification';

import { SingleEmailResponse, SingleSmsResponse } from './../../interfaces/notification';
import { baseQueryWithReauth, createRequestWithParams, CustomError } from './shared';

export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  tagTypes: ['alertProfile', 'alertNotification', 'alertException', 'alertExclusion', 'alertSubscription'],
  baseQuery: baseQueryWithReauth as BaseQueryFn<string | FetchArgs, unknown, CustomError, Record<string, any>>,

  endpoints: (builder) => ({
    getTransaction: builder.query<TransactionResponse, IPageQuery & { extraPath: string }>({
      query: ({ extraPath, ...rest }) => createRequestWithParams(`AlertNotification/Transaction/${extraPath}`, { ...rest }),
    }),
    getTransactionSMS: builder.query<SmsResponse, IPageQuery & { extraPath: string }>({
      query: ({ extraPath, ...rest }) => createRequestWithParams(`AlertNotification/Transaction/${extraPath}/Sms`, { ...rest }),
    }),
    getTransactionSMSById: builder.query<SmsResponses, IPageQuery & { extraPath: string }>({
      query: ({ extraPath, ...rest }) => createRequestWithParams(`AlertNotification/Transaction/${extraPath}`, { ...rest }),
    }),
    getTransactionEmail: builder.query<EmailResponse, IPageQuery & { extraPath: string }>({
      query: ({ extraPath, ...rest }) => createRequestWithParams(`AlertNotification/Transaction/${extraPath}/Email`, rest),
    }),
    getTransactionEmailById: builder.query<EmailResponses, IPageQuery & { extraPath: string }>({
      query: ({ extraPath, ...rest }) => createRequestWithParams(`AlertNotification/Transaction/${extraPath}`, { ...rest }),
    }),
    getSingleTransactionEmail: builder.query<SingleEmailResponse, IPageQuery & { extraPath: string }>({
      query: ({ extraPath, ...rest }) => createRequestWithParams(`AlertNotification/Transaction/${extraPath}`, { ...rest }),
    }),
    getSingleTransactionSMS: builder.query<SingleSmsResponse, IPageQuery & { extraPath: string }>({
      query: ({ extraPath, ...rest }) => createRequestWithParams(`AlertNotification/Transaction/${extraPath}`, { ...rest }),
    }),
    getNonTransaction: builder.query<NonTransactionResponse, IPageQuery & { extraPath: string }>({
      query: ({ extraPath, ...rest }) => createRequestWithParams(`AlertNotification/NoneTransaction/${extraPath}`, { ...rest }),
    }),
    getNonTransactionSMS: builder.query<SmsResponse, IPageQuery & { extraPath: string }>({
      query: ({ extraPath, ...rest }) => createRequestWithParams(`AlertNotification/NoneTransaction/${extraPath}/Sms`, { ...rest }),
    }),
    getNonTransactionSMSById: builder.query<SmsResponses, IPageQuery & { extraPath: string }>({
      query: ({ extraPath, ...rest }) => createRequestWithParams(`AlertNotification/NoneTransaction/${extraPath}`, { ...rest }),
    }),
    getNonTransactionEmail: builder.query<EmailResponse, IPageQuery & { extraPath: string }>({
      query: ({ extraPath, ...rest }) => createRequestWithParams(`AlertNotification/NoneTransaction/${extraPath}/Email`, { ...rest }),
    }),
    getNonTransactionEmailById: builder.query<EmailResponses, IPageQuery & { extraPath: string }>({
      query: ({ extraPath, ...rest }) => createRequestWithParams(`AlertNotification/NoneTransaction/${extraPath}`, { ...rest }),
    }),
    getSingleNonTransactionEmail: builder.query<SingleEmailResponse, IPageQuery & { extraPath: string }>({
      query: ({ extraPath, ...rest }) => createRequestWithParams(`AlertNotification/NoneTransaction/${extraPath}`, { ...rest }),
    }),
    getSingleNonTransactionSMS: builder.query<SingleSmsResponse, IPageQuery & { extraPath: string }>({
      query: ({ extraPath, ...rest }) => createRequestWithParams(`AlertNotification/NoneTransaction/${extraPath}`, { ...rest }),
    }),
    getOtp: builder.query<OtpResponse, IPageQuery & { extraPath: string }>({
      query: ({ extraPath, ...rest }) => createRequestWithParams(`AlertNotification/Otp/${extraPath}`, { ...rest }),
    }),
    getOtpSMS: builder.query<SmsResponse, IPageQuery & { extraPath: string }>({
      query: ({ extraPath, ...rest }) => createRequestWithParams(`AlertNotification/Otp/${extraPath}/Sms`, { ...rest }),
    }),
    getOtpSMSById: builder.query<SmsResponses, IPageQuery & { extraPath: string }>({
      query: ({ extraPath, ...rest }) => createRequestWithParams(`AlertNotification/Otp/${extraPath}`, { ...rest }),
    }),
    getOtpEmail: builder.query<EmailResponse, IPageQuery & { extraPath: string }>({
      query: ({ extraPath, ...rest }) => createRequestWithParams(`AlertNotification/Otp/${extraPath}/Email`, { ...rest }),
    }),
    getOtpEmailById: builder.query<EmailResponses, IPageQuery & { extraPath: string }>({
      query: ({ extraPath, ...rest }) => createRequestWithParams(`AlertNotification/Otp/${extraPath}`, { ...rest }),
    }),
    getSingleOtpEmail: builder.query<SingleEmailResponse, IPageQuery & { extraPath: string }>({
      query: ({ extraPath, ...rest }) => createRequestWithParams(`AlertNotification/Otp/${extraPath}`, { ...rest }),
    }),
    getSingleOtpSMS: builder.query<SingleSmsResponse, IPageQuery & { extraPath: string }>({
      query: ({ extraPath, ...rest }) => createRequestWithParams(`AlertNotification/Otp/${extraPath}`, { ...rest }),
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
  useGetTransactionEmailByIdQuery,
  useGetTransactionSMSByIdQuery,
  useGetSingleTransactionEmailQuery,
  useGetSingleTransactionSMSQuery,
  useGetSingleNonTransactionEmailQuery,
  useGetSingleNonTransactionSMSQuery,
  useGetSingleOtpEmailQuery,
  useGetSingleOtpSMSQuery,
  useGetNonTransactionEmailByIdQuery,
  useGetNonTransactionSMSByIdQuery,
  useGetOtpEmailByIdQuery,
  useGetOtpSMSByIdQuery,
} = notificationApi;
