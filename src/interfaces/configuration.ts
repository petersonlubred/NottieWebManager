import { IinitialSMSCForm, IinitialSMTPForm } from './../schemas/interface';
import { APIResponse } from './auth';

export interface Ismtp extends IinitialSMTPForm {
  smtpId: string;
  status: boolean;
}
export interface Smsc extends IinitialSMSCForm {
  smscId: string;
  smscRouteId: string;
}

export interface SmtpsResponse extends APIResponse<Ismtp[]> {}
export interface SmtpResponse extends APIResponse<Ismtp> {}

export interface SmscResponse extends APIResponse<Smsc> {}
export interface SmscResponsez extends APIResponse<Smsc[]> {}
