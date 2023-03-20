import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';

import { UserData } from '@/interfaces/user';

export type AuthState = {
  user: UserData | null;
  token: string | null;
};

export const initialLoginResponse = {
  user: null,
  token: null,
};

const initialState: AuthState = {
  ...initialLoginResponse,
};

export const persistConfig = {
  storage: storageSession,
  key: 'theme',
  blacklist: ['notifications'],
};

export const persistAuthConfig = {
  storage: storage,
  key: 'userAuth',
  blacklist: ['notifications'],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, { payload }) => {
      state.user = payload?.user;
      state.token = payload?.token;
    },
  },
});

export const { setAuth } = authSlice.actions;
const { reducer } = authSlice;
export default reducer;
