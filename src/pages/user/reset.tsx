import { ArrowRight } from '@carbon/icons-react';
import { FormGroup, Loading, PasswordInput } from 'carbon-components-react';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Button from '@/components/shared/Button';
import Logo from '@/components/shared/Logo';
import { useToast } from '@/context/ToastContext';
import AuthRoute from '@/HOC/AuthRoute';
import Seo from '@/providers/seo';
import { useChangePasswordMutation, useLazyGetAUserQuery } from '@/redux/api';
import { initialResetValue } from '@/schemas/dto';
import { IinitialResetPassword } from '@/schemas/interface';
import { resetPassworSchema } from '@/schemas/schema';
import { px } from '@/utils';

import { Body, LogoContainer, Main, NavbarSection } from '..';

const ResetPassword = () => {
  const router = useRouter();
  const { userid } = router.query;
  const [loading, setLoading] = useState(false);
  const [changePassword] = useChangePasswordMutation();
  const [trigger] = useLazyGetAUserQuery();

  const { toast } = useToast();

  const handleSubmit = async (values: IinitialResetPassword) => {
    const formvalues = { ...values, id: userid as string };
    try {
      setLoading(true);
      await changePassword(formvalues);
      setLoading(false);
    } catch (error: any) {
      toast('error', error?.data?.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userid) {
      trigger({ id: userid as string });
    }
  }, [trigger, userid]);

  return (
    <AuthRoute isPublic>
      <Body>
        <Seo title="Home" />
        <Main>
          <NavbarSection>
            <LogoContainer>
              <Logo />
            </LogoContainer>
          </NavbarSection>
          <SignInContainer>
            <HeaderTitle>Reset Password.</HeaderTitle>
            <Formik initialValues={initialResetValue} validationSchema={resetPassworSchema} onSubmit={handleSubmit}>
              {({ errors, touched, isValid, values, setFieldTouched, handleSubmit }) => (
                <Form>
                  <FormGroup legendText="">
                    <FormContainer>
                      <PasswordContainer>
                        <Field name="tempPassword">
                          {({ field }: any) => (
                            <PasswordInput
                              {...field}
                              type="password"
                              id="tempPassword-input"
                              labelText="Temp Password"
                              placeholder="Password"
                              onKeyUp={() => setFieldTouched('tempPassword', true)}
                              invalid={Boolean(touched.tempPassword && errors.tempPassword)}
                              invalidText={errors.tempPassword}
                            />
                          )}
                        </Field>
                      </PasswordContainer>
                    </FormContainer>
                    <FormContainer>
                      <PasswordContainer>
                        <Field name="password">
                          {({ field }: any) => (
                            <PasswordInput
                              {...field}
                              type="password"
                              id="newPassword-input"
                              labelText="New Password"
                              placeholder="Password"
                              onKeyUp={() => setFieldTouched('newPassword', true)}
                              invalid={Boolean(touched.newPassword && errors.newPassword)}
                              invalidText={errors.newPassword}
                            />
                          )}
                        </Field>
                      </PasswordContainer>
                    </FormContainer>
                    <FormContainer>
                      <PasswordContainer>
                        <Field name="confirmPassword">
                          {({ field }: any) => (
                            <PasswordInput
                              {...field}
                              type="password"
                              id="confirmPassword-input"
                              labelText="Confirm Password"
                              placeholder="Password"
                              onKeyUp={() => setFieldTouched('confirmPassword', true)}
                              invalid={Boolean(touched.confirmPassword && errors.confirmPassword)}
                              invalidText={errors.confirmPassword}
                            />
                          )}
                        </Field>
                      </PasswordContainer>
                    </FormContainer>
                    <Button
                      buttonLabel="Continue"
                      fullWidth
                      renderIcon={(props: any) =>
                        loading ? <Loading size={24} {...props} small description="Active loading indicator" withOverlay={false} /> : <ArrowRight {...props} size={24} />
                      }
                      disabled={!isValid || !values?.tempPassword || loading}
                      handleClick={handleSubmit}
                    />
                  </FormGroup>
                </Form>
              )}
            </Formik>
            <Paragraph>
              Need help? Reach out at <ContactValue>support@nottie.net</ContactValue>
            </Paragraph>
          </SignInContainer>{' '}
        </Main>
      </Body>
    </AuthRoute>
  );
};

export default ResetPassword;

const SignInContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: calc(100vh - ${px(64)});

  form {
    width: ${px(428)};
  }
`;

const HeaderTitle = styled.h1`
  font-family: ${({ theme }) => theme.fontFamilies.heading};
  font-size: ${px(32)};
  font-weight: 400;
  text-align: left;
  color: ${({ theme }) => theme.colors.white};
  margin: 0;
  margin-bottom: ${px(32)};

  width: ${px(426)};

  line-height: ${px(42)};

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const FormContainer = styled.div`
  margin-bottom: ${px(16)};
  > div {
    width: 100%;
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
    &:hover {
      background-color: ${({ theme }) => theme.colors.bgPrimaryLight};
    }
    &:focus {
      color: ${({ theme }) => theme.colors.white};
    }

    & + svg {
      fill: ${({ theme }) => theme.colors.white};
    }
  }
  svg {
    fill: ${({ theme }) => theme.colors.white} !important;
  }
`;

const PasswordContainer = styled.div`
  position: relative;
`;

const ContactValue = styled.span`
  transition: all 0.3s ease-in;
  color: ${({ theme }) => theme.colors.normalText};
  cursor: pointer;
`;

const Paragraph = styled.p`
  font-family: ${({ theme }) => theme.fontFamilies.default};
  font-size: ${px(14)};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white};

  text-align: left;
  line-height: ${px(21)};
  width: ${px(312)};
  height: ${px(23)};

  margin-left: -7rem;
  margin-top: ${px(32)};
  font-size: ${({ theme }) => theme.fontSizes.l};
  & > span {
    display: inline-block;
  }

  flex: none;
  order: 5;
  flex-grow: 0;
`;
