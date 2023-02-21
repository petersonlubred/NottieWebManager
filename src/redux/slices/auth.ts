import { createSlice } from '@reduxjs/toolkit';
import storageSession from 'redux-persist/lib/storage/session';

const initialState = {
  user: {
    full_name: '',
    email: '',
    profile_picture: '',
  },
  authorization: { access_token: '' },
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
    setLoginUser: (state, { payload }) => {
      state.user = payload?.data?.loginUser;
      state.authorization.access_token = payload?.data.accesstoken;
    },
  },
});

export const { setLoginUser } = authSlice.actions;
const { reducer } = authSlice;
export default reducer;
