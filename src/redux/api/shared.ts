import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';

import config from '@/config/config';

import { setAuth } from '../slices/auth';
import { RootState } from '../store';

export interface CustomError {
  data: {
    code: number;
    error: any;
    message: string;
    status: boolean;
  };
  status: number;
}
const baseUrl = `${config.api_url}/api`;

export const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const {
      auth: { token },
    } = getState() as RootState;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const mutex = new Mutex();

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const response = (await baseQuery('/refreshToken', api, extraOptions)) as any;
        if (response.data) {
          api.dispatch(setAuth(response.data));
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch({ type: 'LOGOUT' });
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const createRequest = (url: any) => ({ url });
export const createRequestWithParams = (url: any, params: any) => ({
  url,
  params: params,
});
