import { databaseSchema, signinSchema } from '@/schemas';
import * as Yup from 'yup';

export type IinitialSiginin = Yup.InferType<typeof signinSchema>;
export type IinitialDatabase = Yup.InferType<typeof databaseSchema>;
