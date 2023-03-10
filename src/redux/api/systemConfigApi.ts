import { BaseQueryFn, createApi, FetchArgs } from '@reduxjs/toolkit/query/react';
import { isEmpty } from 'lodash';

import { ConfigMenuResponse, ConfigsResponse } from './../../interfaces/systemConfig';
import { baseQueryWithReauth, createRequest, CustomError } from './shared';

export const systemConfigApi = createApi({
  reducerPath: 'systemConfigApi',
  baseQuery: baseQueryWithReauth as BaseQueryFn<string | FetchArgs, unknown, CustomError, Record<string, any>>,
  tagTypes: ['config'],

  endpoints: (builder) => ({
    getSystemConfigs: builder.query<ConfigsResponse, void>({
      query: () => createRequest('SystemConfig'),
      providesTags: (result, _error, _arg) =>
        result?.data && !isEmpty(result?.data) ? [...result.data.map(({ id }: any) => ({ type: 'config' as const, id })), 'config'] : ['config'],
    }),
    getSystemConfigsMenu: builder.query<ConfigMenuResponse, { id?: string }>({
      query: ({ id }) => createRequest(`SystemConfig/${id}`),
      providesTags: (_result, _error, { id }) => [{ type: 'config', id }],
    }),
    updateConfig: builder.mutation({
      query: (data) => {
        return {
          url: `SystemConfig/Bulk`,
          method: 'post',
          body: data,
        };
      },
      invalidatesTags: ['config'],
    }),
  }),
});

export const { useGetSystemConfigsQuery, useGetSystemConfigsMenuQuery, useUpdateConfigMutation } = systemConfigApi;
