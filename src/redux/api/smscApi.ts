import { Smsc, SmscResponsez } from './../../interfaces/configuration';
import { baseQueryWithReauth, CustomError, createRequest } from './shared';
import { BaseQueryFn, createApi, FetchArgs } from '@reduxjs/toolkit/query/react';
import { SmscResponse } from '@/interfaces/configuration';
import { APIResponse } from '@/interfaces/auth';

export const smscApi = createApi({
  reducerPath: 'smscApi',
  baseQuery: baseQueryWithReauth as BaseQueryFn<string | FetchArgs, unknown, CustomError, Record<string, any>>,
  tagTypes: ['smsc'],

  endpoints: (builder) => ({
    createSmsc: builder.mutation<SmscResponse, Partial<Smsc>>({
      query: (data) => {
        return {
          url: `Smsc`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['smsc'],
    }),

    getSmsc: builder.query<SmscResponsez, void>({
      query: () => createRequest('Smsc'),
      providesTags: (result, _error, _arg) => (result?.data ? [...result.data.map(({ smscId }: any) => ({ type: 'smsc' as const, smscId })), 'smsc'] : ['smsc']),
    }),

    getSmscRoutes: builder.mutation<SmscResponse, Partial<Smsc> & Pick<Smsc, 'smscRouteId'>>({
      query: ({ smscRouteId }) => {
        return {
          url: `Smsc/Route/${smscRouteId}`,
          method: 'GET',
        };
      },
      invalidatesTags: (_result, _error, { smscRouteId }) => [{ type: 'smsc', smscRouteId }],
    }),

    editSmsc: builder.mutation<SmscResponse, Partial<Smsc> & Pick<Smsc, 'smscId'>>({
      query: (data) => {
        return {
          url: `Smsc/${data.smscId}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: (_result, _error, { smscId }) => [{ type: 'smsc', smscId }],
    }),

    editSmscStatus: builder.mutation<SmscResponse, Partial<Smsc> & Pick<Smsc, 'smscId'>>({
      query: (data) => {
        return {
          url: `Smsc/${data.smscId}/Status`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: (_result, _error, { smscId }) => [{ type: 'smsc', smscId }],
    }),

    editSmscRoute: builder.mutation<SmscResponse, Partial<Smsc> & Pick<Smsc, 'smscId'>>({
      query: (data) => {
        return {
          url: `Smsc/Route/${data.smscId}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: (_result, _error, { smscId }) => [{ type: 'smsc', smscId }],
    }),

    deleteSmscRoute: builder.mutation<APIResponse<object>, { smscRouteId: string }>({
      query: ({ smscRouteId }) => {
        return {
          url: `Smsc/Route/${smscRouteId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (_result, _error, { smscRouteId }) => [{ type: 'smsc', smscRouteId }],
    }),

    getSmscRoute: builder.query<SmscResponsez, void>({
      query: () => createRequest('Smsc/Route'),
      providesTags: (result, _error, _arg) => (result?.data ? [...result.data.map(({ smscId }: any) => ({ type: 'smsc' as const, smscId })), 'smsc'] : ['smsc']),
    }),

    postSmscRouteConfig: builder.mutation<APIResponse<object>, Partial<Smsc>>({
      query: (data) => {
        return {
          url: `Smsc/Route/Config`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['smsc'],
    }),

    editSmscRouteConfig: builder.mutation<SmscResponse, { smscRouteConfigId: string }>({
      query: (data) => {
        return {
          url: `Smsc/Route/Config/${data.smscRouteConfigId}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: (_result, _error, { smscRouteConfigId }) => [{ type: 'smsc', smscRouteConfigId }],
    }),

    deleteSmscRouteConfig: builder.mutation<APIResponse<object>, { smscRouteConfigId: string }>({
      query: ({ smscRouteConfigId }) => {
        return {
          url: `Smsc/Route/Config/${smscRouteConfigId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (_result, _error, { smscRouteConfigId }) => [{ type: 'smsc', smscRouteConfigId }],
    }),
  }),
});

export const {
  useCreateSmscMutation,
  useGetSmscQuery,
  useEditSmscMutation,
  useGetSmscRoutesMutation,
  useEditSmscStatusMutation,
  useEditSmscRouteMutation,
  useDeleteSmscRouteMutation,
  usePostSmscRouteConfigMutation,
  useEditSmscRouteConfigMutation,
} = smscApi;
