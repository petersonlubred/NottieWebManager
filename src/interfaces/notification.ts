import { APIResponse } from '@/interfaces/auth';
export interface TransactionData {
  transactionId: string;
  accountNo: string;
  customerId: string;
  email: string;
  mobile: string;
  transactionAmount: string;
  balanceAmount: string;
  bookBalanceAmount: string;
  transactionDate: string;
  narration: string;
  longRemark: string;
  receiverName: string;
  referenceNo: string;
  recieverBank: string;
  recieverAmount: string;
  sendReceipt: boolean;
  productCode: string;
  transactionType: string;
  accountType: string;
  processRemark: string;
  processedDate: string;
  param1: string;
  param2: string;
  param3: string;
  param4: string;
  param5: string;
  entryDate: string;
  currencyCode: string;
}
export interface SmsData {
  entryDate: string;
  messageId: string;
  accountNo: string;
  customerId: string;
  mobile: string;
  retryCount: string;
  processRemark: string;
  precessedDate: string;
  messageStatus: boolean;
  sentDate: string;
  natworkName: string;
  country: string;
  aggrigator: string;
  outboundMessageId: string;
  deliveryStatus: string;
  deliveryStatusCode: string;
  deliveryDate: string;
  networkSentDate: string;
}

export interface EmailData {
  entryDate: string;
  messageId: string;
  accountNo: string;
  customerId: string;
  email: string;
  retryCount: string;
  processRemark: string;
  precessedDate: string;
  sentDate: string;
  subject: string;
}
export interface NonTransaction {
  noneTransactionId: string;
  accountNo: string;
  customerId: string;
  email: string;
  mobile: string;
  sendReceipt: boolean;
  processRemark: string;
  processedDate: string;
  entryDate: string;
}

export interface OtpData {
  otpId: string;
  accountNo: string;
  customerId: string;
  email: string;
  mobile: string;
  useTemplate: boolean;
  processRemark: string;
  processedDate: string;
  entryDate: string;
}

export type PathType = {
  start?: string;
  end?: string;
  extraPath?: string;
};

export type IPageQuery = {
  pageNumber?: number;
  pageSize?: number;
  customerId?: string;
  accountNo?: string;
  email?: string;
  mobile?: string;
  notArchive?: boolean | string;
};

export const initialPageQuery: IPageQuery = {
  pageNumber: 1,
  pageSize: 10,
  customerId: '',
  accountNo: '',
  email: '',
  mobile: '',
  notArchive: true,
};

export interface APIResponseWithMeta<T> {
  status: string;
  message: string;
  data: {
    data: T;
    meta: {
      pageNumber: number;
      pageSize: number;
      totalCount: number;
    };
  };
}
export interface SingleEmailResponse
  extends APIResponse<{
    subject: string;
    email: string;
  }> {}
export interface SingleSmsResponse
  extends APIResponse<{
    sms: string;
  }> {}

export interface TransactionResponse extends APIResponseWithMeta<TransactionData[]> {}
export interface SmsResponse extends APIResponseWithMeta<SmsData[]> {}
export interface SmsResponses extends APIResponse<SmsData[]> {}
export interface EmailResponses extends APIResponse<EmailData[]> {}
export interface EmailResponse extends APIResponseWithMeta<EmailData[]> {}
export interface EmailResponseById extends APIResponse<EmailData[]> {}
export interface OtpResponse extends APIResponseWithMeta<OtpData[]> {}
export interface NonTransactionResponse extends APIResponseWithMeta<NonTransaction[]> {}
