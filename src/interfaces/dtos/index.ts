import {
  IinitialAlertProfile,
  IinitialSiginin,
  IinitialUserLogin,
  IinitialAlertException,
  IinitialAlertExclude,
  IinitialSubscription,
  IinitialDataSourceType,
  IinitialBatchProcessing,
  IinitialAdDetails,
  IinitialSeqLog
} from './../index';
import { IinitialDatabase } from '..';

export const initialSigninValue: IinitialSiginin = {
  email: '',
  password: '',
};

export const initialDatabaseValue: IinitialDatabase = {
  databaseType: '',
  server: '',
  port: '',
  maxPoolSize: '',
  connectionTimeOut: '',
  commandTimeOut: '',
  username: '',
  password: '',
};

export const initialUserLoginValue: IinitialUserLogin = {
  firstname: '',
  lastname: '',
  password: '',
  confirmPassword: '',
};

export const initialAlertProfileValue: IinitialAlertProfile = {
  description: '',
  name: '',
  template: '',
  min_threshold: '',
  max_threshold: '',
};

export const initialAlertException: IinitialAlertException = {
  customerId: '',
  accountNo: '',
  profile: '',
  alertMedium: '',
  recipient: '',
  status: '',
};

export const initialSubscription: IinitialSubscription = {
  customerId: '',
  accountNo: '',
  profile: '',
  alertMedium: '',
  recipient: '',
  status: '',
};

export const initialAlertExclude: IinitialAlertExclude = {
  label: '',
  operator: '',
  textToExclude: '',
};

export const initialDataSource: IinitialDataSourceType = {
  source_name: '',
  databaseType: '',
  server: '',
  port: '',
  maxPoolSize: '',
  connectionTimeOut: '',
  username: '',
  password: '',
  status: '',
};

export const initialBatchProcessingValue:IinitialBatchProcessing={
  transactionProcessBatch:0,
  nonTransactionProcessingBatch:0,
  transactionCrawlerProcessBatch:0,
  nonTransactionCrawlerProcessBatch:0,
  otpProcessBatch:0,
  otpCrawlerProcessBatch:0,
  archiverBatch:0

}

export const initialAdDetials:IinitialAdDetails={
  username:'',
  password:'',
  adServer:''
}

export const initialSeqLog:IinitialSeqLog={
  transactionApiKey:'',
  transactionCrawlerApiKey:'',
  nonTransactionApiKey:'',
  nonTransactonCrawlerApiKey:'',
  otpApiKey:'',
  otpcrawlerApiKey:'',
  globalServiceApiKey:'',

}
