import { baseQueryWithReauth, CustomError } from "./shared";
import { BaseQueryFn, createApi, FetchArgs } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth as BaseQueryFn<string | FetchArgs, unknown, CustomError, Record<string, any>>,
  endpoints: (builder) => ({
    signupUser: builder.mutation({
      query: (data) => {
        return {
          url: `auth/signup`,
          method: "post",
          body: data,
        };
      },
    }),
    userLogin: builder.mutation({
      query: (data) => {
        return {
          url: `auth/login`,
          method: "post",
          body: data,
        };
      },
    }),
    activateOtp: builder.mutation({
      query: (data) => {
        return {
          url: `/auth/signup/confirm`,
          method: "post",
          body: data,
        };
      },
    }),
    updateProfile: builder.mutation({
      query: (data) => {
        return {
          url: `/auth/edit`,
          method: "PATCH",
          body: data,
        };
      },
    }),
  }),
});

export const { useSignupUserMutation, useUserLoginMutation, useActivateOtpMutation, useUpdateProfileMutation } = authApi;
