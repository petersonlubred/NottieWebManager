import { px } from '@/utils';
import React from 'react';
import styled from 'styled-components';
import {
  TextInput,
  FormGroup,
  PasswordInput,
  NumberInput,
  Checkbox,
} from '@carbon/react';
import { Send } from '@carbon/react/icons';
import { Formik, Form, Field } from 'formik';
import { SMTPSchema } from '@/schemas';
import { initialSMTPValue } from '@/interfaces/dtos';
import { FormContainer } from '@/components/onboard/NewUserLoginForm';
import ErrorMessage from '@/components/shared/ErrorMessage/ErrorMessage';
import Button from '@/components/shared/Button';

const SMTPRoute = () => {
  return (
    <ModalContentContainer>
      <ModalItem>
        <Formik
          initialValues={initialSMTPValue}
          validationSchema={SMTPSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
          }}
        >
          {({ errors, touched, setFieldTouched }) => (
            <Form>
              <FormGroup legendText="">
                <FormField>
                  <FormContainer>
                    <Field name="smtp_name">
                      {({ field }: any) => (
                        <TextInput
                          {...field}
                          type="text"
                          id="smtp_name-input"
                          labelText="SMTP Name"
                          placeholder="enter text"
                          onKeyUp={() => setFieldTouched('smtp_name', true)}
                        />
                      )}
                    </Field>{' '}
                    <Field name="server">
                      {({ field }: any) => (
                        <TextInput
                          {...field}
                          type="text"
                          id="server-input"
                          labelText="Server/IP"
                          placeholder="enter text"
                          onKeyUp={() => setFieldTouched('server', true)}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      invalid={Boolean(touched.smtp_name && errors.smtp_name)}
                      invalidText={errors.smtp_name}
                    />
                    <ErrorMessage
                      invalid={Boolean(touched.server && errors.server)}
                      invalidText={errors.server}
                    />
                  </FormContainer>
                </FormField>{' '}
                <FormField>
                  <FormContainer>
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
                    </Field>{' '}
                    <FormField>
                      <ModalLabel>Use SSL/TLS</ModalLabel>
                      <ModalItem>
                        <Field name="port">
                          {({ field }: any) => (
                            <Checkbox id="checked" labelText="Yes" {...field} />
                          )}
                        </Field>{' '}
                      </ModalItem>
                    </FormField>
                    <ErrorMessage
                      invalid={Boolean(touched.port && errors.port)}
                      invalidText={errors.port}
                    />
                    <ErrorMessage
                      invalid={Boolean(touched.server && errors.server)}
                      invalidText={errors.server}
                    />
                  </FormContainer>
                </FormField>{' '}
                <FormField>
                  <FormContainer>
                    <Field name="email">
                      {({ field }: any) => (
                        <TextInput
                          {...field}
                          type="text"
                          id="email-input"
                          labelText="Email Address"
                          placeholder="enter text"
                          onKeyUp={() => setFieldTouched('email', true)}
                        />
                      )}
                    </Field>{' '}
                    <Field name="displayName">
                      {({ field }: any) => (
                        <TextInput
                          {...field}
                          type="text"
                          id="displayName-input"
                          labelText="Display Name"
                          placeholder="enter text"
                          onKeyUp={() => setFieldTouched('displayName', true)}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      invalid={Boolean(touched.email && errors.email)}
                      invalidText={errors.email}
                    />
                    <ErrorMessage
                      invalid={Boolean(
                        touched.displayName && errors.displayName
                      )}
                      invalidText={errors.displayName}
                    />
                  </FormContainer>
                </FormField>{' '}
                <FormField>
                  <FormContainer>
                    <Field name="username">
                      {({ field }: any) => (
                        <TextInput
                          {...field}
                          type="text"
                          id="username-input"
                          labelText="Username"
                          placeholder="enter text"
                          onKeyUp={() => setFieldTouched('username', true)}
                        />
                      )}
                    </Field>{' '}
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
                    <ErrorMessage
                      invalid={Boolean(touched.username && errors.username)}
                      invalidText={errors.username}
                    />
                    <ErrorMessage
                      invalid={Boolean(touched.password && errors.password)}
                      invalidText={errors.password}
                    />
                  </FormContainer>
                </FormField>{' '}
              </FormGroup>
            </Form>
          )}
        </Formik>
        <SendMailContainer>
          <SendMailTitle>Send test mail</SendMailTitle>
          <SendMailSection>
            <TextInput
              type="text"
              id="email-input"
              labelText="Email"
              placeholder="Enter email address"
            />{' '}
            <Button
              renderIcon={(props: any) => <Send {...props} />}
              handleClick={() => console.log('click')}
              buttonLabel="Send mail"
            />
          </SendMailSection>
        </SendMailContainer>
      </ModalItem>
    </ModalContentContainer>
  );
};

export default SMTPRoute;

const ModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${px(17)};
  justify-content: center;
`;

const ModalItem = styled.div``;

const FormField = styled.div`
  margin-bottom: ${px(16)};
`;

const SendMailContainer = styled.div`
  padding: ${px(10)} ${px(20)};
  background-color: ${({ theme }) => theme.colors.black};
`;

const SendMailTitle = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${px(18)};
  margin-bottom: ${px(15)};
`;

const SendMailSection = styled.div`
  display: flex;
  align-items: flex-end;
  gap: ${px(15)};

  input,
  button {
    height: ${px(32)} !important;
    min-height: ${px(32)} !important;
  }
`;

const ModalLabel = styled.div`
  color: ${({ theme }) => theme.colors.lightText} !important;
  font-size: ${({ theme }) => theme.fontSizes.s};
  font-weight: 400;
  line-height: ${px(12)};
  margin-bottom: ${px(9)};
  margin-top: ${px(16)};
`;
