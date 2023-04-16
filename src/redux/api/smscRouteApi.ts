import { BaseQueryFn, createApi, FetchArgs } from '@reduxjs/toolkit/query/react';
import { isEmpty } from 'lodash';

import { APIResponse } from '@/interfaces/auth';
import { SmscRouteResponse } from '@/interfaces/configuration';

import { SmscRoute, SmscRouteResponsez } from './../../interfaces/configuration';
import { baseQueryWithReauth, createRequest, CustomError } from './shared';

export const smscRouteApi = createApi({
  reducerPath: 'smscRouteApi',
  baseQuery: baseQueryWithReauth as BaseQueryFn<string | FetchArgs, unknown, CustomError, Record<string, any>>,
  tagTypes: ['smscRoute'],

  endpoints: (builder) => ({
    createSmscRoute: builder.mutation<SmscRouteResponse, Partial<SmscRoute>>({
      query: (data) => {
        return {
          url: `Smsc/Route`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['smscRoute'],
    }),

    getSmscRoute: builder.query<SmscRouteResponsez, void>({
      query: () => createRequest('Smsc/Route'),
      providesTags: (result, _error, _arg) =>
        result?.data && !isEmpty(result?.data) ? [...result.data.map(({ smscRouteId }: any) => ({ type: 'smscRoute' as const, smscRouteId })), 'smscRoute'] : ['smscRoute'],
    }),

    lookupSmscId: builder.query<SmscRouteResponsez, void>({
      query: () => createRequest('Lookup/Smsc'),
      providesTags: (result, _error, _arg) =>
        result?.data && !isEmpty(result?.data) ? [...result.data.map(({ smscRouteId }: any) => ({ type: 'smscRoute' as const, smscRouteId })), 'smscRoute'] : ['smscRoute'],
    }),
    lookupServiceTypeId: builder.query<SmscRouteResponsez, void>({
      query: () => createRequest('Lookup/ServiceType'),
      providesTags: (result, _error, _arg) =>
        result?.data && !isEmpty(result?.data) ? [...result.data.map(({ smscRouteId }: any) => ({ type: 'smscRoute' as const, smscRouteId })), 'smscRoute'] : ['smscRoute'],
    }),

    editSmscRoute: builder.mutation<SmscRouteResponse, Partial<SmscRoute> & Pick<SmscRoute, 'smscRouteId'>>({
      query: (data) => {
        return {
          url: `Smsc/Route/${data.smscRouteId}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: (_result, _error, { smscRouteId }) => [{ type: 'smscRoute', smscRouteId }],
    }),

    deleteSmscRoute: builder.mutation<APIResponse<object>, { smscRouteId: string }>({
      query: ({ smscRouteId }) => {
        return {
          url: `Smsc/Route/${smscRouteId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (_result, _error, { smscRouteId }) => [{ type: 'smscRoute', smscRouteId }],
    }),
  }),
});

export const { useCreateSmscRouteMutation, useGetSmscRouteQuery, useLookupSmscIdQuery, useLookupServiceTypeIdQuery, useEditSmscRouteMutation, useDeleteSmscRouteMutation } =
  smscRouteApi;
