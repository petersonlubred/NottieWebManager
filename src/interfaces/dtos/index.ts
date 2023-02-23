import { IinitialUserForm, IinitialRoleForm } from './../schema';
import {
  IinitialAlertProfile,
  IinitialSiginin,
  IinitialUserLogin,
  IinitialAlertException,
  IinitialAlertExclude,
  IinitialSubscription,
  IinitialDataSourceType,
  IinitialSMSCForm,
  IinitialSMSRouteForm,
  IinitialSMSRouteConfigForm,
  IinitialSMTPForm,
  IinitialSMTPRouteForm,
} from '../schema';
import { IinitialDatabase } from '../schema';

export const initialSigninValue: IinitialSiginin = {
  email: '',
  password: '',
};

export const initialDatabaseValue: IinitialDatabase = {
  databaseType: '',
  server: '',
  port: 0,
  maxPoolSize: 0,
  connectionTimeout: 0,
  commandTimeout: 0,
  userId: '',
  password: '',
  databaseName: '',
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

export const initialDataSource: IinitialDataSourceType = {
  source_name: '',
  databaseType: '',
  server: '',
  port: '',
  maxPoolSize: '',
  connectionTimeout: '',
  username: '',
  password: '',
  status: '',
};

export const initialSMSCValue: IinitialSMSCForm = {
  smsc_name: '',
  server: '',
  TXPort: '',
  noOfSessions: '',
  dataEncoding: '',
  npi: '',
  onpi: '',
  ton: '',
  otin: '',
  dnpi: '',
  dton: '',
  activate: '',
};

export const initialSMSRouteValue: IinitialSMSRouteForm = {
  route_name: '',
  aggregator: '',
  serviceType: '',
};

export const initialSMSRouteConfigValue: IinitialSMSRouteConfigForm = {
  route: '',
  aggregator: '',
  routeType: '',
  country: '',
  network: '',
  accountType: '',
  productCode: '',
  transactionType: '',
};

export const initialSMTPValue: IinitialSMTPForm = {
  server: '',
  port: 0,
  useSslTls: false,
  emailAddress: '',
  displayName: '',
  username: '',
  password: '',
};

export const initialSMTPRouteValue: IinitialSMTPRouteForm = {
  route_name: '',
  smtp_name: '',
  serviceType: '',
};

export const initialUserValue: IinitialUserForm = {
  emailAddress: '',
  authenticationType: '',
  firstName: '',
  lastName: '',
  otherNames: '',
  roleIds: [],
};

export const initialRoleValue: IinitialRoleForm = {
  roleName: '',
  description: '',
  rolePrivileges: [],
};
