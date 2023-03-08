import { BaseQueryFn, createApi, FetchArgs } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth, createRequest, CustomError } from './shared';

export const serviceMappingApi = createApi({
  reducerPath: 'serviceMappingApi',
  baseQuery: baseQueryWithReauth as BaseQueryFn<string | FetchArgs, unknown, CustomError, Record<string, any>>,
  tagTypes: ['service-mapping'],

  endpoints: (builder) => ({
    getServiceMappings: builder.query<any, void>({
      query: () => createRequest('ServiceMapping'),
    }),
    getMapped: builder.query<any, void>({
      query: () => createRequest('ServiceMapping/Mapped'),
    }),
    getMappedDetails: builder.query<any, { dataSourceId: string }>({
      query: ({ dataSourceId }) => createRequest(`ServiceMapping/Mapped/${dataSourceId}`),
    }),

    updateMapping: builder.mutation({
      query: (data) => {
        return {
          url: `ServiceMapping`,
          method: 'post',
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
    }),
  }),
});

export const { useDeleteMappingMutation, useGetMappedDetailsQuery, useGetMappedQuery, useGetServiceMappingsQuery } = serviceMappingApi;
