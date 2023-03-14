import { BaseQueryFn, createApi, FetchArgs } from '@reduxjs/toolkit/query/react';
import { isEmpty } from 'lodash';

import { IPageQuery } from '@/interfaces/notification';
import { IPrivilege, IRole, PrivilegesResponse, RoleResponse, RolesResponse } from '@/interfaces/role';

import { APIResponse } from './../../interfaces/auth';
import { baseQueryWithReauth, createRequest, createRequestWithParams, CustomError } from './shared';

export const roleApi = createApi({
  reducerPath: 'roleApi',
  baseQuery: baseQueryWithReauth as BaseQueryFn<string | FetchArgs, unknown, CustomError, Record<string, any>>,
  tagTypes: ['role'],
  endpoints: (builder) => ({
    createRole: builder.mutation<RoleResponse, Partial<IRole>>({
      query: (data) => {
        return {
          url: `Roles`,
          method: 'post',
          body: data,
        };
      },
      invalidatesTags: ['role'],
    }),

    editRole: builder.mutation<RoleResponse, Partial<IRole & { rolePrivileges: Partial<IPrivilege>[] }> & Pick<IRole, 'roleId'>>({
      query: (data) => {
        return {
          url: `Roles/${data.roleId}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: (_result, _error, { roleId }) => [{ type: 'role', roleId }],
    }),

    deleteRole: builder.mutation<APIResponse<object>, { roleId?: string }>({
      query: ({ roleId }) => {
        return {
          url: `Roles/${roleId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (_result, _error, { roleId }) => [{ type: 'role', roleId }],
    }),

    getRoles: builder.query<RolesResponse, IPageQuery>({
      query: (query) => createRequestWithParams('Roles', { ...query }),
      providesTags: (result, _error, _arg) =>
        result?.data && !isEmpty(result?.data) ? [...result.data.map(({ roleId }: any) => ({ type: 'role' as const, roleId })), 'role'] : ['role'],
    }),

    getPrivileges: builder.query<PrivilegesResponse, string>({
      query: (id) => createRequest(`Roles/Privileges/${id}`),
      providesTags: (result, _error, _arg) =>
        result?.data && !isEmpty(result?.data) ? [...result.data.map(({ roleId }: any) => ({ type: 'role' as const, roleId })), 'role'] : ['role'],
    }),
  }),
});

export const { useCreateRoleMutation, useEditRoleMutation, useDeleteRoleMutation, useLazyGetRolesQuery, useGetPrivilegesQuery, useGetRolesQuery } = roleApi;
