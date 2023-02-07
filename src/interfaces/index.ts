import { databaseSchema, signinSchema, userLoginSchema } from '@/schemas';
import * as Yup from 'yup';

export type IinitialSiginin = Yup.InferType<typeof signinSchema>;
export type IinitialDatabase = Yup.InferType<typeof databaseSchema>;
export type IinitialUserLogin = Yup.InferType<typeof userLoginSchema>;

export type userAccountType = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  access_status: boolean;
  role: string[];
  authentication_type: string;
};
export type roleType = {
  id: number;
  role_name: string;
  description: string;
  number: string;
};
