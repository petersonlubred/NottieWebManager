import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import { alertApi, notificationApi, roleApi, smtpApi, systemConfigApi, templateApi, userApi } from './api';
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
  [notificationApi.reducerPath]: notificationApi.reducer,
  [templateApi.reducerPath]: templateApi.reducer,
  [systemConfigApi.reducerPath]: systemConfigApi.reducer,
  sharedReducer: persistReducer(persistConfig, sharedReducer),
});

export const rootReducer = (state: any, action: any) => {
  return reducers(state, action);
};
