import { combineReducers } from 'redux';
// import persistReducer from 'redux-persist/es/persistReducer';
import { authApi } from './services/index';
import authReducer, { persistConfig } from './slices/auth';
import sharedReducer from './slices/shared';

export const reducers = combineReducers({
  authStore: authReducer,
  sharedReducer,
  [authApi.reducerPath]: authApi.reducer,
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
