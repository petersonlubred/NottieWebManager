import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import {
  alertApi,
  dashboardApi,
  dataSourceApi,
  notificationApi,
  roleApi,
  serviceMappingApi,
  smscApi,
  smscRouteApi,
  smscRouteConfigApi,
  smtpApi,
  smtpRouteApi,
  systemConfigApi,
  templateApi,
  userApi,
} from './api';
import { databaseApi } from './api/databaseApi';
import authReducer, { persistAuthConfig, persistConfig } from './slices/auth';
import dashboardReducer, { dashboardPersistConfig } from './slices/dashboard';
import sharedReducer from './slices/util';

export const reducers = combineReducers({
  auth: persistReducer(persistAuthConfig, authReducer),
  [databaseApi.reducerPath]: databaseApi.reducer,
  [smtpApi.reducerPath]: smtpApi.reducer,
  [roleApi.reducerPath]: roleApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [smscApi.reducerPath]: smscApi.reducer,
  [alertApi.reducerPath]: alertApi.reducer,
  [smscRouteApi.reducerPath]: smscRouteApi.reducer,
  [smscRouteConfigApi.reducerPath]: smscRouteConfigApi.reducer,
  [notificationApi.reducerPath]: notificationApi.reducer,
  [templateApi.reducerPath]: templateApi.reducer,
  [systemConfigApi.reducerPath]: systemConfigApi.reducer,
  [dataSourceApi.reducerPath]: dataSourceApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
  [smtpRouteApi.reducerPath]: smtpRouteApi.reducer,
  [serviceMappingApi.reducerPath]: serviceMappingApi.reducer,
  sharedReducer: persistReducer(persistConfig, sharedReducer),
  dashboardReducer: persistReducer(dashboardPersistConfig, dashboardReducer),
});

export const rootReducer = (state: any, action: any) => {
  if (action.type === 'logout') {
    localStorage.removeItem('persist:userAuth');
    const { authStore } = state;
    state = { authStore };
  }
  return reducers(state, action);
};
