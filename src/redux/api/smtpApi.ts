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
  tagTypes: ['smtp'],
  endpoints: (builder) => ({
    createSmtp: builder.mutation({
      query: (data) => {
        return {
          url: `SmtpServer`,
          method: 'post',
          body: data,
        };
      },
      invalidatesTags: ['smtp'],
    }),

    editSmtp: builder.mutation({
      query: (data) => {
        return {
          url: `SmtpServer/${data.smtpId}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: (_result, _error, { smtpId }) => [
        { type: 'smtp', smtpId },
      ],
    }),

    deleteSmtp: builder.mutation({
      query: (id) => {
        return {
          url: `SmtpServer/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: 'smtp', id }],
    }),

    getSmtpserver: builder.query({
      query: () => createRequest('SmtpServer'),
      providesTags: ['smtp'],
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

export const {
  useCreateSmtpMutation,
  useSendTestMailMutation,
  useLazyGetSmtpserverQuery,
  useEditSmtpMutation,
  useDeleteSmtpMutation,
} = smtpApi;
