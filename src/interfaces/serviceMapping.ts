import { APIResponse } from './auth';

export interface IServiceMapping {
    serviceType: string;
    serviceTypeId: string;
    serviceMapModels: any[]
}


export interface ServiceMappingResponse extends APIResponse<IServiceMapping> { }
export interface ServiceMappingsResponse extends APIResponse<IServiceMapping[]> { }
