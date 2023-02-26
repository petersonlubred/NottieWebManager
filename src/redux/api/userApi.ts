import { APIResponse } from './../../interfaces/auth';
import { baseQueryWithReauth, CustomError, createRequest } from './shared';
import { BaseQueryFn, createApi, FetchArgs } from '@reduxjs/toolkit/query/react';
import { UserResponse, UserData, UsersResponse } from '@/interfaces/user';

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

    deleteUser: builder.mutation<APIResponse<object>, { id: string; status: boolean }>({
      query: ({ id, ...rest }) => {
        return {
          url: `UserAccount/${id}/status`,
          method: 'PUT',
          body: rest,
        };
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: 'user', id }],
    }),

    resendPassword: builder.mutation<APIResponse<object>, { id: string }>({
      query: (id) => {
        return {
          url: `UserAccount/${id}/resendPassword`,
          method: 'POST',
          data: {},
        };
      },
    }),

    getUsers: builder.query<UsersResponse, void>({
      query: () => createRequest('UserAccount'),
      providesTags: (result, _error, _arg) => (result?.data ? [...result.data.map(({ id }: any) => ({ type: 'user' as const, id })), 'user'] : ['user']),
    }),
  }),
});

export const { useCreateUserMutation, useEditUserMutation, useDeleteUserMutation, useGetUsersQuery, useResendPasswordMutation } = userApi;
