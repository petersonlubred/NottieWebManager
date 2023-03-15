import { APIResponse } from './auth';

export interface IServiceMapping {
  serviceType: string;
  serviceTypeId: string;
  serviceMapModels: any[];
}

export interface MappedType {
  dataSourceId: string;
  dataSourceName: string;
  databaseName: string;
  databaseServer: string;
  databasePort: number;
  serviceMapModels: IServiceMapping[];
}

export interface MappedResponse extends APIResponse<MappedType[]> {}
export interface ServiceMappingResponse extends APIResponse<IServiceMapping> {}
export interface ServiceMappingsResponse extends APIResponse<IServiceMapping[]> {}
