import { BaseQueryFn, createApi, FetchArgs } from '@reduxjs/toolkit/query/react';

import { ConfigMenuResponse, ConfigsResponse } from './../../interfaces/systemConfig';
import { baseQueryWithReauth, createRequest, CustomError } from './shared';

export const systemConfigApi = createApi({
  reducerPath: 'systemConfigApi',
  baseQuery: baseQueryWithReauth as BaseQueryFn<string | FetchArgs, unknown, CustomError, Record<string, any>>,
  tagTypes: ['config'],

  endpoints: (builder) => ({
    getSystemConfigs: builder.query<ConfigsResponse, void>({
      query: () => createRequest('SystemConfig'),
    }),
    getSystemConfigsMenu: builder.query<ConfigMenuResponse, { id?: string }>({
      query: ({ id }) => createRequest(`SystemConfig/${id}`),
    }),
    updateConfig: builder.mutation({
      query: (data) => {
        return {
          url: `SystemConfig/Bulk`,
          method: 'post',
          body: data,
        };
      },
    }),
  }),
});

export const { useGetSystemConfigsQuery, useGetSystemConfigsMenuQuery, useUpdateConfigMutation } = systemConfigApi;
