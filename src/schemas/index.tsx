import * as Yup from 'yup';

export const signinSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

export const databaseSchema = Yup.object({
  databaseType: Yup.string().required('Database type is required'),
  server: Yup.string().required('server is required'),
  port: Yup.string().required('port is required'),
  maxPoolSize: Yup.string().required('server is required'),
  connectionTimeOut: Yup.string().required('connection timeout is required'),
  commandTimeOut: Yup.string().required('command timeout is required'),
  username: Yup.string().required('username is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

export const userLoginSchema = Yup.object({
  firstname: Yup.string().required('first name is required'),
  lastname: Yup.string().required('last name is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});
