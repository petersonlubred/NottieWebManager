import { APIResponse } from './auth';

export type ITemplate = {
    id?: string;
    description: string;
};

export interface TemplatesResponse extends APIResponse<ITemplate[]> { }
export interface TemplateResponse extends APIResponse<ITemplate> { }
