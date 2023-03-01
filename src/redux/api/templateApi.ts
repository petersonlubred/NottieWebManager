import { BaseQueryFn, createApi, FetchArgs } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth, createRequest, CustomError } from './shared';

export const templateApi = createApi({
    reducerPath: 'templateApi',
    baseQuery: baseQueryWithReauth as BaseQueryFn<string | FetchArgs, unknown, CustomError, Record<string, any>>,
    endpoints: (builder) => ({
        lookupTemplate: builder.query({
            query: () => createRequest('Lookup/Template'),
        }),
    }),
});

export const { useLookupTemplateQuery } = templateApi;
