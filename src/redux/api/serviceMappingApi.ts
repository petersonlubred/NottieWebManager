import { BaseQueryFn, createApi, FetchArgs } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth, createRequest, CustomError } from './shared';

export const serviceMappingApi = createApi({
    reducerPath: 'serviceMappingApi',
    baseQuery: baseQueryWithReauth as BaseQueryFn<string | FetchArgs, unknown, CustomError, Record<string, any>>,
    tagTypes: ['serviceMapping'],

    endpoints: (builder) => ({
        getServiceMapping: builder.query({
            query: () => createRequest('ServiceMapping'),
        }),
    }),
});

export const { useGetServiceMappingQuery } = serviceMappingApi;
