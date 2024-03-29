import { ArrowRight } from '@carbon/icons-react';
import axios from 'axios';
import { FormGroup, Loading, PasswordInput, TextInput } from 'carbon-components-react';
import { Field, Form, Formik } from 'formik';
import { NextRouter, useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import Button from '@/components/shared/Button';
import config from '@/config/config';
import { setAuth } from '@/redux/slices/auth';
import { initialSigninValue } from '@/schemas/dto';
import { signinSchema } from '@/schemas/schema';
import { px } from '@/utils';

const Signin = () => {
  const [loading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();
  const router: NextRouter = useRouter();

  const handleSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${config.api_url}/api/Authentication/Login`,
        { username: values?.email, password: values?.password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      dispatch(setAuth(res?.data?.data));
      //TODO: Remove this line after fixing the persist state bug
      localStorage.setItem('persist:userAuth', JSON.stringify(res?.data?.data));
      setIsLoading(false);
      router.push('/dashboard');
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <SignInContainer>
      <HeaderTitle>Sign In to Continue</HeaderTitle>
      <Formik initialValues={initialSigninValue} validationSchema={signinSchema} onSubmit={handleSubmit}>
        {({ errors, touched, isValid, values, setFieldTouched, handleSubmit }) => (
          <Form>
            <FormGroup legendText="">
              <Field name="email">
                {({ field }: any) => (
                  <TextInput
                    {...field}
                    type="email"
                    id="email-input"
                    labelText="Email"
                    placeholder="input text"
                    onKeyUp={() => setFieldTouched('email', true)}
                    invalid={Boolean(touched.email && errors.email)}
                    invalidText={errors.email}
                  />
                )}
              </Field>
              <PasswordContainer>
                <Field name="password">
                  {({ field }: any) => (
                    <PasswordInput
                      {...field}
                      type="password"
                      id="password-input"
                      labelText="Password"
                      placeholder="Password"
                      onKeyUp={() => setFieldTouched('password', true)}
                      invalid={Boolean(touched.password && errors.password)}
                      invalidText={errors.password}
                    />
                  )}
                </Field>
                <ResetPasswordValue>Reset Password</ResetPasswordValue>
              </PasswordContainer>
              <Button
                renderIcon={(props: any) =>
                  loading ? <Loading size={24} {...props} small description="Active loading indicator" withOverlay={false} /> : <ArrowRight {...props} size={24} />
                }
                disabled={!isValid || !values?.email || !values?.password || loading}
                fullWidth
                buttonLabel={'Login'}
                handleClick={handleSubmit}
              />
            </FormGroup>
            <Paragraph>
              Need help? Reach out at <ContactValue>support@nottie.net</ContactValue>
            </Paragraph>
          </Form>
        )}
      </Formik>
    </SignInContainer>
  );
};

export default Signin;

const SignInContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: calc(100vh - ${px(64)});

  form {
    width: ${px(354)};
    fieldset {
      > div {
        margin-bottom: ${px(32)};
      }
    }
  }
  label {
    color: ${({ theme }) => theme.colors.lightText};
  }
  input {
    height: ${px(48)};
    width: 100%;
    border: none;
    background-color: ${({ theme }) => theme.colors.bgPrimaryLight};
    color: ${({ theme }) => theme.colors.white};
    ::placeholder {
      color: ${({ theme }) => theme.colors.darkPrimary20};
    }
  }
`;

const HeaderTitle = styled.h1`
  font-family: ${({ theme }) => theme.fontFamilies.heading};
  font-size: ${px(32)};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white};
  margin: 0;
  margin-bottom: ${px(32)};
`;

const Paragraph = styled.p`
  font-family: ${({ theme }) => theme.fontFamilies.default};
  font-size: ${px(14)};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white};
  margin: 0;
  margin-top: ${px(32)};
  font-size: ${({ theme }) => theme.fontSizes.l};
  & > span {
    display: inline-block;
  }
`;

const ContactValue = styled.span`
  transition: all 0.3s ease-in;
  color: ${({ theme }) => theme.colors.normalText};
  cursor: pointer;
`;

const PasswordContainer = styled.div`
  position: relative;
  padding-bottom: ${px(12)};
`;

const ResetPasswordValue = styled.span`
  color: ${({ theme }) => theme.colors.normalText};
  font-size: ${({ theme }) => theme.fontSizes.s};
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  text-decoration: underline;
`;
