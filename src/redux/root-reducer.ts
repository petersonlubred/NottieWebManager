import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import { alertApi, roleApi, smtpApi, templateApi, userApi } from './api';
import { databaseApi } from './api/databaseApi';
import authReducer, { persistConfig } from './slices/auth';
import sharedReducer from './slices/util';

export const reducers = combineReducers({
  auth: authReducer,
  [databaseApi.reducerPath]: databaseApi.reducer,
  [smtpApi.reducerPath]: smtpApi.reducer,
  [roleApi.reducerPath]: roleApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [alertApi.reducerPath]: alertApi.reducer,
  [templateApi.reducerPath]: templateApi.reducer,
  sharedReducer: persistReducer(persistConfig, sharedReducer),
});

export const rootReducer = (state: any, action: any) => {
  return reducers(state, action);
};
