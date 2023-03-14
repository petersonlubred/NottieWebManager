import { APIResponse } from './auth';

export type IDashboardSmsEmailMessageCount = {
  serviceType: string;
  messageTypes: {
    description: string;
    totalCount: number;
  }[];
};

export type IDashboardSmsEmailSmsDeliveryStatusBarChart = {
  serviceType: string;
  deliveryStatuses: {
    status: string;
    totalCount: number;
  }[];
};

export type IDashboardSmsEmailSmsOutboundSmc = {
  smscName: string;
  tx: number;
  rx: number;
  txRx: number;
  tps: string;
  tpsPerformance: number;
};

export type IDashboardSmsEmailSmsSmsNetworkCountDonutChart = {
  serviceType: string;
  smsDelivery: {
    network: string;
    count: number;
  }[];
  totalCount: number;
};

export type IDashboardSmsEmailEmailDeliveryStatusColumnChart = {
  serviceType: string;
  deliveryStatuses: {
    status: string;
    totalCount: number;
  }[];
};

export type IDashboardBackgroundService = {
  serviceType: string;
  queueMonitor: {
    description: string;
    tpsformance: number;
    queueCountPerformance: number;
    queueCount: number;
    tps: number;
  }[];
};

export type IDashboardBackgroundServiceMicroServices = {
  serviceType: string;
  sourceMicroservices: {
    microserviceId: string;
    microserviceDescription: string;
    microserviceType: string;
    lapse: string;
    performanceStatus: number;
  }[];
  emailMicroservices: {
    microserviceId: string;
    microserviceDescription: string;
    microserviceType: string;
    lapse: string;
    performanceStatus: number;
  }[];
  smsMicroservices: {
    microserviceId: string;
    microserviceDescription: string;
    microserviceType: string;
    lapse: string;
    performanceStatus: number;
  }[];
};

export type IDashboardBackgroundServiceMicroserviceHeartBeat = {
  microservices: IDashboardBackgroundServiceMicroServices[];
  archiveMicroservices: {
    microserviceId: string;
    microserviceDescription: string;
    microserviceType: string;
    lapse: string;
    performanceStatus: number;
  }[];
  totalHeartbeatCount: {
    ok: number;
    check: number;
    critical: number;
    idle: number;
  };
};

export type IDashboardBackgroundServiceSla = {
  serviceType: string;
  slaProgressStatuses: {
    percentage: number;
    timeBound: string;
    count: number;
  }[];
};

export interface DashboardSmsEmailMessageCountsResponse extends APIResponse<IDashboardSmsEmailMessageCount[]> {}
export interface DashboardSmsEmailMessageCountResponse extends APIResponse<IDashboardSmsEmailMessageCount> {}
export interface IDashboardSmsEmailSmsDeliveryStatusBarChartsResponse extends APIResponse<IDashboardSmsEmailSmsDeliveryStatusBarChart[]> {}
export interface IDashboardSmsEmailSmsDeliveryStatusBarChartResponse extends APIResponse<IDashboardSmsEmailSmsDeliveryStatusBarChart> {}
export interface IDashboardSmsEmailSmsSmsNetworkCountDonutChartsResponse extends APIResponse<IDashboardSmsEmailSmsSmsNetworkCountDonutChart[]> {}
export interface IDashboardSmsEmailSmsSmsNetworkCountDonutChartResponse extends APIResponse<IDashboardSmsEmailSmsSmsNetworkCountDonutChart> {}
export interface IDashboardSmsEmailEmailDeliveryStatusColumnChartsResponse extends APIResponse<IDashboardSmsEmailEmailDeliveryStatusColumnChart[]> {}
export interface IDashboardSmsEmailEmailDeliveryStatusColumnChartResponse extends APIResponse<IDashboardSmsEmailEmailDeliveryStatusColumnChart> {}
export interface IDashboardSmsEmailSmsOutboundSmcsResponse extends APIResponse<IDashboardSmsEmailSmsOutboundSmc[]> {}
export interface IDashboardSmsEmailSmsOutboundSmcResponse extends APIResponse<IDashboardSmsEmailSmsOutboundSmc> {}
export interface IDashboardBackgroundServicesResponse extends APIResponse<IDashboardBackgroundService[]> {}
export interface IDashboardBackgroundServiceResponse extends APIResponse<IDashboardBackgroundService> {}
export interface IDashboardBackgroundServiceMicroserviceHeartBeatResponse extends APIResponse<IDashboardBackgroundServiceMicroserviceHeartBeat> {}
export interface IDashboardBackgroundServicesSlaResponse extends APIResponse<IDashboardBackgroundServiceSla[]> {}
export interface IDashboardBackgroundServiceSlaResponse extends APIResponse<IDashboardBackgroundServiceSla> {}
