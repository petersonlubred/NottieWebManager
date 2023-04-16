import { IinitialSMSCForm, IinitialSMSRouteConfigForm, IinitialSMSRouteForm, IinitialSMTPForm, IinitialSMTPRouteForm } from './../schemas/interface';
import { APIResponse } from './auth';

export interface Ismtp extends IinitialSMTPForm {
  smtpId: string;
  status: boolean;
}

export interface SmtpRoute extends IinitialSMTPRouteForm {
  smtpRouteId: string;
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
  countryId: string;
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

export type boardType = {
  id: string;
  title: string;
  items: ServiceType[];
};

export type ServiceModelType = {
  serviceName?: string;
  serviceId?: string;
  id?: number;
};

export type ServiceType = {
  title: string;
  serviceMapModels: ServiceModelType[];
};

export interface SingleDataSourceResponse extends APIResponse<IDataSourceType> {}
export interface DataSourceResponse extends APIResponse<IDataSourceType[]> {}
export interface DatabaseTypeResponse extends APIResponse<IDatabaseType[]> {}
export interface SmtpsResponse extends APIResponse<Ismtp[]> {}
export interface SmtpResponse extends APIResponse<Ismtp> {}

export interface SmtpRouteResponsez extends APIResponse<SmtpRoute[]> {}
export interface SmtpRouteResponse extends APIResponse<SmtpRoute> {}

export interface SmscResponse extends APIResponse<Smsc> {}
export interface SmscResponsez extends APIResponse<Smsc[]> {}

export interface SmscRouteResponse extends APIResponse<SmscRoute> {}
export interface SmscRouteResponsez extends APIResponse<SmscRoute[]> {}

export interface SmscRouteConfigResponse extends APIResponse<SmscRouteConfig> {}
export interface SmscRouteConfigResponsez extends APIResponse<SmscRouteConfig[]> {}
