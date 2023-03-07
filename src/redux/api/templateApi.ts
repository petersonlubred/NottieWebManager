import { BaseQueryFn, createApi, FetchArgs } from '@reduxjs/toolkit/query/react';

import { ITemplateConfigEmail, ITemplateConfigSms, TemplateConfigSmsResponse } from '@/interfaces/template';

import { baseQueryWithReauth, createRequest, CustomError } from './shared';

export const templateApi = createApi({
  reducerPath: 'templateApi',
  tagTypes: ['templateConfigSms', 'templateConfigEmail', 'templateConfig'],
  baseQuery: baseQueryWithReauth as BaseQueryFn<string | FetchArgs, unknown, CustomError, Record<string, any>>,
  endpoints: (builder) => ({
    lookupTemplate: builder.query({
      query: () => createRequest('Lookup/Template'),
    }),
    lookupServiceType: builder.query({
      query: () => createRequest('Lookup/ServiceType'),
    }),
    getTemplateConfig: builder.query({
      query: () => createRequest('TemplateConfig'),
      providesTags: ['templateConfig'],
    }),
    createTemplateConfig: builder.mutation({
      query: (data) => {
        return {
          url: 'TemplateConfig',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['templateConfig'],
    }),
    getTemplateConfigSms: builder.query<{ data: ITemplateConfigSms; status: boolean }, { templateId: string; serviceTypeId: string }>({
      query: ({ templateId, serviceTypeId }) => createRequest(`TemplateConfig/${templateId}/Sms/${serviceTypeId}`),
      providesTags: ['templateConfigSms'],
    }),
    getTemplateConfigEmail: builder.query<{ data: ITemplateConfigEmail; status: boolean }, { templateId: string; serviceTypeId: string }>({
      query: ({ templateId, serviceTypeId }) => createRequest(`TemplateConfig/${templateId}/Email/${serviceTypeId}`),
      providesTags: ['templateConfigEmail'],
    }),
    updateTemplateConfigSms: builder.mutation<TemplateConfigSmsResponse, Partial<ITemplateConfigSms & { templateId: string }>>({
      query: ({ templateId, ...data }) => {
        return {
          url: `TemplateConfig/${templateId}/Sms`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['templateConfigSms'],
    }),
    updateTemplateConfigEmail: builder.mutation<TemplateConfigSmsResponse, Partial<ITemplateConfigEmail & { templateId: string }>>({
      query: ({ templateId, ...data }) => {
        return {
          url: `TemplateConfig/${templateId}/Email`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['templateConfigEmail'],
    }),
  }),
});

export const {
  useLookupTemplateQuery,
  useLookupServiceTypeQuery,
  useGetTemplateConfigQuery,
  useCreateTemplateConfigMutation,
  useGetTemplateConfigEmailQuery,
  useGetTemplateConfigSmsQuery,
  useUpdateTemplateConfigEmailMutation,
  useUpdateTemplateConfigSmsMutation,
} = templateApi;
