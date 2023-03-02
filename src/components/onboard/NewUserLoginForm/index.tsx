import { FormGroup, Loading, PasswordInput, TextInput } from '@carbon/react';
import { ArrowRight } from '@carbon/react/icons';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useToast } from '@/context/ToastContext';
import { useLazyGetAUserQuery, useOnboardUserMutation } from '@/redux/api';
import { initialUserLoginValue } from '@/schemas/dto';
import { IinitialUserLogin } from '@/schemas/interface';
import { userLoginSchema } from '@/schemas/schema';
import { px } from '@/utils';

import Button from '../../shared/Button';

const SetupNewUserLoginForm = () => {
  const router = useRouter();
  const { userid } = router.query;
  const [loading, setLoading] = useState(false);
  const [onboard] = useOnboardUserMutation();
  const [trigger] = useLazyGetAUserQuery();

  const { toast } = useToast();

  const handleSubmit = async (values: IinitialUserLogin) => {
    const formvalues = { ...values, id: userid as string };
    try {
      setLoading(true);
      await onboard(formvalues);
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
    <SignInContainer>
      <HeaderTitle>Almost done, please set your password and name.</HeaderTitle>
      <Formik initialValues={initialUserLoginValue} validationSchema={userLoginSchema} onSubmit={handleSubmit}>
        {({ errors, touched, isValid, values, setFieldTouched, handleSubmit }) => (
          <Form>
            <FormGroup legendText="">
              <FormContainer>
                <Field name="firstName">
                  {({ field }: any) => (
                    <TextInput
                      {...field}
                      type="text"
                      id="firstName-input"
                      labelText="First Name"
                      placeholder="input text"
                      onKeyUp={() => setFieldTouched('firstName', true)}
                      invalid={Boolean(touched.firstName && errors.firstName)}
                      invalidText={errors.firstName}
                    />
                  )}
                </Field>
                <Field name="lastName">
                  {({ field }: any) => (
                    <TextInput
                      {...field}
                      type="text"
                      id="lastName-input"
                      labelText="Last Name"
                      placeholder="input text"
                      onKeyUp={() => setFieldTouched('lastName', true)}
                      invalid={Boolean(touched.lastName && errors.lastName)}
                      invalidText={errors.lastName}
                    />
                  )}
                </Field>
              </FormContainer>
              <FormContainer>
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
                </PasswordContainer>
                <PasswordContainer>
                  <Field name="confirmPassword">
                    {({ field }: any) => (
                      <PasswordInput
                        {...field}
                        type="password"
                        id="confirmPassword-input"
                        labelText="Confirm Password"
                        placeholder="Password"
                        onKeyUp={() => setFieldTouched('password', true)}
                        invalid={Boolean(touched.confirmPassword && errors.confirmPassword)}
                        invalidText={errors.confirmPassword}
                      />
                    )}
                  </Field>
                </PasswordContainer>
              </FormContainer>

              <ContentContainer>
                <Label>Role</Label>
                <RoleContainer>
                  <CurvedBox>Admin</CurvedBox>
                  <CurvedBox>Customer support</CurvedBox>
                </RoleContainer>
              </ContentContainer>
              <Button
                buttonLabel="Continue"
                fullWidth
                renderIcon={(props: any) =>
                  loading ? <Loading size={24} {...props} small description="Active loading indicator" withOverlay={false} /> : <ArrowRight {...props} size={24} />
                }
                disabled={!isValid || !values?.firstName || loading}
                handleClick={handleSubmit}
              />
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

export default SetupNewUserLoginForm;

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
  height: ${px(84)};

  line-height: ${px(42)};

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0 ${px(16)};
  margin-bottom: ${px(16)};
  place-items: start;
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

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const RoleContainer = styled.div`
  display: flex;
  gap: ${px(10)};
  margin-bottom: ${px(24)};
`;

const Label = styled.p`
  font-family: ${({ theme }) => theme.fontFamilies.default};
  color: ${({ theme }) => theme.colors.lightText};
  font-size: ${px(12)};
  padding-bottom: ${px(4)};
`;

const CurvedBox = styled.div`
  font-family: ${({ theme }) => theme.fontFamilies.default};
  font-weight: 400;
  background-color: ${({ theme }) => theme.colors.lightBackground};
  color: ${({ theme }) => theme.colors.lightBackgroundtext};
  padding: ${px(5)} ${px(8)};
  border-radius: 24px;
`;
