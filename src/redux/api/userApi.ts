import { BaseQueryFn, createApi, FetchArgs } from '@reduxjs/toolkit/query/react';
import { isEmpty } from 'lodash';

import { IPageQuery } from '@/interfaces/notification';
import { UserData, UserResponse, UsersResponse } from '@/interfaces/user';

import { APIResponse } from './../../interfaces/auth';
import { BulkResetPassword } from './../../interfaces/user';
import { IinitialResetPassword, IinitialUserLogin } from './../../schemas/interface';
import { baseQueryWithReauth, createRequest, createRequestWithParams, CustomError } from './shared';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth as BaseQueryFn<string | FetchArgs, unknown, CustomError, Record<string, any>>,
  tagTypes: ['user'],
  endpoints: (builder) => ({
    createUser: builder.mutation<UserResponse, Partial<UserData>>({
      query: (data) => {
        return {
          url: `UserAccount`,
          method: 'post',
          body: data,
        };
      },
      invalidatesTags: ['user'],
    }),

    editUser: builder.mutation<UserResponse, Partial<UserData> & Pick<UserData, 'id'>>({
      query: (data) => {
        return {
          url: `UserAccount/${data.id}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: 'user', id }],
    }),

    deleteUser: builder.mutation<APIResponse<object>, { id?: string; status?: boolean }>({
      query: ({ id, ...rest }) => {
        return {
          url: `UserAccount/${id}/status`,
          method: 'PUT',
          body: rest,
        };
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: 'user', id }],
    }),

    deleteUsers: builder.mutation<APIResponse<object>, { userIds?: string[]; status?: boolean }>({
      query: (data) => {
        return {
          url: `UserAccount/status/bulk`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['user'],
    }),

    getUsers: builder.query<UsersResponse, IPageQuery>({
      query: (data) => createRequestWithParams('UserAccount', { ...data }),
      providesTags: (result, _error, _arg) => (result?.data && !isEmpty(result?.data) ? [...result.data.map(({ id }: any) => ({ type: 'user' as const, id })), 'user'] : ['user']),
    }),

    getAUser: builder.query<UserResponse, { id?: string }>({
      query: (id) => createRequest(`UserAccount/${id}`),
      providesTags: ['user'],
    }),

    onboardUser: builder.mutation<APIResponse<object>, IinitialUserLogin & { id?: string }>({
      query: ({ id, ...rest }) => {
        return {
          url: `UserAccount/${id}/Onboard`,
          method: 'PUT',
          body: rest,
        };
      },
    }),

    resetPassword: builder.mutation<APIResponse<object>, { id?: string; emailAddress: string }>({
      query: (data) => {
        return {
          url: `UserAccount/${data?.id}/ResetPassword`,
          method: 'PUT',
          body: { emailAddress: data?.emailAddress },
        };
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: 'user', id }],
    }),

    resetPasswords: builder.mutation<APIResponse<object>, BulkResetPassword | undefined>({
      query: (data) => {
        return {
          url: `UserAccount/ResetPassword/Bulk`,
          method: 'PUT',
          body: data,
        };
      },
    }),

    changePassword: builder.mutation<APIResponse<object>, Partial<IinitialResetPassword> & { id: string }>({
      query: ({ id, ...rest }) => {
        return {
          url: `UserAccount/${id}/ChangePassword`,
          method: 'PUT',
          body: rest,
        };
      },
    }),
  }),
});

export const {
  useCreateUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useDeleteUsersMutation,
  useOnboardUserMutation,
  useLazyGetAUserQuery,
  useResetPasswordsMutation,
} = userApi;
