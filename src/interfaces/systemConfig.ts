import { APIResponse } from './auth';

export interface ISystemConfig {
  configMenuItem: string;
  configMenuItemCode: string;
}
export interface IConfigMenu {
  configId: string;
  configValue: string;
  fieldLable: string;
  fieldType: 'CHECKBOX' | 'TEXT' | 'NUMBER' | 'RADIO' | 'TEXTAREA';
  lookupEndpoint: string;
}
export interface ConfigsResponse extends APIResponse<ISystemConfig[]> {}
export interface ConfigMenuResponse extends APIResponse<IConfigMenu[]> {}
