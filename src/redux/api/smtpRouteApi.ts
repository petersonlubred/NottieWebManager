import { BaseQueryFn, createApi, FetchArgs } from '@reduxjs/toolkit/query/react';
import { isEmpty } from 'lodash';

import { APIResponse } from '@/interfaces/auth';

import { SmtpRoute, SmtpRouteResponse, SmtpRouteResponsez } from './../../interfaces/configuration';
import { baseQueryWithReauth, createRequest, CustomError } from './shared';

export const smtpRouteApi = createApi({
  reducerPath: 'smtpRouteApi',
  baseQuery: baseQueryWithReauth as BaseQueryFn<string | FetchArgs, unknown, CustomError, Record<string, any>>,
  tagTypes: ['smtpRoute'],

  endpoints: (builder) => ({
    createSmtpRoute: builder.mutation<SmtpRouteResponse, Partial<SmtpRoute>>({
      query: (data) => {
        return {
          url: `SmtpServer/Route`,
          method: 'post',
          body: data,
        };
      },
      invalidatesTags: ['smtpRoute'],
    }),

    editSmtpRoute: builder.mutation<SmtpRouteResponse, Partial<SmtpRoute> & Pick<SmtpRoute, 'smtpRouteId'>>({
      query: (data) => {
        return {
          url: `SmtpServer/Route/${data.smtpRouteId}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: (_result, _error, { smtpRouteId }) => [{ type: 'smtpRoute', smtpRouteId }],
    }),

    deleteSmtpRoute: builder.mutation<APIResponse<object>, { smtpRouteId: string }>({
      query: ({ smtpRouteId }) => {
        return {
          url: `SmtpServer/Route/${smtpRouteId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (_result, _error, { smtpRouteId }) => [{ type: 'smtpRoute', smtpRouteId }],
    }),

    getSmtpRouteServers: builder.query<SmtpRouteResponsez, void>({
      query: () => createRequest('SmtpServer/Route'),
      providesTags: (result, _error, _arg) =>
        result?.data && !isEmpty(result?.data) ? [...result.data.map(({ smtpRouteId }: any) => ({ type: 'smtpRoute' as const, smtpRouteId })), 'smtpRoute'] : ['smtpRoute'],
    }),

    lookupSmtp: builder.query<SmtpRouteResponsez, void>({
      query: () => createRequest('Lookup/Smtp'),
      providesTags: (result, _error, _arg) =>
        result?.data && !isEmpty(result?.data) ? [...result.data.map(({ smtpRouteId }: any) => ({ type: 'smtpRoute' as const, smtpRouteId })), 'smtpRoute'] : ['smtpRoute'],
    }),
  }),
});

export const { useCreateSmtpRouteMutation, useGetSmtpRouteServersQuery, useLookupSmtpQuery, useEditSmtpRouteMutation, useDeleteSmtpRouteMutation } = smtpRouteApi;
