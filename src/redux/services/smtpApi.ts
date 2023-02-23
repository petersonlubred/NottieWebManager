import { baseQueryWithReauth, CustomError, createRequest } from './shared';
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
} from '@reduxjs/toolkit/query/react';

export const smtpApi = createApi({
  reducerPath: 'smtpApi',
  baseQuery: baseQueryWithReauth as BaseQueryFn<
    string | FetchArgs,
    unknown,
    CustomError,
    Record<string, any>
  >,
  endpoints: (builder) => ({
    createSmtp: builder.mutation({
      query: (data) => {
        return {
          url: `SmtpServer`,
          method: 'post',
          body: data,
        };
      },
    }),
    sendTestMail: builder.mutation({
      query: (data) => {
        return {
          url: `SmtpServer/SendEmail`,
          method: 'post',
          body: data,
        };
      },
    }),
  }),
});

export const { useCreateSmtpMutation, useSendTestMailMutation } = smtpApi;
