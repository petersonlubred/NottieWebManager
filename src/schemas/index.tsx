import * as Yup from 'yup';

export const signinSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

export const databaseSchema = Yup.object({
  databaseName: Yup.string().required('Database name is required'),
  databaseType: Yup.string().required('Database type is required'),
  server: Yup.string().required('server is required'),
  port: Yup.number()
    .typeError('only digit(s) is allowed')
    .required('port is required'),
  maxPoolSize: Yup.number()
    .typeError('only digit(s) is allowed')
    .required('server is required'),
  connectionTimeout: Yup.number()
    .typeError('only digit(s) is allowed')
    .required('connection timeout is required'),
  commandTimeout: Yup.number()
    .typeError('only digit(s) is allowed')
    .required('command timeout is required'),
  userId: Yup.string().required('username is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

export const userLoginSchema = Yup.object({
  firstname: Yup.string().required('first name is required'),
  lastname: Yup.string().required('last name is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export const EmailSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

export const RolesAndPrivilagesSchema = Yup.object({
  roleName: Yup.string().required('role name is required'),
  roleDescription: Yup.string().required('role description is required'),
});
export const AlertProfileSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  template: Yup.string().required('Template is required'),
  min_threshold: Yup.string().required('Min Threshold is required'),
  max_threshold: Yup.string().required('Max Threshold is required'),
});

export const AlertExceptionSchema = Yup.object({
  customerId: Yup.string().required('Customer Id is required'),
  accountNo: Yup.string().required('Account No is required'),
  alertMedium: Yup.string().required('Alert Medium is required'),
  recipient: Yup.string().required('Recipient is required'),
  profile: Yup.string().required('Profile is required'),
  status: Yup.string().required('Status is required'),
});

export const AlertExcludeSchema = Yup.object({
  label: Yup.string().required('Label is required'),
  operator: Yup.string().required('Operator is required'),
  textToExclude: Yup.string().required('Text to Exclude is required'),
});

export const SubscriptionSchema = Yup.object({
  customerId: Yup.string().required('Customer Id is required'),
  accountNo: Yup.string().required('Account No is required'),
  alertMedium: Yup.string().required('Alert Medium is required'),
  recipient: Yup.string().required('Recipient is required'),
  profile: Yup.string().required('Profile is required'),
  status: Yup.string().required('Status is required'),
});

export const DataSourceSchema = Yup.object({
  source_name: Yup.string().required('Source name is required'),
  databaseType: Yup.string().required('Database type is required'),
  server: Yup.string().required('server is required'),
  port: Yup.string().required('port is required'),
  maxPoolSize: Yup.string().required('server is required'),
  connectionTimeout: Yup.string().required('connection timeout is required'),
  username: Yup.string().required('username is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  status: Yup.string().required('Status is required'),
});

export const SMSCSchema = Yup.object({
  smsc_name: Yup.string().required('SMSC name is required'),
  server: Yup.string().required('server is required'),
  TXPort: Yup.string().required('TX Port is required'),
  noOfSessions: Yup.string().required('No of Sessions is required'),
  dataEncoding: Yup.string().required('Data Encoding is required'),
  npi: Yup.string().required('NPI is required'),
  onpi: Yup.string().required('ONPI is required'),
  ton: Yup.string().required('TON is required'),
  otin: Yup.string().required('OTIN is required'),
  dnpi: Yup.string().required('DNPI is required'),
  dton: Yup.string().required('DTON is required'),
  activate: Yup.string().required('Activate is required'),
});

export const SMSRouteSchema = Yup.object({
  route_name: Yup.string().required('Route name is required'),
  aggregator: Yup.string().required('Aggregator is required'),
  serviceType: Yup.string().required('Service Type is required'),
});

export const SMSRouteConfigSchema = Yup.object({
  route: Yup.string().required('Route is required'),
  aggregator: Yup.string().required('Aggregator is required'),
  routeType: Yup.string().required('Route Type is required'),
  country: Yup.string().required('Country is required'),
  network: Yup.string().required('Network is required'),
  accountType: Yup.string().required('Account Type is required'),
  transactionType: Yup.string().required('Transaction Type is required'),
  productCode: Yup.string().required('Product Code is required'),
});

export const SMTPSchema = Yup.object({
  server: Yup.string().required('server is required'),
  port: Yup.number()
    .typeError('only digit(s) is allowed')
    .required('port is required'),
  useSslTls: Yup.bool(),
  emailAddress: Yup.string().required('Email is required'),
  displayName: Yup.string().required('Display Name is required'),
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

export const SMTPRouteSchema = Yup.object({
  route_name: Yup.string().required('Route name is required'),
  smtp_name: Yup.string().required('SMTP name is required'),
  serviceType: Yup.string().required('Service Type is required'),
});
