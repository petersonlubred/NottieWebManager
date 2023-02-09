import {
  IinitialAlertProfile,
  IinitialSiginin,
  IinitialUserLogin,
  IinitialAlertException,
  IinitialAlertExclude,
  IinitialSubscription,
} from './../index';
import { IinitialDatabase } from '..';

export const initialSigninValue: IinitialSiginin = {
  email: '',
  password: '',
};

export const initialDatabaseValue: IinitialDatabase = {
  databaseType: '',
  server: '',
  port: '',
  maxPoolSize: '',
  connectionTimeOut: '',
  commandTimeOut: '',
  username: '',
  password: '',
};

export const initialUserLoginValue: IinitialUserLogin = {
  firstname: '',
  lastname: '',
  password: '',
  confirmPassword: '',
};

export const initialAlertProfileValue: IinitialAlertProfile = {
  description: '',
  name: '',
  template: '',
  min_threshold: '',
  max_threshold: '',
};

export const initialAlertException: IinitialAlertException = {
  customerId: '',
  accountNo: '',
  profile: '',
  alertMedium: '',
  recipient: '',
  status: '',
};

export const initialSubscription: IinitialSubscription = {
  customerId: '',
  accountNo: '',
  profile: '',
  alertMedium: '',
  recipient: '',
  status: '',
};

export const initialAlertExclude: IinitialAlertExclude = {
  label: '',
  operator: '',
  textToExclude: '',
};
