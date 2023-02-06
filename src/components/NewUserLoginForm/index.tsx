import React from 'react';
import styled from 'styled-components';
import { FormGroup, TextInput, PasswordInput } from '@carbon/react';
import { ArrowRight } from '@carbon/react/icons';
import { Formik, Form, Field } from 'formik';
import { px } from '@/utils';
import { userLoginSchema } from '@/schemas';
import { initialUserLoginValue } from '@/interfaces/dtos';
import Button from '../Button';

type IProps = {
  handleSetStep: () => void;
};

const SetupNewUserLoginForm = ({ handleSetStep }: IProps) => {
  return (
    <SignInContainer>
      <HeaderTitle>Almost done, please set your password and name.</HeaderTitle>
      <Formik
        initialValues={initialUserLoginValue}
        validationSchema={userLoginSchema}
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
              <FormContainer>
                <Field name="firstname">
                  {({ field }: any) => (
                    <TextInput
                      {...field}
                      type="text"
                      id="firstname-input"
                      labelText="First Name"
                      placeholder="input text"
                      onKeyUp={() => setFieldTouched('firstname', true)}
                      invalid={Boolean(touched.firstname && errors.firstname)}
                      invalidText={errors.firstname}
                    />
                  )}
                </Field>
                <Field name="lastname">
                  {({ field }: any) => (
                    <TextInput
                      {...field}
                      type="text"
                      id="lastname-input"
                      labelText="Last Name"
                      placeholder="input text"
                      onKeyUp={() => setFieldTouched('lastname', true)}
                      invalid={Boolean(touched.lastname && errors.lastname)}
                      invalidText={errors.lastname}
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
                        invalid={Boolean(
                          touched.confirmPassword && errors.confirmPassword
                        )}
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
                renderIcon={(props: any) => <ArrowRight size={24} {...props} />}
                disabled={isSubmitting || !isValid || !values?.password}
                handleClick={handleSetStep}
                buttonLabel="Continue"
                fullWidth
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

const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: ${px(16)};
  margin-bottom: ${px(32)};
  place-items: center;
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
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bgHover};
    color: ${({ theme }) => theme.colors.white};
  }
`;
