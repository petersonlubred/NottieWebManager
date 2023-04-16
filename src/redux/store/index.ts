import { reduxBatch } from '@manaflair/redux-batch';
import { configureStore } from '@reduxjs/toolkit';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistStore } from 'redux-persist';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import {
  alertApi,
  dashboardApi,
  databaseApi,
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
} from '../api';
import { rootReducer } from '../root-reducer';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      thunk: true,
    }),
    sagaMiddleware,
    databaseApi.middleware,
    smscApi.middleware,
    roleApi.middleware,
    userApi.middleware,
    smtpApi.middleware,
    alertApi.middleware,
    smscRouteApi.middleware,
    smscRouteConfigApi.middleware,
    templateApi.middleware,
    notificationApi.middleware,
    systemConfigApi.middleware,
    dataSourceApi.middleware,
    dashboardApi.middleware,
    smtpRouteApi.middleware,
    serviceMappingApi.middleware,
  ],
  enhancers: [reduxBatch],
});

export const persistor = persistStore(store);

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type RootState = ReturnType<typeof store.getState>;
export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;
export const useAppThunkDispatch = () => useDispatch<ThunkAppDispatch>();
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
