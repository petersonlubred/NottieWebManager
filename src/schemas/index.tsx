import * as Yup from 'yup';

export const signinSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

export const databaseSchema = Yup.object({
  databaseType: Yup.string().required('Database type is required'),
  server: Yup.string().required('server is required'),
  port: Yup.string().required('port is required'),
  maxPoolSize: Yup.string().required('server is required'),
  connectionTimeOut: Yup.string().required('connection timeout is required'),
  commandTimeOut: Yup.string().required('command timeout is required'),
  username: Yup.string().required('username is required'),
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
  connectionTimeOut: Yup.string().required('connection timeout is required'),
  username: Yup.string().required('username is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  status: Yup.string().required('Status is required'),
});

export const BatchProcessingSchema = Yup.object({
  transactionProcessBatch: Yup.number().required(
    'Transaction batch name required'
  ),
  nonTransactionProcessingBatch: Yup.number().required(
    'Non Transaction batch required'
  ),
  transactionCrawlerProcessBatch: Yup.number().required(
    'Transaction crawler batch required'
  ),
  nonTransactionCrawlerProcessBatch: Yup.number().required(
    'Non transaction crawler batch required'
  ),
  otpProcessBatch: Yup.number().required('OTP process batch required'),
  otpCrawlerProcessBatch: Yup.number().required('OTP crawler batch required'),
  archiverBatch: Yup.number().required('Archiver batch required'),
});

export const AdDetailsSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  adServer: Yup.string().required('server is required'),
});

export const SeqLogSchema = Yup.object({
  transactionApiKey:Yup.string().required('Transaction key is required'),
  transactionCrawlerApiKey:Yup.string().required('Transaction crawler key is required'),
  nonTransactionApiKey :Yup.string().required('Non transaction key is required'),
  nonTransactonCrawlerApiKey:Yup.string().required('Non transaction crawler key is required'),
  otpApiKey:Yup.string().required('OTP key is required'),
  otpcrawlerApiKey:Yup.string().required('OTP crawler key is required'),
  globalServiceApiKey:Yup.string().required('Global service key is required'),

})
