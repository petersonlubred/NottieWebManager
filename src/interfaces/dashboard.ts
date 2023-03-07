import { APIResponse } from './auth';

export type IDashboardSmsEmailMessageCount = {
    data: {
        serviceType: string;
        messageTypes: {
            description: string
            totalCount: number
        }[]
    }[]
};

export type IDashboardSmsEmailSmsDeliveryStatusBarChart = {
    data: {
        serviceType: string;
        deliveryStatuses: {
            description: string
            totalCount: number
        }[]
    }[]
};

export type IDashboardSmsEmailSmsOutboundSmc = {
    data: {
        serviceType: string;
        deliveryStatuses: {
            description: string
            totalCount: number
        }[]
    }[]
};

export type IDashboardSmsEmailSmsSmsNetworkCountDonutChart = {
    data: {
        serviceType: string;
        smsDelivery: {
            description: string
        }[]
        totalCount: number
    }[]
};

export type IDashboardSmsEmailEmailDeliveryStatusColumnChart = {
    data: {
        serviceType: string;
        deliveryStatuses: {
            description: string
            totalCount: number
        }[]
    }[]
};

export interface DashboardSmsEmailMessageCountsResponse extends APIResponse<IDashboardSmsEmailMessageCount[]> { }
export interface DashboardSmsEmailMessageCountResponse extends APIResponse<IDashboardSmsEmailMessageCount> { }
export interface IDashboardSmsEmailSmsDeliveryStatusBarChartsResponse extends APIResponse<IDashboardSmsEmailSmsDeliveryStatusBarChart[]> { }
export interface IDashboardSmsEmailSmsDeliveryStatusBarChartResponse extends APIResponse<IDashboardSmsEmailSmsDeliveryStatusBarChart> { }
export interface IDashboardSmsEmailSmsSmsNetworkCountDonutChartsResponse extends APIResponse<IDashboardSmsEmailSmsSmsNetworkCountDonutChart[]> { }
export interface IDashboardSmsEmailSmsSmsNetworkCountDonutChartResponse extends APIResponse<IDashboardSmsEmailSmsSmsNetworkCountDonutChart> { }
export interface IDashboardSmsEmailEmailDeliveryStatusColumnChartsResponse extends APIResponse<IDashboardSmsEmailEmailDeliveryStatusColumnChart[]> { }
export interface IDashboardSmsEmailEmailDeliveryStatusColumnChartResponse extends APIResponse<IDashboardSmsEmailEmailDeliveryStatusColumnChart> { }
export interface IDashboardSmsEmailSmsOutboundSmcsResponse extends APIResponse<IDashboardSmsEmailSmsOutboundSmc[]> { }
export interface IDashboardSmsEmailSmsOutboundSmcResponse extends APIResponse<IDashboardSmsEmailSmsOutboundSmc> { }
