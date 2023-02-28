import { BaseQueryFn, createApi, FetchArgs } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth, createRequest, CustomError } from './shared';

export const databaseApi = createApi({
  reducerPath: 'databaseApi',
  baseQuery: baseQueryWithReauth as BaseQueryFn<string | FetchArgs, unknown, CustomError, Record<string, any>>,
  endpoints: (builder) => ({
    registerDb: builder.mutation({
      query: (data) => {
        return {
          url: `DatabaseSetup/DatabaseConnectionDetatails`,
          method: 'post',
          body: data,
        };
      },
    }),
    createTable: builder.query({
      query: () => createRequest(`DatabaseSetup/DatabaseObjectsStatus`),
    }),
    loadDefaultData: builder.query({
      query: () => createRequest(`DatabaseSetup/DatabaseDataStatus`),
    }),
    wrapUp: builder.query({
      query: () => createRequest(`DatabaseSetup/WrapingUp`),
    }),
  }),
});

export const { useRegisterDbMutation, useLazyCreateTableQuery, useLazyLoadDefaultDataQuery, useLazyWrapUpQuery } = databaseApi;
