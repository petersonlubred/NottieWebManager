import {
  IinitialAlertException,
  IinitialAlertExclude,
  IinitialAlertProfile,
  IinitialDatabase,
  IinitialDataSourceType,
  IinitialEmailTemplate,
  IinitialResetPassword,
  IinitialRoleForm,
  IinitialSiginin,
  IinitialSMSCForm,
  IinitialSMSRouteConfigForm,
  IinitialSMSRouteForm,
  IinitialSmsTemplate,
  IinitialSMTPForm,
  IinitialSMTPRouteForm,
  IinitialSubscription,
  IinitialTemplate,
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
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
};

export const initialAlertProfileValue: IinitialAlertProfile = {
  profileName: '',
  templateId: '',
  emailMinThreshhold: 0,
  smsMinThreshhold: 0,
  status: false,
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
  databaseName: '',
  databaseType: '',
  server: '',
  port: '',
  maxPoolSize: '',
  connectionTimeout: '',
  commandTimeout: '',
  userId: '',
  password: '',
  status: true,
  description: '',
};

export const initialSMSCValue: IinitialSMSCForm = {
  smscName: '',
  hostAddress: '',
  dataEncoding: '',
  connectionMode: 1,
  port: 0,
  sessions: 0,
  username: '',
  password: '',
  useSsl: false,
  systemType: '',
  npi: 0,
  ton: 0,
  oNpi: 0,
  oTon: 0,
  dNpi: 0,
  dTon: 0,
  status: true,
};

export const initialSMSRouteValue: IinitialSMSRouteForm = {
  route_name: '',
  aggregator: '',
  serviceType: '',
};

export const initialSMSRouteConfigValue: IinitialSMSRouteConfigForm = {
  smscRoute: '',
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

export const initialResetValue: IinitialResetPassword = {
  newPassword: '',
  tempPassword: '',
  confirmPassword: '',
};

export const initialSmsTemplate: IinitialSmsTemplate = {
  senderId: '',
  smsBody: '',
  serviceTypeId: '',
  smsCharge: 0,
};

export const initialEmailTemplate: IinitialEmailTemplate = {
  serviceTypeId: '',
  emailBodyContainer: '',
  emailBodyContent: '',
  subject: '',
};

export const initialTemplate: IinitialTemplate = {
  serviceTypeId: '',
  templateName: '',
};
