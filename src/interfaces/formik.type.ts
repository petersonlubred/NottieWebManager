import { FormikProps } from 'formik';
import { Dispatch, RefObject, SetStateAction } from 'react';

export type FormikRefType<T> = FormikProps<T> & {
  ref: RefObject<FormikProps<T>>;
};

export type ISetState<T> = Dispatch<SetStateAction<T>>;
