import * as Yup from 'yup';

export const signinSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

export const userAccountSchema = Yup.object({
  emailAddress: Yup.string().email('Invalid email').required('Email is required'),
  authenticationType: Yup.string().required('Authentication type is required'),
  roles: Yup.array().min(1, 'user must be assigned at least 1 role ').required('required'),
  firstName: Yup.string().when('authenticationType', {
    is: (val: string) => val === 'AD',
    then: Yup.string().required('first name is required'),
  }),
  lastName: Yup.string().when('authenticationType', {
    is: (val: string) => val === 'AD',
    then: Yup.string().required('last name is required'),
  }),
});

export const RoleAndProvilegesSchema = Yup.object({
  roleName: Yup.string().required('role name is required'),
  description: Yup.string().required('description is required'),
  rolePrivileges: Yup.array(),
});

export const databaseSchema = Yup.object({
  databaseName: Yup.string().required('Database name is required'),
  databaseType: Yup.string().required('Database type is required'),
  server: Yup.string().required('server is required'),
  port: Yup.number().typeError('only digit(s) is allowed').required('port is required'),
  maxPoolSize: Yup.number().typeError('only digit(s) is allowed').required('server is required'),
  connectionTimeout: Yup.number().typeError('only digit(s) is allowed').required('connection timeout is required'),
  commandTimeout: Yup.number().typeError('only digit(s) is allowed').required('command timeout is required'),
  userId: Yup.string().required('username is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

export const userLoginSchema = Yup.object({
  firstName: Yup.string().required('first name is required'),
  lastName: Yup.string().required('last name is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export const resetPassworSchema = Yup.object({
  tempPassword: Yup.string().required('Temp Password is required'),
  newPassword: Yup.string().min(8, 'Password must be at least 8 characters').required('New Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export const EmailSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

export const AlertProfileSchema = Yup.object({
  profileName: Yup.string().required('Name is required'),
  templateId: Yup.string().required('Template is required'),
  emailMinThreshhold: Yup.number().required('Email Min Threshold is required'),
  smsMinThreshhold: Yup.number().required('Sms Min Threshold is required'),
  status: Yup.boolean(),
});

export const AlertExceptionSchema = Yup.object({
  customerId: Yup.string().required('Customer Id is required'),
  accountNo: Yup.string().required('Account No is required'),
  alertType: Yup.string().required('Alert Type is required'),
  recipient: Yup.string().required('Recipient is required'),
  alertProfileId: Yup.string().required('Alert Profile is required'),
  status: Yup.boolean(),
});

export const AlertExcludeSchema = Yup.object({
  excludeType: Yup.string().required('Exclude type is required'),
  excludeValue: Yup.string().required('Exclude value is required'),
  excludeOperator: Yup.string().required('Exclude operator is required'),
});

export const SubscriptionSchema = Yup.object({
  customerId: Yup.string().required('Customer Id is required'),
  accountNo: Yup.string().required('Account No is required'),
  alertType: Yup.string().required('Alert Type is required'),
  recipient: Yup.string().required('Recipient is required'),
  alertProfileId: Yup.string().required('Alert Profile is required'),
});

export const DataSourceSchema = Yup.object({
  databaseName: Yup.string().required('Source name is required'),
  databaseType: Yup.string().required('Database type is required'),
  server: Yup.string().required('server is required'),
  port: Yup.string().required('port is required'),
  maxPoolSize: Yup.string().required('server is required'),
  connectionTimeout: Yup.string().required('connection timeout is required'),
  commandTimeout: Yup.string().required('command timeout is required'),
  userId: Yup.string().required('username is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  status: Yup.boolean(),
  description: Yup.string().required('description is required'),
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
  port: Yup.number().typeError('only digit(s) is allowed').required('port is required'),
  useSslTls: Yup.bool(),
  emailAddress: Yup.string().required('Email is required'),
  displayName: Yup.string().required('Display Name is required'),
  username: Yup.string().required('Username is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

export const SMTPRouteSchema = Yup.object({
  route_name: Yup.string().required('Route name is required'),
  smtp_name: Yup.string().required('SMTP name is required'),
  serviceType: Yup.string().required('Service Type is required'),
});

export const smsTemplateSchema = Yup.object({
  senderId: Yup.string().required('Sender Id is required'),
  smsBody: Yup.string().required('Sms Body is required'),
  smsCharge: Yup.number().required('Sms Charge is required'),
  serviceTypeId: Yup.string().required('Service Type is required')
})

export const emailTemplateSchema = Yup.object({
  subject: Yup.string().required('Subject is required'),
  emailBodyContent: Yup.string().required('Email Body is required'),
  emailBodyContainer: Yup.string().required('Email body container is required'),
  serviceTypeId: Yup.string().required('Service Type is required')
})

export const templateSchema = Yup.object({
  serviceTypeId: Yup.string().required('Service Type is required'),
  templateName: Yup.string().required('Template Name is required'),
})