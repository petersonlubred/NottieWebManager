import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

import { AuthResponse, LoginResponse } from '@/interfaces/auth';

import { setAuth } from '../slices/auth';

const sagas = [takeLatest('LOGIN_SUCCESS', logUserIn)];

type LoginType = {
  type: string;
  payload: LoginResponse;
};

export async function saveSession(data: AuthResponse) {
  const api = '/api/login';
  return saveToAPI(api, data);
}

export async function saveToAPI(api: string, data: AuthResponse) {
  const { data: res } = await axios.post(api, {
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });
  return res;
}

function* logUserIn({ payload: { data } }: LoginType) {
  try {
    // send request to save user in /api/users
    yield call(saveSession, data);
    yield put(setAuth(data));
  } catch (error) {
    // console.log('logUserIn error', error);
  }
}

export default sagas;
