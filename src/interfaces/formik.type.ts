import { FormikProps } from 'formik';
import { RefObject } from 'react';

export type FormikRefType<T> = FormikProps<T> & {
  ref: RefObject<FormikProps<T>>;
};
