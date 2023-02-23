import { baseQueryWithReauth, CustomError, createRequest } from './shared';
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
} from '@reduxjs/toolkit/query/react';

export const roleApi = createApi({
  reducerPath: 'roleApi',
  baseQuery: baseQueryWithReauth as BaseQueryFn<
    string | FetchArgs,
    unknown,
    CustomError,
    Record<string, any>
  >,
  tagTypes: ['role'],
  endpoints: (builder) => ({
    createRole: builder.mutation({
      query: (data) => {
        return {
          url: `Roles`,
          method: 'post',
          body: data,
        };
      },
      invalidatesTags: ['role'],
    }),

    editRole: builder.mutation({
      query: (data) => {
        return {
          url: `Roles/${data.roleId}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: (_result, _error, { roleId }) => [
        { type: 'role', roleId },
      ],
    }),

    deleteRole: builder.mutation({
      query: (id) => {
        return {
          url: `Roles/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: 'role', id }],
    }),

    getRoles: builder.query({
      query: () => createRequest('Roles'),
      providesTags: ['role'],
    }),

    getPrivileges: builder.query({
      query: (id) => createRequest(`Roles/Privileges/${id}`),
      providesTags: ['role'],
    }),
  }),
});

export const {
  useCreateRoleMutation,
  useEditRoleMutation,
  useDeleteRoleMutation,
  useLazyGetRolesQuery,
  useGetPrivilegesQuery,
} = roleApi;
