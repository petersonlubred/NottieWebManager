import { BaseQueryFn, createApi, FetchArgs } from '@reduxjs/toolkit/query/react';
import { isEmpty } from 'lodash';

import { DatabaseTypeResponse, DataSourceResponse, IDataSourceType, SingleDataSourceResponse } from '@/interfaces/configuration';
import { IDatasourceForm } from '@/schemas/interface';

import { baseQueryWithReauth, createRequest, CustomError } from './shared';

export const dataSourceApi = createApi({
  reducerPath: 'dataSourceApi',
  baseQuery: baseQueryWithReauth as BaseQueryFn<string | FetchArgs, unknown, CustomError, Record<string, any>>,
  tagTypes: ['datasource'],

  endpoints: (builder) => ({
    createDatasource: builder.mutation<DataSourceResponse, Partial<IDatasourceForm>>({
      query: (data) => {
        return {
          url: `DataSource`,
          method: 'post',
          body: data,
        };
      },
      invalidatesTags: ['datasource'],
    }),

    editDatasource: builder.mutation<DataSourceResponse, Partial<IDatasourceForm> & Pick<IDataSourceType, 'dataSourceId'>>({
      query: (data) => {
        return {
          url: `DataSource/${data.dataSourceId}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: (_result, _error, { dataSourceId }) => [{ type: 'datasource', dataSourceId }],
    }),

    getDatasources: builder.query<DataSourceResponse, void>({
      query: () => createRequest('DataSource'),
      providesTags: (result, _error, _arg) =>
        result?.data && !isEmpty(result?.data) ? [...result.data.map(({ dataSourceId }: any) => ({ type: 'datasource' as const, dataSourceId })), 'datasource'] : ['datasource'],
    }),

    getDatasource: builder.query<SingleDataSourceResponse, { dataSourceId: string }>({
      query: ({ dataSourceId }) => createRequest(`DataSource/${dataSourceId}`),
      providesTags: (_result, _error, { dataSourceId }) => [{ type: 'datasource', dataSourceId }],
    }),

    lookupDatabaseType: builder.query<DatabaseTypeResponse, void>({
      query: () => createRequest('Lookup/DataBaseType'),
      providesTags: (result, _error, _arg) =>
        result?.data && !isEmpty(result?.data) ? [...result.data.map(({ dataSourceId }: any) => ({ type: 'datasource' as const, dataSourceId })), 'datasource'] : ['datasource'],
    }),
  }),
});

export const { useCreateDatasourceMutation, useGetDatasourcesQuery, useLookupDatabaseTypeQuery, useEditDatasourceMutation, useGetDatasourceQuery } = dataSourceApi;
