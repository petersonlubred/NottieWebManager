import { IinitialSMSCForm, IinitialSMSRouteConfigForm, IinitialSMSRouteForm, IinitialSMTPForm } from './../schemas/interface';
import { APIResponse } from './auth';

export interface Ismtp extends IinitialSMTPForm {
  smtpId: string;
  status: boolean;
}
export interface Smsc extends IinitialSMSCForm {
  smscId?: string;
  smscRouteId?: string;
  status: boolean;
}

export interface SmscRoute extends IinitialSMSRouteForm {
  smscRouteId?: string;
}

export interface SmscRouteConfig extends IinitialSMSRouteConfigForm {
  smscRouteConfigId: string;
}

export interface SmtpsResponse extends APIResponse<Ismtp[]> {}
export interface SmtpResponse extends APIResponse<Ismtp> {}

export interface SmscResponse extends APIResponse<Smsc> {}
export interface SmscResponsez extends APIResponse<Smsc[]> {}

export interface SmscRouteResponse extends APIResponse<SmscRoute> {}
export interface SmscRouteResponsez extends APIResponse<SmscRoute[]> {}

export interface SmscRouteConfigResponse extends APIResponse<SmscRouteConfig> {}
export interface SmscRouteConfigResponsez extends APIResponse<SmscRouteConfig[]> {}
