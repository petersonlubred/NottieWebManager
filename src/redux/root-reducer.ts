import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

<<<<<<< HEAD
import { roleApi, smtpApi, userApi, smscApi } from './api';
=======
import { alertApi, roleApi, smtpApi, userApi } from './api';
>>>>>>> 7bd1e48e08b7c9539b30488701f6b38734fdaf9b
import { databaseApi } from './api/databaseApi';
import authReducer, { persistConfig } from './slices/auth';
import sharedReducer from './slices/util';

export const reducers = combineReducers({
  auth: authReducer,
  [databaseApi.reducerPath]: databaseApi.reducer,
  [smtpApi.reducerPath]: smtpApi.reducer,
  [roleApi.reducerPath]: roleApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
<<<<<<< HEAD
  [smscApi.reducerPath]:smscApi.reducer,
=======
  [alertApi.reducerPath]: alertApi.reducer,
>>>>>>> 7bd1e48e08b7c9539b30488701f6b38734fdaf9b
  sharedReducer: persistReducer(persistConfig, sharedReducer),
});

export const rootReducer = (state: any, action: any) => {
  return reducers(state, action);
};
