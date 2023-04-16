import { BaseQueryFn, createApi, FetchArgs } from '@reduxjs/toolkit/query/react';
import { isEmpty } from 'lodash';

import { APIResponse } from '@/interfaces/auth';
import { SmscRouteConfigResponse } from '@/interfaces/configuration';

import { SmscRouteConfig, SmscRouteConfigResponsez } from './../../interfaces/configuration';
import { baseQueryWithReauth, createRequest, CustomError } from './shared';

export const smscRouteConfigApi = createApi({
  reducerPath: 'smscRouteConfig',
  baseQuery: baseQueryWithReauth as BaseQueryFn<string | FetchArgs, unknown, CustomError, Record<string, any>>,
  tagTypes: ['smscRouteConfig'],

  endpoints: (builder) => ({
    getSmscRouteConfig: builder.query<SmscRouteConfigResponsez, void>({
      query: () => createRequest('Smsc/Route/Config'),
      providesTags: (result, _error, _arg) =>
        result?.data && !isEmpty(result?.data) ? [...result.data.map(({ smscId }: any) => ({ type: 'smscRouteConfig' as const, smscId })), 'smscRouteConfig'] : ['smscRouteConfig'],
    }),

    createSmscRouteConfig: builder.mutation<APIResponse<object>, Partial<SmscRouteConfig>>({
      query: (data) => {
        return {
          url: `Smsc/Route/Config`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['smscRouteConfig'],
    }),

    editSmscRouteConfig: builder.mutation<SmscRouteConfigResponse, { smscRouteConfigId: string }>({
      query: (data) => {
        return {
          url: `Smsc/Route/Config/${data.smscRouteConfigId}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: (_result, _error, { smscRouteConfigId }) => [{ type: 'smscRouteConfig', smscRouteConfigId }],
    }),

    deleteSmscRouteConfig: builder.mutation<APIResponse<object>, { smscRouteConfigId: string }>({
      query: ({ smscRouteConfigId }) => {
        return {
          url: `Smsc/Route/Config/${smscRouteConfigId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (_result, _error, { smscRouteConfigId }) => [{ type: 'smscRouteConfig', smscRouteConfigId }],
    }),

    lookupRouteType: builder.query<SmscRouteConfigResponsez, void>({
      query: () => createRequest('Lookup/RouteType'),
      providesTags: (result, _error, _arg) =>
        result?.data && !isEmpty(result?.data) ? [...result.data.map(({ smscId }: any) => ({ type: 'smscRouteConfig' as const, smscId })), 'smscRouteConfig'] : ['smscRouteConfig'],
    }),

    lookupCountry: builder.query<SmscRouteConfigResponsez, void>({
      query: () => createRequest('Lookup/Country'),
      providesTags: (result, _error, _arg) =>
        result?.data && !isEmpty(result?.data) ? [...result.data.map(({ smscId }: any) => ({ type: 'smscRouteConfig' as const, smscId })), 'smscRouteConfig'] : ['smscRouteConfig'],
    }),

    lookupAccountType: builder.query<SmscRouteConfigResponsez, void>({
      query: () => createRequest('Lookup/AccountType'),
      providesTags: (result, _error, _arg) =>
        result?.data && !isEmpty(result?.data) ? [...result.data.map(({ smscId }: any) => ({ type: 'smscRouteConfig' as const, smscId })), 'smscRouteConfig'] : ['smscRouteConfig'],
    }),

    lookupTransactionType: builder.query<SmscRouteConfigResponsez, void>({
      query: () => createRequest('Lookup/TransactionType'),
      providesTags: (result, _error, _arg) =>
        result?.data && !isEmpty(result?.data) ? [...result.data.map(({ smscId }: any) => ({ type: 'smscRouteConfig' as const, smscId })), 'smscRouteConfig'] : ['smscRouteConfig'],
    }),

    lookupSmscRoute: builder.query<SmscRouteConfigResponsez, void>({
      query: () => createRequest('Lookup/SmsRoute'),
      providesTags: (result, _error, _arg) =>
        result?.data && !isEmpty(result?.data) ? [...result.data.map(({ smscId }: any) => ({ type: 'smscRouteConfig' as const, smscId })), 'smscRouteConfig'] : ['smscRouteConfig'],
    }),

    // getSmscRoutes: builder.mutation<SmscResponse, Partial<Smsc> & Pick<Smsc, 'smscRouteId'>>({
    //   query: ({ smscRouteId }) => {
    //     return {
    //       url: `Smsc/Route/${smscRouteId}`,
    //       method: 'GET',
    //     };
    //   },
    //   invalidatesTags: (_result, _error, { smscRouteId }) => [{ type: 'smsc', smscRouteId }],
    // }),
  }),
});

export const {
  useGetSmscRouteConfigQuery,
  useLookupRouteTypeQuery,
  useLookupCountryQuery,
  useLookupAccountTypeQuery,
  useLookupTransactionTypeQuery,
  useLookupSmscRouteQuery,
  useDeleteSmscRouteConfigMutation,
  useCreateSmscRouteConfigMutation,
  useEditSmscRouteConfigMutation,
} = smscRouteConfigApi;
