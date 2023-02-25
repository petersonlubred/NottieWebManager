import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  FormGroup,
  TextInput,
  Button,
  PasswordInput,
  Select,
  SelectItem,
  Loading,
} from '@carbon/react';
import { ArrowRight } from '@carbon/react/icons';
import { Formik, Form, Field } from 'formik';
import { px } from '@/utils';
import { databaseSchema } from '@/schemas/schema';
import { initialDatabaseValue } from '@/schemas/schema';
import ErrorMessage from '@/components/shared/ErrorMessage/ErrorMessage';

type IProps = {
  handleSetStep: () => void;
  registerDb: Function;
  isLoading: boolean;
};

const SetDatabaseForm = ({ handleSetStep, registerDb, isLoading }: IProps) => {
  const handleSubmit = (values: any) => {
    registerDb(values);
    handleSetStep();
  };

  return (
    <SignInContainer>
      <HeaderTitle>Setup Application Database</HeaderTitle>
      <Formik
        initialValues={initialDatabaseValue}
        validationSchema={databaseSchema}
        onSubmit={handleSubmit}
      >
        {({
          errors,
          touched,
          isValid,
          values,
          setFieldTouched,
          handleSubmit,
        }) => (
          <Form>
            <FormGroup legendText="">
              <FormField>
                <FormNameContainer>
                  <Field name="databaseName">
                    {({ field }: any) => (
                      <TextInput
                        {...field}
                        type="text"
                        id="databaseName-input"
                        labelText="Database Name"
                        placeholder="input text"
                        onKeyUp={() => setFieldTouched('databaseName', true)}
                      />
                    )}
                  </Field>
                </FormNameContainer>
                <ErrorMessage
                  invalid={Boolean(touched.databaseName && errors.databaseName)}
                  invalidText={errors.databaseName}
                />
              </FormField>
              <FormField>
                <FormContainer>
                  <Field name="databaseType">
                    {({ field }: any) => (
                      <Select
                        id="select-1"
                        labelText="Database type"
                        {...field}
                        onKeyUp={() => setFieldTouched('databaseType', true)}
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
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    invalid={Boolean(
                      touched.databaseType && errors.databaseType
                    )}
                    invalidText={errors.databaseType}
                  />
                  <ErrorMessage
                    invalid={Boolean(touched.server && errors.server)}
                    invalidText={errors.server}
                  />
                </FormContainer>
              </FormField>
              <FormField>
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
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    invalid={Boolean(touched.port && errors.port)}
                    invalidText={errors.port}
                  />
                  <ErrorMessage
                    invalid={Boolean(touched.maxPoolSize && errors.maxPoolSize)}
                    invalidText={errors.maxPoolSize}
                  />
                </FormContainer>
              </FormField>
              <FormField>
                <FormContainer>
                  <Field name="connectionTimeout">
                    {({ field }: any) => (
                      <TextInput
                        {...field}
                        type="text"
                        id="connectionTimeout-input"
                        labelText="Connection timeout"
                        placeholder="input number"
                        onKeyUp={() =>
                          setFieldTouched('connectionTimeout', true)
                        }
                      />
                    )}
                  </Field>
                  <Field name="commandTimeout">
                    {({ field }: any) => (
                      <TextInput
                        {...field}
                        type="text"
                        id="commandTimeout-input"
                        labelText="Command timeout"
                        placeholder="input number"
                        onKeyUp={() => setFieldTouched('commandTimeout', true)}
                      />
                    )}
                  </Field>

                  <ErrorMessage
                    invalid={Boolean(
                      touched.connectionTimeout && errors.connectionTimeout
                    )}
                    invalidText={errors.connectionTimeout}
                  />
                  <ErrorMessage
                    invalid={Boolean(
                      touched.commandTimeout && errors.commandTimeout
                    )}
                    invalidText={errors.commandTimeout}
                  />
                </FormContainer>
              </FormField>
              <FormField>
                <FormContainer>
                  <Field name="userId">
                    {({ field }: any) => (
                      <TextInput
                        {...field}
                        type="text"
                        id="username-input"
                        labelText="Username"
                        placeholder="input text"
                        onKeyUp={() => setFieldTouched('userId', true)}
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
                        />
                      )}
                    </Field>
                  </PasswordContainer>
                  <ErrorMessage
                    invalid={Boolean(touched.userId && errors.userId)}
                    invalidText={errors.userId}
                  />
                  <ErrorMessage
                    invalid={Boolean(touched.password && errors.password)}
                    invalidText={errors.password}
                  />
                </FormContainer>
              </FormField>
              <Button
                renderIcon={(props: any) =>
                  isLoading ? (
                    <Loading
                      size={24}
                      {...props}
                      small
                      description="Active loading indicator"
                      withOverlay={false}
                    />
                  ) : (
                    <ArrowRight {...props} size={24} />
                  )
                }
                iconDescription="Arrow-right"
                disabled={
                  !isValid ||
                  !values?.databaseType ||
                  !values?.password ||
                  isLoading
                }
                onClick={handleSubmit}
                style={{ position: 'relative' }}
              >
                Connect to database
              </Button>
            </FormGroup>
            <Paragraph>
              Need help? Reach out at{' '}
              <ContactValue>support@nottie.co</ContactValue>
            </Paragraph>
          </Form>
        )}
      </Formik>
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
  grid-gap: 0 ${px(16)};
  margin-bottom: ${px(16)};
  place-items: center;
  > div {
    width: 100%;
  }

  label {
    color: ${({ theme }) => theme.colors.white};
  }

  select:hover {
    background-color: ${({ theme }) => theme.colors.bgPrimaryLight};
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

const FormField = styled.div`
  margin-bottom: ${px(16)};
`;

export const FormNameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  label {
    color: ${({ theme }) => theme.colors.white};
  }
`;
