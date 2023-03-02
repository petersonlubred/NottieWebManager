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
export type PathType = {
  start: string;
  end: string;
  extraPath?: string;
};

export type IPageQuery = {
  pageNumber?: number;
  pageSize?: number;
  customerId?: string;
  accountNo?: string;
  email?: string;
  mobile?: string;
};

export const initialPageQuery: IPageQuery = {
  pageNumber: 1,
  pageSize: 10,
  customerId: '',
  accountNo: '',
  email: '',
  mobile: '',
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

export interface TransactionResponse extends APIResponseWithMeta<TransactionData[]> {}
