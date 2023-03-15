import { BaseQueryFn, createApi, FetchArgs } from '@reduxjs/toolkit/query/react';
import { isEmpty } from 'lodash';

import { MappedResponse } from './../../interfaces/serviceMapping';
import { baseQueryWithReauth, createRequest, CustomError } from './shared';

export const serviceMappingApi = createApi({
  reducerPath: 'serviceMappingApi',
  baseQuery: baseQueryWithReauth as BaseQueryFn<string | FetchArgs, unknown, CustomError, Record<string, any>>,
  tagTypes: ['mapping'],

  endpoints: (builder) => ({
    getServiceMappings: builder.query<any, void>({
      query: () => createRequest('ServiceMapping'),
      providesTags: (result, _error, _arg) =>
        result?.data && !isEmpty(result?.data) ? [...result.data.map(({ id }: any) => ({ type: 'mapping' as const, id })), 'mapping'] : ['mapping'],
    }),
    getMapped: builder.query<MappedResponse, void>({
      query: () => createRequest('ServiceMapping/Mapped'),
      providesTags: (result, _error, _arg) =>
        result?.data && !isEmpty(result?.data) ? [...result.data.map(({ id }: any) => ({ type: 'mapping' as const, id })), 'mapping'] : ['mapping'],
    }),
    getMappedDetails: builder.query<any, { dataSourceId: string }>({
      query: ({ dataSourceId }) => createRequest(`ServiceMapping/Mapped/${dataSourceId}`),
    }),

    createMapping: builder.mutation({
      query: (data) => {
        return {
          url: `ServiceMapping`,
          method: 'post',
          body: data,
        };
      },
    }),
    updateMapping: builder.mutation({
      query: (data) => {
        return {
          url: `ServiceMapping`,
          method: 'PUT',
          body: data,
        };
      },
    }),

    deleteMapping: builder.mutation({
      query: ({ id }) => {
        return {
          url: `ServiceMapping/${id}`,
          method: 'delete',
        };
      },
      invalidatesTags: ['mapping'],
    }),
  }),
});

export const { useDeleteMappingMutation, useGetMappedDetailsQuery, useGetMappedQuery, useGetServiceMappingsQuery, useUpdateMappingMutation, useCreateMappingMutation } =
  serviceMappingApi;
