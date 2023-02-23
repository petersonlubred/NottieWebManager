import { createSlice } from '@reduxjs/toolkit';
import storageSession from 'redux-persist/lib/storage/session';
import { HYDRATE } from 'next-redux-wrapper';
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
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, { payload }) => {
      state.user = payload?.user;
      state.token = payload?.token;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    });
  },
});

export const { setAuth } = authSlice.actions;
const { reducer } = authSlice;
export default reducer;
