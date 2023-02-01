import React, { useState } from 'react';
import styled from 'styled-components';
import { FormGroup, TextInput, Button, PasswordInput } from '@carbon/react';
import { ArrowRight } from '@carbon/react/icons';
import { Formik, Form, Field } from 'formik';
import { px } from '@/utils';
import { signinSchema } from '@/schemas';
import { initialSigninValue } from '@/interfaces/dtos';

type IProps = {
  handleSetStep: () => void;
};

const Signin = ({ handleSetStep }: IProps) => {
  return (
    <SignInContainer>
      <HeaderTitle>Sign In to Continue</HeaderTitle>
      <Formik
        initialValues={initialSigninValue}
        validationSchema={signinSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
        }}
      >
        {({
          errors,
          touched,
          isSubmitting,
          isValid,
          values,
          setFieldTouched,
        }) => (
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
                renderIcon={(props: any) => <ArrowRight size={24} {...props} />}
                iconDescription="Arrow-right"
                disabled={
                  isSubmitting ||
                  !isValid ||
                  !values?.email ||
                  !values?.password
                }
                onClick={handleSetStep}
              >
                Login
              </Button>
            </FormGroup>
          </Form>
        )}
      </Formik>
      <Paragraph>
        Need help? Reach out at <ContactValue>support@nottie.co</ContactValue>
      </Paragraph>
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

      > button {
        max-width: 30rem;
        width: 100%;
        margin-top: ${px(12)};
        background-color: ${({ theme }) => theme.colors.button};
        color: ${({ theme }) => theme.colors.black};
      }

      > button:hover {
        background-color: ${({ theme }) => theme.colors.normalText};
      }

      div:nth-child(2) {
        button {
          svg {
            fill: white !important;
          }
        }
      }
    }
  }
  input {
    height: ${px(48)};
    width: 100%;
    border: none;
    background-color: ${({ theme }) => theme.colors.darkPrimary10};
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
  text-align: center;
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
