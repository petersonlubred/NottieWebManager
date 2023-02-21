import Button from '@/components/shared/Button';
import { px } from '@/utils';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  TextInput,
  FormGroup,
  Select,
  SelectItem,
  Checkbox,
  NumberInput,
  PasswordInput,
} from '@carbon/react';
import { Formik, Form, Field } from 'formik';
import ErrorMessage from '@/components/shared/ErrorMessage/ErrorMessage';
import { FormContainer } from '@/components/onboard/NewUserLoginForm';
import { initialDataSource } from '@/interfaces/dtos';
import { DataSourceSchema } from '@/schemas';

const DataSourceForm = () => {
  return (
    <Container>
      <MailNav>
        <ActionContainer>
          <Button
            renderIcon={null}
            handleClick={() => console.log('123')}
            buttonLabel="Create source"
          />
        </ActionContainer>
      </MailNav>{' '}
      <Formik
        initialValues={initialDataSource}
        validationSchema={DataSourceSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
        }}
      >
        {({ errors, touched, setFieldTouched }) => (
          <Form>
            <FormGroup legendText="">
              <FormField>
                <FormContainer>
                  <Field name="source_name">
                    {({ field }: any) => (
                      <TextInput
                        {...field}
                        type="text"
                        id="source_name-input"
                        labelText="Data source name"
                        placeholder="enter name"
                        onKeyUp={() => setFieldTouched('source_name', true)}
                      />
                    )}
                  </Field>{' '}
                  <Field name="databaseType">
                    {({ field }: any) => (
                      <Select
                        id="select-1"
                        labelText="Database Type"
                        {...field}
                        onKeyUp={() => setFieldTouched('profile', true)}
                      >
                        <SelectItem text="Choose option" />
                        <SelectItem text="Option 1" value="option-1" />
                        <SelectItem text="Option 2" value="option-2" />
                      </Select>
                    )}
                  </Field>
                  <ErrorMessage
                    invalid={Boolean(touched.source_name && errors.source_name)}
                    invalidText={errors.source_name}
                  />
                  <ErrorMessage
                    invalid={Boolean(
                      touched.databaseType && errors.databaseType
                    )}
                    invalidText={errors.databaseType}
                  />
                </FormContainer>
              </FormField>
              <FormField>
                <FormContainer>
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
                  </Field>{' '}
                  <Field name="port">
                    {({ field }: any) => (
                      <NumberInput
                        {...field}
                        id="port-input"
                        label="Port"
                        max={10000}
                        min={0}
                        step={10}
                        className="number-input"
                        value={0}
                        placeholder="0"
                        onKeyUp={() => setFieldTouched('port', true)}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    invalid={Boolean(touched.server && errors.server)}
                    invalidText={errors.server}
                  />
                  <ErrorMessage
                    invalid={Boolean(touched.port && errors.port)}
                    invalidText={errors.port}
                  />
                </FormContainer>
              </FormField>
              <FormField>
                <FormContainer>
                  <Field name="maxPoolSize">
                    {({ field }: any) => (
                      <NumberInput
                        {...field}
                        id="maxPoolSize"
                        label="Max pool size"
                        max={10000}
                        min={0}
                        step={10}
                        className="number-input"
                        value={0}
                        placeholder="0"
                        onKeyUp={() => setFieldTouched('maxPoolSize', true)}
                      />
                    )}
                  </Field>{' '}
                  <Field name="connectionTimeout">
                    {({ field }: any) => (
                      <NumberInput
                        {...field}
                        id="connectionTimeout"
                        label="Connection timeout"
                        max={10000}
                        min={0}
                        step={10}
                        className="number-input"
                        value={0}
                        placeholder="0"
                        onKeyUp={() =>
                          setFieldTouched('connectionTimeout', true)
                        }
                      />
                    )}
                  </Field>{' '}
                  <ErrorMessage
                    invalid={Boolean(touched.maxPoolSize && errors.maxPoolSize)}
                    invalidText={errors.maxPoolSize}
                  />
                  <ErrorMessage
                    invalid={Boolean(
                      touched.connectionTimeout && errors.connectionTimeout
                    )}
                    invalidText={errors.connectionTimeout}
                  />
                </FormContainer>
              </FormField>
              <FormField>
                <FormContainer>
                  <Field name="username">
                    {({ field }: any) => (
                      <TextInput
                        {...field}
                        type="text"
                        id="username-input"
                        labelText="Username"
                        placeholder="enter name"
                        onKeyUp={() => setFieldTouched('username', true)}
                      />
                    )}
                  </Field>{' '}
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
                  <ErrorMessage
                    invalid={Boolean(touched.source_name && errors.source_name)}
                    invalidText={errors.source_name}
                  />
                  <ErrorMessage
                    invalid={Boolean(
                      touched.databaseType && errors.databaseType
                    )}
                    invalidText={errors.databaseType}
                  />
                </FormContainer>
              </FormField>
              <ModalItem>
                <ModalLabel>Status</ModalLabel>{' '}
                <Checkbox id="checked-3" labelText="Yes" />
              </ModalItem>
            </FormGroup>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default DataSourceForm;

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 300px);
  overflow: auto;

  .color-picker {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, 10%);
    z-index: 1000;
    background-color: ${({ theme }) => theme.colors.bgHover};
    border: 1px solid ${({ theme }) => theme.colors.borderLight};
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }

  form {
    padding: 0 ${px(252)} ${px(16)} ${px(13)};
    svg {
      fill: ${({ theme }) => theme.colors.white} !important ;
    }
  }
`;

const MailNav = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${px(24)};
  justify-content: flex-end;
`;

const ActionContainer = styled.div`
  button {
    padding: ${px(10)} ${px(16)};
  }
`;

const ModalItem = styled.div``;

const ModalLabel = styled.div`
  color: ${({ theme }) => theme.colors.lightText} !important;
  font-size: ${({ theme }) => theme.fontSizes.s};
  font-weight: 400;
  line-height: ${px(12)};
  margin-bottom: ${px(6)};
  // margin-top: ${px(16)};
`;

const FormField = styled.div`
  margin-bottom: ${px(16)};
`;

export const PasswordContainer = styled.div`
  position: relative;
`;
