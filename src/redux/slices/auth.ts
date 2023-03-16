import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';

import { UserData } from '@/interfaces/user';

export type AuthState = {
  user: UserData | null;
  token: string | null;
};

const initialState: AuthState = {
  user: null,
  token: null,
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
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
const { reducer } = authSlice;
export default reducer;
