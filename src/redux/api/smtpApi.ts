import { BaseQueryFn, createApi, FetchArgs } from '@reduxjs/toolkit/query/react';

import { APIResponse } from '@/interfaces/auth';
import { SmtpResponse } from '@/interfaces/configuration';

import { Ismtp, SmtpsResponse } from './../../interfaces/configuration';
import { baseQueryWithReauth, createRequest,CustomError } from './shared';

export const smtpApi = createApi({
  reducerPath: 'smtpApi',
  baseQuery: baseQueryWithReauth as BaseQueryFn<string | FetchArgs, unknown, CustomError, Record<string, any>>,
  tagTypes: ['smtp'],

  endpoints: (builder) => ({
    createSmtp: builder.mutation<SmtpResponse, Partial<Ismtp>>({
      query: (data) => {
        return {
          url: `SmtpServer`,
          method: 'post',
          body: data,
        };
      },
      invalidatesTags: ['smtp'],
    }),

    editSmtp: builder.mutation<SmtpResponse, Partial<Ismtp> & Pick<Ismtp, 'smtpId'>>({
      query: (data) => {
        return {
          url: `SmtpServer/${data.smtpId}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: (_result, _error, { smtpId }) => [{ type: 'smtp', smtpId }],
    }),

    deleteSmtp: builder.mutation<APIResponse<object>, { smtpId: string }>({
      query: ({ smtpId }) => {
        return {
          url: `SmtpServer/${smtpId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (_result, _error, { smtpId }) => [{ type: 'smtp', smtpId }],
    }),

    getSmtpservers: builder.query<SmtpsResponse, void>({
      query: () => createRequest('SmtpServer'),
      providesTags: (result, _error, _arg) => (result?.data ? [...result.data.map(({ smtpId }: any) => ({ type: 'smtp' as const, smtpId })), 'smtp'] : ['smtp']),
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

export const { useCreateSmtpMutation, useSendTestMailMutation, useGetSmtpserversQuery, useEditSmtpMutation, useDeleteSmtpMutation } = smtpApi;
