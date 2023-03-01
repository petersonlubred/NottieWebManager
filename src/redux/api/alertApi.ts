import { BaseQueryFn, createApi, FetchArgs } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth, createRequest, CustomError } from './shared';
import { AlertProfileResponse, AlertProfileData, AlertExceptionResponse, AlertExceptionData, AlertExclusionData, AlertExclusionResponse, AlertSubscriptionData, AlertSubscriptionResponse } from '@/interfaces/alert';
import { APIResponse } from '@/interfaces/auth';
import { isEmpty } from 'lodash';

export const alertApi = createApi({
  reducerPath: 'alertApi',
  tagTypes: ['alertProfile', 'alertNotification', 'alertException', 'alertExclusion', 'alertSubscription'],
  baseQuery: baseQueryWithReauth as BaseQueryFn<string | FetchArgs, unknown, CustomError, Record<string, any>>,
  endpoints: (builder) => ({
    getTransaction: builder.query<any, { start: Date; end: Date }>({
      query: ({ start, end }) => createRequest(`AlertNotification/Transaction/${start}/${end}`),
    }),
    getNonTransaction: builder.query<any, { start: Date; end: Date }>({
      query: ({ start, end }) => createRequest(`AlertNotification/NoneTransaction${start}/${end}`),
    }),
    getOtp: builder.query<any, { start: Date; end: Date }>({
      query: ({ start, end }) => createRequest(`AlertNotification/Otp/${start}/${end}`),
    }),
    getProfile: builder.query<any, { pageNumber?: number; pageSize?: number }>({
      query: ({ pageNumber, pageSize }) => createRequest(`AlertProfile?pageNumber=${pageNumber || 1}&pageSize=${pageSize || 50}`),
      providesTags: (result, _error, _arg) =>
        result?.data?.data && !isEmpty(result?.data?.data) ? [...result.data.data.map(({ alertProfileId }: any) => ({ type: 'alertProfile' as const, alertProfileId })), 'alertProfile'] : ['alertProfile'],
    }),
    lookupAlertProfile: builder.query({
      query: () => createRequest('Lookup/AlertProfile'),
    }),
    lookupAlertExcludeType: builder.query({
      query: () => createRequest('Lookup/ExcludeType'),
    }),
    lookupAlertExcludeOperator: builder.query({
      query: () => createRequest('Lookup/ExcludeOperator'),
    }),
    lookupAlertType: builder.query({
      query: () => createRequest('Lookup/AlertType'),
    }),
    createProfile: builder.mutation<AlertProfileResponse, Partial<AlertProfileData>>({
      query: (data) => {
        return {
          url: 'AlertProfile',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['alertProfile'],
    }),
    deleteProfile: builder.mutation<APIResponse<object>, { id?: string }>({
      query: ({ id }) => {
        return {
          url: `AlertProfile/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: 'alertProfile', alertProfileId: id }],
    }),
    updateProfile: builder.mutation<AlertProfileResponse, Partial<AlertProfileData>>({
      query: ({ alertProfileId, ...data }) => {
        return {
          url: `AlertProfile/${alertProfileId}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: (_result, _error, { alertProfileId }) => [{ type: 'alertProfile', alertProfileId }],
    }),
    getException: builder.query<any, { customerId?: string, accountNo?: string, alertType?: string, recipient?: string, pageNumber?: number; pageSize?: number }>({
      query: ({ pageNumber, pageSize, customerId, accountNo, alertType, recipient }) => createRequest(`AlertException?pageNumber=${pageNumber || 1}&pageSize=${pageSize || 50}${customerId ? `&customerId=${customerId}` : ''}${accountNo ? `&accountNo=${accountNo}` : ''}${alertType ? `&alertType=${alertType}` : ''}${recipient ? `&recipient=${recipient}` : ''}`),
      providesTags: (result, _error, _arg) =>
        result?.data?.data && !isEmpty(result?.data?.data) ? [...result.data.data.map(({ alertExceptionId }: any) => ({ type: 'alertException' as const, alertExceptionId })), 'alertException'] : ['alertException'],
    }),
    createException: builder.mutation<AlertExceptionResponse, Partial<AlertExceptionData>>({
      query: (data) => {
        return {
          url: 'AlertException',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['alertException'],
    }),
    deleteException: builder.mutation<APIResponse<object>, { id?: string }>({
      query: ({ id }) => {
        return {
          url: `AlertException/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: 'alertException', alertExceptionId: id }],
    }),
    updateException: builder.mutation<AlertExceptionResponse, Partial<AlertExceptionData>>({
      query: ({ alertExceptionId, ...data }) => {
        return {
          url: `AlertException/${alertExceptionId}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: (_result, _error, { alertExceptionId }) => [{ type: 'alertException', alertExceptionId }],
    }),
    getExclusion: builder.query<any, { excludeValue?: string, excludeType?: string, pageNumber?: number; pageSize?: number }>({
      query: ({ pageNumber, pageSize, excludeValue, excludeType }) => createRequest(`AlertExclusion?pageNumber=${pageNumber || 1}&pageSize=${pageSize || 50}${excludeValue ? `&excludeValue=${excludeValue}` : ''}${excludeType ? `&excludeType=${excludeType}` : ''}`),
      providesTags: (result, _error, _arg) =>
        result?.data?.data && !isEmpty(result?.data?.data) ? [...result.data.data.map(({ alertExcludeId }: any) => ({ type: 'alertExclusion' as const, alertExcludeId })), 'alertExclusion'] : ['alertExclusion'],
    }),
    createExclusion: builder.mutation<AlertExclusionResponse, Partial<AlertExclusionData>>({
      query: (data) => {
        return {
          url: 'AlertExclusion',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['alertExclusion'],
    }),
    deleteExclusion: builder.mutation<APIResponse<object>, { id?: string }>({
      query: ({ id }) => {
        return {
          url: `AlertExclusion/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: 'alertExclusion', alertExcludeId: id }],
    }),
    updateExclusion: builder.mutation<AlertExclusionResponse, Partial<AlertExclusionData>>({
      query: ({ alertExcludeId, ...data }) => {
        return {
          url: `AlertExclusion/${alertExcludeId}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: (_result, _error, { alertExcludeId }) => [{ type: 'alertExclusion', alertExcludeId }],
    }),
    getSubscription: builder.query<any, { customerId?: string, accountNo?: string, alertType?: string, recipient?: string, pageNumber?: number; pageSize?: number }>({
      query: ({ pageNumber, pageSize, customerId, accountNo, alertType, recipient }) => createRequest(`AlertSubscription?pageNumber=${pageNumber || 1}&pageSize=${pageSize || 50}${customerId ? `&customerId=${customerId}` : ''}${accountNo ? `&accountNo=${accountNo}` : ''}${alertType ? `&alertType=${alertType}` : ''}${recipient ? `&recipient=${recipient}` : ''}`),
      providesTags: (result, _error, _arg) =>
        result?.data?.data && !isEmpty(result?.data?.data) ? [...result.data.data.map(({ alertSubscriptionId }: any) => ({ type: 'alertSubscription' as const, alertSubscriptionId })), 'alertSubscription'] : ['alertSubscription'],
    }),
    createSubscription: builder.mutation<AlertSubscriptionResponse, Partial<AlertSubscriptionData>>({
      query: (data) => {
        return {
          url: 'AlertSubscription',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['alertSubscription'],
    }),
    deleteSubscription: builder.mutation<APIResponse<object>, { id?: string }>({
      query: ({ id }) => {
        return {
          url: `AlertSubscription/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: 'alertSubscription', alertSubscriptionId: id }],
    }),
    updateSubscription: builder.mutation<AlertSubscriptionResponse, Partial<AlertSubscriptionData>>({
      query: ({ alertSubscriptionId, ...data }) => {
        return {
          url: `AlertSubscription/${alertSubscriptionId}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: (_result, _error, { alertSubscriptionId }) => [{ type: 'alertSubscription', alertSubscriptionId }],
    }),
  }),
});

export const {
  useGetTransactionQuery,
  useGetProfileQuery,
  useCreateProfileMutation,
  useDeleteProfileMutation,
  useUpdateProfileMutation,
  useLookupAlertProfileQuery,
  useLookupAlertExcludeOperatorQuery,
  useLookupAlertExcludeTypeQuery,
  useLookupAlertTypeQuery,
  useGetExceptionQuery,
  useCreateExceptionMutation,
  useDeleteExceptionMutation,
  useUpdateExceptionMutation,
  useGetExclusionQuery,
  useCreateExclusionMutation,
  useDeleteExclusionMutation,
  useUpdateExclusionMutation,
  useCreateSubscriptionMutation,
  useDeleteSubscriptionMutation,
  useUpdateSubscriptionMutation,
  useGetSubscriptionQuery
} = alertApi;
