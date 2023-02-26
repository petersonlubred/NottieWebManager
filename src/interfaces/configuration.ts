import { IinitialSMTPForm } from './../schemas/interface';
import { APIResponse } from './auth';

export interface Ismtp extends IinitialSMTPForm {
  smtpId: string;
  status: boolean;
}

export interface SmtpsResponse extends APIResponse<Ismtp[]> {}
export interface SmtpResponse extends APIResponse<Ismtp> {}
