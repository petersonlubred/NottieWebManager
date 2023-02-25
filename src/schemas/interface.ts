import { RoleAndProvilegesSchema, userAccountSchema } from './schema';
import {
  AlertExceptionSchema,
  AlertExcludeSchema,
  DataSourceSchema,
  SMSCSchema,
  SMSRouteConfigSchema,
  SMSRouteSchema,
  SMTPRouteSchema,
  SMTPSchema,
  SubscriptionSchema,
} from './schema';
import {
  AlertProfileSchema,
  databaseSchema,
  signinSchema,
  userLoginSchema,
} from '@/schemas/schema';
import * as Yup from 'yup';

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
export type IinitialSMSRouteConfigForm = Yup.InferType<
  typeof SMSRouteConfigSchema
>;
export type IinitialSMTPForm = Yup.InferType<typeof SMTPSchema>;
export type IinitialSMTPRouteForm = Yup.InferType<typeof SMTPRouteSchema>;
export type IinitialUserForm = Yup.InferType<typeof userAccountSchema>;
export type IinitialRoleForm = Yup.InferType<typeof RoleAndProvilegesSchema>;
