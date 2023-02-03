import React from 'react';
import styled from 'styled-components';
import {
  FormGroup,
  TextInput,
  Button,
  PasswordInput,
  Select,
  SelectItem,
} from '@carbon/react';
import { ArrowRight } from '@carbon/react/icons';
import { Formik, Form, Field } from 'formik';
import { px } from '@/utils';
import { databaseSchema } from '@/schemas';
import { initialDatabaseValue } from '@/interfaces/dtos';

type IProps = {
  handleSetStep: () => void;
};

const SetDatabaseForm = ({ handleSetStep }: IProps) => {
  return (
    <SignInContainer>
      <HeaderTitle>Setup Application Database</HeaderTitle>
      <Formik
        initialValues={initialDatabaseValue}
        validationSchema={databaseSchema}
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
                <Field name="databaseType">
                  {({ field }: any) => (
                    <Select
                      id="select-1"
                      labelText="Select"
                      {...field}
                      onKeyUp={() => setFieldTouched('databaseType', true)}
                      invalid={Boolean(touched.server && errors.server)}
                      invalidText={errors.databaseType}
                    >
                      <SelectItem text="Choose option" />
                      <SelectItem text="Option 1" value="option-1" />
                      <SelectItem text="Option 2" value="option-2" />
                    </Select>
                  )}
                </Field>
                <Field name="server">
                  {({ field }: any) => (
                    <TextInput
                      {...field}
                      type="text"
                      id="server-input"
                      labelText="Server/IP"
                      placeholder="input text"
                      onKeyUp={() => setFieldTouched('server', true)}
                      invalid={Boolean(touched.server && errors.server)}
                      invalidText={errors.server}
                    />
                  )}
                </Field>
              </FormContainer>
              <FormContainer>
                <Field name="port">
                  {({ field }: any) => (
                    <TextInput
                      {...field}
                      type="text"
                      id="port-input"
                      labelText="Port"
                      placeholder="input number"
                      onKeyUp={() => setFieldTouched('port', true)}
                      invalid={Boolean(touched.port && errors.port)}
                      invalidText={errors.port}
                    />
                  )}
                </Field>
                <Field name="maxPoolSize">
                  {({ field }: any) => (
                    <TextInput
                      {...field}
                      type="text"
                      id="maxPoolSize-input"
                      labelText="Maximum Pool Size"
                      placeholder="input number"
                      onKeyUp={() => setFieldTouched('maxPoolSize', true)}
                      invalid={Boolean(
                        touched.maxPoolSize && errors.maxPoolSize
                      )}
                      invalidText={errors.maxPoolSize}
                    />
                  )}
                </Field>
              </FormContainer>

              <FormContainer>
                <Field name="connectionTimeOut">
                  {({ field }: any) => (
                    <TextInput
                      {...field}
                      type="text"
                      id="connectionTimeOut-input"
                      labelText="Connection timeout"
                      placeholder="input number"
                      onKeyUp={() => setFieldTouched('connectionTimeOut', true)}
                      invalid={Boolean(
                        touched.connectionTimeOut && errors.connectionTimeOut
                      )}
                      invalidText={errors.connectionTimeOut}
                    />
                  )}
                </Field>
                <Field name="commandTimeOut">
                  {({ field }: any) => (
                    <TextInput
                      {...field}
                      type="text"
                      id="commandTimeOut-input"
                      labelText="Command timeout"
                      placeholder="input number"
                      onKeyUp={() => setFieldTouched('commandTimeOut', true)}
                      invalid={Boolean(
                        touched.commandTimeOut && errors.commandTimeOut
                      )}
                      invalidText={errors.commandTimeOut}
                    />
                  )}
                </Field>
              </FormContainer>
              <FormContainer>
                <Field name="username">
                  {({ field }: any) => (
                    <TextInput
                      {...field}
                      type="text"
                      id="username-input"
                      labelText="Username"
                      placeholder="input text"
                      onKeyUp={() => setFieldTouched('username', true)}
                      invalid={Boolean(touched.username && errors.username)}
                      invalidText={errors.username}
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
                </PasswordContainer>
              </FormContainer>
              <Button
                renderIcon={(props: any) => <ArrowRight size={24} {...props} />}
                iconDescription="Arrow-right"
                disabled={
                  isSubmitting ||
                  !isValid ||
                  !values?.databaseType ||
                  !values?.password
                }
                onClick={handleSetStep}
              >
                Connect to database{' '}
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

export default SetDatabaseForm;

const SignInContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: calc(100vh - ${px(64)});

  form {
    width: ${px(428)};
    fieldset {
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
`;

const HeaderTitle = styled.h1`
  font-family: ${({ theme }) => theme.fontFamilies.heading};
  font-size: ${px(32)};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white};
  margin: 0;
  margin-bottom: ${px(32)};
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
    color: ${({ theme }) => theme.colors.white};
  }
  input,
  select {
    height: ${px(48)};
    width: 100%;
    border: none;
    background-color: ${({ theme }) => theme.colors.darkPrimary10};
    color: ${({ theme }) => theme.colors.white};
    ::placeholder {
      color: ${({ theme }) => theme.colors.darkPrimary20};
    }
  }

  select:hover {
    background-color: ${({ theme }) => theme.colors.darkPrimary10};
  }
  select:focus {
    color: ${({ theme }) => theme.colors.white};
  }

  select + svg {
    fill: ${({ theme }) => theme.colors.white};
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
  margin: 0;
  margin-top: ${px(32)};
  font-size: ${({ theme }) => theme.fontSizes.l};
  & > span {
    display: inline-block;
  }
`;
