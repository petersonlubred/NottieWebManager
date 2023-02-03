import { IinitialSiginin, IinitialUserLogin } from './../index';
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

export const initialUserLoginValue: IinitialUserLogin={
  firstname:'',
  lastname:'',
  password:'',
  confirmPassword:''
}
