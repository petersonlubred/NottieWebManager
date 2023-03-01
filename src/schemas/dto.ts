import {
  IinitialAlertException,
  IinitialAlertExclude,
  IinitialAlertProfile,
  IinitialDatabase,
  IinitialDataSourceType,
  IinitialRoleForm,
  IinitialSiginin,
  IinitialSMSCForm,
  IinitialSMSRouteConfigForm,
  IinitialSMSRouteForm,
  IinitialSMTPForm,
  IinitialSMTPRouteForm,
  IinitialSubscription,
  IinitialUserForm,
  IinitialUserLogin,
} from './interface';

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
  profileName: '',
  templateId: '',
  emailMinThreshhold: 0,
  smsMinThreshhold: 0,
  status: false
};

export const initialAlertException: IinitialAlertException = {
  customerId: '',
  accountNo: '',
  alertProfileId: '',
  alertType: '',
  recipient: '',
  status: false,
};

export const initialSubscription: IinitialSubscription = {
  customerId: '',
  accountNo: '',
  alertProfileId: '',
  alertType: '',
  recipient: '',
};

export const initialAlertExclude: IinitialAlertExclude = {
  excludeType: '',
  excludeOperator: '',
  excludeValue: '',
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
  roles: [],
  firstName: '',
  lastName: '',
};

export const initialRoleValue: IinitialRoleForm = {
  roleName: '',
  description: '',
  rolePrivileges: [],
};
