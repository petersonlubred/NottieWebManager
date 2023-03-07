import { APIResponse } from './auth';

export type ITemplate = {
  id?: string;
  description: string;
};

export type ITemplateConfig = {
  templates: ITemplates[],
  serviceTypeId: string,
  serviceTypeName: string
}

export type ITemplates = {
  templateId: string,
  templateName: string,
  templateCode: string
}

export type ITemplateConfigSms = {
  smsCharge: number,
  senderId: string,
  smsBody: string
}

export type ITemplateConfigEmail = {
  subject: string,
  emailBodyContent: string,
  emailBodyContainer: string
}

export type ILookServiceType = {
  id: string,
  description: string
  name: string
}

export interface TemplatesResponse extends APIResponse<ITemplate[]> { }
export interface TemplateResponse extends APIResponse<ITemplate> { }
export interface TemplateConfigsResponse extends APIResponse<ITemplateConfig[]> { }
export interface TemplateConfigResponse extends APIResponse<ITemplateConfig> { }
export interface TemplateConfigSmsesResponse extends APIResponse<ITemplateConfigSms[]> { }
export interface TemplateConfigSmsResponse extends APIResponse<ITemplateConfigSms> { }
export interface TemplateConfigEmailsResponse extends APIResponse<ITemplateConfigEmail[]> { }
export interface TemplateConfigEmailResponse extends APIResponse<ITemplateConfigEmail> { }
export interface LookupServicesResponse extends APIResponse<ILookServiceType[]> { }
export interface LookupServiceResponse extends APIResponse<ILookServiceType> { }
