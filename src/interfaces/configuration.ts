import { IinitialSMTPForm } from './../schemas/interface';
import { APIResponse } from './auth';

export interface Ismtp extends IinitialSMTPForm {
  smtpId: string;
  status: boolean;
}

export interface IDatabaseType {
  description: string;
  id: string;
  name: string;
}

export interface IDataSourceType {
  dataSourceId: string;
  description: string;
  status: boolean;
  databaseType: string;
  server: string;
  databaseName: string;
  userId: string;
  password: string;
  port: number;
  maxPoolSize: number;
  connectionTimeout: number;
  commandTimeout: number;
}

export interface SingleDataSourceResponse extends APIResponse<IDataSourceType> {}
export interface DataSourceResponse extends APIResponse<IDataSourceType[]> {}
export interface DatabaseTypeResponse extends APIResponse<IDatabaseType[]> {}
export interface SmtpsResponse extends APIResponse<Ismtp[]> {}
export interface SmtpResponse extends APIResponse<Ismtp> {}
