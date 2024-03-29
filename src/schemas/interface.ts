import * as Yup from 'yup';

import {
  AlertExceptionSchema,
  AlertExcludeSchema,
  AlertProfileSchema,
  databaseSchema,
  DataSourceSchema,
  emailTemplateSchema,
  RoleAndProvilegesSchema,
  signinSchema,
  SMSCSchema,
  SMSRouteConfigSchema,
  SMSRouteSchema,
  smsTemplateSchema,
  SMTPRouteSchema,
  SMTPSchema,
  SubscriptionSchema,
  templateSchema,
  userAccountSchema,
  userLoginSchema,
} from '@/schemas/schema';

import { resetPassworSchema } from './schema';

export type IinitialSiginin = Yup.InferType<typeof signinSchema>;
export type IinitialDatabase = Yup.InferType<typeof databaseSchema>;
export type IinitialUserLogin = Yup.InferType<typeof userLoginSchema>;
export type IinitialAlertProfile = Yup.InferType<typeof AlertProfileSchema>;
export type IinitialAlertException = Yup.InferType<typeof AlertExceptionSchema>;
export type IinitialAlertExclude = Yup.InferType<typeof AlertExcludeSchema>;
export type IinitialSubscription = Yup.InferType<typeof SubscriptionSchema>;
export type IinitialDataSourceType = Yup.InferType<typeof DataSourceSchema>;
export type IinitialSMSCForm = Yup.InferType<typeof SMSCSchema>;
export type IinitialSMSRouteForm = Yup.InferType<typeof SMSRouteSchema>;
export type IinitialSMSRouteConfigForm = Yup.InferType<typeof SMSRouteConfigSchema>;
export type IinitialSMTPForm = Yup.InferType<typeof SMTPSchema>;
export type IinitialSMTPRouteForm = Yup.InferType<typeof SMTPRouteSchema>;
export type IinitialUserForm = Yup.InferType<typeof userAccountSchema>;
export type IinitialRoleForm = Yup.InferType<typeof RoleAndProvilegesSchema>;
export type IinitialResetPassword = Yup.InferType<typeof resetPassworSchema>;
export type IDatasourceForm = Yup.InferType<typeof DataSourceSchema>;
export type IinitialSmsTemplate = Yup.InferType<typeof smsTemplateSchema>;
export type IinitialEmailTemplate = Yup.InferType<typeof emailTemplateSchema>;
export type IinitialTemplate = Yup.InferType<typeof templateSchema>;
