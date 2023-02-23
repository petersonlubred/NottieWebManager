import { baseQueryWithReauth, CustomError, createRequest } from './shared';
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
} from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth as BaseQueryFn<
    string | FetchArgs,
    unknown,
    CustomError,
    Record<string, any>
  >,
  tagTypes: ['user'],
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => {
        return {
          url: `UserAccount`,
          method: 'post',
          body: data,
        };
      },
      invalidatesTags: ['user'],
    }),

    editUser: builder.mutation({
      query: (data) => {
        return {
          url: `UserAccount/${data.userId}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: (_result, _error, { userId }) => [
        { type: 'user', userId },
      ],
    }),

    deleteUser: builder.mutation({
      query: (id) => {
        return {
          url: `UserAccount/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: 'user', id }],
    }),

    resendPassword: builder.mutation({
      query: (id) => {
        return {
          url: `UserAccount/${id}/resendPassword`,
          method: 'POST',
        };
      },
    }),

    getUsers: builder.query({
      query: () => createRequest('UserAccount'),
      providesTags: ['user'],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
  useLazyGetUsersQuery,
  useResendPasswordMutation,
} = userApi;
