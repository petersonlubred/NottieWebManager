import { databaseApi } from './api/databaseApi';
import { combineReducers } from 'redux';
import authReducer, { persistConfig } from './slices/auth';
import sharedReducer from './slices/util';
import { persistReducer } from 'redux-persist';
import { roleApi, smtpApi, userApi } from './api';

export const reducers = combineReducers({
  auth: authReducer,
  [databaseApi.reducerPath]: databaseApi.reducer,
  [smtpApi.reducerPath]: smtpApi.reducer,
  [roleApi.reducerPath]: roleApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  sharedReducer: persistReducer(persistConfig, sharedReducer),
});

export const rootReducer = (state: any, action: any) => {
  return reducers(state, action);
};
