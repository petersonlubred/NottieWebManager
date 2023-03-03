import { APIResponse } from './auth';

export interface AlertProfileData {
  templateId: string;
  templateName: string;
  hideBalance: boolean;
  maskAccount: boolean;
  emailMinThreshhold: number;
  smsMinThreshhold: number;
  enableEmail: boolean;
  enableSms: boolean;
  profileName: string;
  status: boolean;
  smsCost: number;
  alertProfileId?: string;
}

export interface AlertExceptionData {
  customerId: string;
  accountNo: string;
  recipient: string;
  status: boolean;
  alertType: string;
  alertExceptionId?: string;
}

export interface AlertExclusionData {
  excludeType: string;
  excludeValue: string;
  excludeOperator: string;
  alertExcludeId?: string;
}

export interface AlertSubscriptionData {
  customerId: string;
  accountNo: string;
  recipient: string;
  status: boolean;
  alertType: string;
  alertSubscriptionId?: string;
}

export type ILookupAlertProfile = {
  id?: string;
  name: string;
  description: string;
};

export type ILookupAlertExcludeType = {
  id?: string;
  name: string;
  description: string;
};

export type ILookupAlertExcludeOperator = {
  id?: string;
  name: string;
  description: string;
};

export type ILookupAlertType = {
  id?: string;
  name: string;
  description: string;
};

export interface AlertProfilesResponse extends APIResponse<AlertProfileData[]> {}
export interface AlertProfileResponse extends APIResponse<AlertProfileData> {}
export interface AlertExceptionsResponse extends APIResponse<AlertExceptionData[]> {}
export interface AlertExceptionResponse extends APIResponse<AlertExceptionData> {}
export interface AlertExclusionsResponse extends APIResponse<AlertExclusionData[]> {}
export interface AlertExclusionResponse extends APIResponse<AlertExclusionData> {}
export interface AlertSubscriptionsResponse extends APIResponse<AlertSubscriptionData[]> {}
export interface AlertSubscriptionResponse extends APIResponse<AlertSubscriptionData> {}
