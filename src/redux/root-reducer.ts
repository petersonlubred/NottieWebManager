import { authApi } from './services/authApi';
import { databaseApi } from './services/databaseApi';
import { combineReducers } from 'redux';
import authReducer, { persistConfig } from './slices/auth';
import sharedReducer from './slices/util';
import { persistReducer } from 'redux-persist';
import { smtpApi } from './services';

export const reducers = combineReducers({
  auth: authReducer,
  [databaseApi.reducerPath]: databaseApi.reducer,
  [smtpApi.reducerPath]: smtpApi.reducer,
  sharedReducer: persistReducer(persistConfig, sharedReducer),
});

export const rootReducer = (state: any, action: any) => {
  if (action.type === 'LOGOUT') {
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace('/');
    return reducers(undefined, action);
  }
  return reducers(state, action);
};
