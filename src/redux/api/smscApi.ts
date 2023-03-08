import { BaseQueryFn, createApi, FetchArgs } from '@reduxjs/toolkit/query/react';
import { isEmpty } from 'lodash';

// import { APIResponse } from '@/interfaces/auth';
import { SmscResponse } from '@/interfaces/configuration';

import { Smsc, SmscResponsez } from './../../interfaces/configuration';
import { baseQueryWithReauth, createRequest, CustomError } from './shared';

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
      providesTags: (result, _error, _arg) =>
        result?.data && !isEmpty(result?.data) ? [...result.data.map(({ smscId }: any) => ({ type: 'smsc' as const, smscId })), 'smsc'] : ['smsc'],
    }),

    lookupDataCoding: builder.query<SmscResponsez, void>({
      query: () => createRequest('Lookup/DataCoding'),
      providesTags: (result, _error, _arg) =>
        result?.data && !isEmpty(result?.data) ? [...result.data.map(({ smscId }: any) => ({ type: 'smsc' as const, smscId })), 'smsc'] : ['smsc'],
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
          body: { status: data.status },
        };
      },
      invalidatesTags: (_result, _error, { smscId }) => [{ type: 'smsc', smscId }],
    }),
  }),
});

export const { useCreateSmscMutation, useGetSmscQuery, useLookupDataCodingQuery, useEditSmscMutation, useEditSmscStatusMutation } = smscApi;
