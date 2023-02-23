import { px } from '@/utils';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  TextInput,
  FormGroup,
  PasswordInput,
  NumberInput,
  Checkbox,
  Loading,
} from '@carbon/react';
import { Send } from '@carbon/react/icons';
import { Formik, Form, Field } from 'formik';
import { SMTPSchema } from '@/schemas';
import { initialSMTPValue } from '@/interfaces/dtos';
import { FormContainer } from '@/components/onboard/NewUserLoginForm';
import ErrorMessage from '@/components/shared/ErrorMessage/ErrorMessage';
import Button from '@/components/shared/Button';
import { IinitialSMTPForm } from '@/interfaces/schema';
import { FormikRefType } from '@/interfaces/formik.type';
import Loader from '@/components/shared/Loader';
import {
  useCreateSmtpMutation,
  useSendTestMailMutation,
} from '@/redux/services';
import { useToast } from '@/context/ToastContext';

interface Props {
  formRef: React.RefObject<FormikRefType<IinitialSMTPForm>>;
}

const SMTP = ({ formRef }: Props) => {
  const [testEmail, setTestEmail] = React.useState('');
  const [istestEmail, setIstestEmail] = React.useState(false);
  const [createSmtp, { isLoading, isSuccess, isError, error }] =
    useCreateSmtpMutation();
  const [
    sendTestMail,
    {
      isLoading: isTestLoading,
      isSuccess: isTestSuccess,
      isError: isTestError,
      error: testError,
    },
  ] = useSendTestMailMutation();

  const { toast } = useToast();

  const handleSubmit = (values: IinitialSMTPForm) => {
    createSmtp(values);
  };
  const handleSendTestMail = () => {
    Object.keys(initialSMTPValue)?.forEach((key) => {
      formRef.current?.setFieldTouched(key, true);
    });
    if (formRef.current?.isValid && testEmail) {
      sendTestMail({ ...formRef?.current?.values, email: testEmail });
    } else {
      setIstestEmail(true);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast('success', 'SMTP configuration saved successfully');
    }
    if (isError && error && 'status' in error) {
      toast('danger', error?.data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isError, isSuccess]);

  useEffect(() => {
    if (isTestSuccess) {
      toast('success', 'Test Email sent successfully');
    }
    if (isTestError && testError && 'status' in testError) {
      toast('danger', testError?.data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTestError, isTestSuccess, testError]);

  return (
    <ModalContentContainer>
      {(isLoading || isTestLoading) && <Loader />}
      <ModalItem>
        <Formik
          initialValues={initialSMTPValue}
          validationSchema={SMTPSchema}
          onSubmit={handleSubmit}
          innerRef={formRef}
        >
          {({ errors, touched, setFieldTouched, setFieldValue }) => (
            <Form>
              <FormGroup legendText="">
                <FormField>
                  <FormContainer>
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
                    </Field>{' '}
                    <Field name="port">
                      {({ field }: any) => (
                        <NumberInput
                          {...field}
                          id="port"
                          label="Port"
                          max={10000}
                          min={0}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>,
                            { value }: any
                          ) => {
                            setFieldValue('port', Number(value));
                          }}
                          step={10}
                          className="number-input"
                          value={0}
                          placeholder="0"
                          onKeyUp={() => setFieldTouched('port', true)}
                        />
                      )}
                    </Field>{' '}
                    <ErrorMessage
                      invalid={Boolean(touched.server && errors.server)}
                      invalidText={errors.server}
                    />{' '}
                    <ErrorMessage
                      invalid={Boolean(touched.port && errors.port)}
                      invalidText={errors.port}
                    />
                  </FormContainer>
                </FormField>
                <FormField>
                  <FormContainer>
                    <Field name="emailAddress">
                      {({ field }: any) => (
                        <TextInput
                          {...field}
                          type="text"
                          id="emailAddress-input"
                          labelText="Email Address"
                          placeholder="enter text"
                          onKeyUp={() => setFieldTouched('emailAdress', true)}
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
                      invalid={Boolean(
                        touched.emailAddress && errors.emailAddress
                      )}
                      invalidText={errors.emailAddress}
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
                          autoComplete={''}
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
                <FormContainer>
                  <FormField>
                    <ModalLabel>Use SSL/TLS</ModalLabel>
                    <ModalItem>
                      <Field name="useSslTls">
                        {({ field }: any) => (
                          <Checkbox id="checked" labelText="Yes" {...field} />
                        )}
                      </Field>{' '}
                    </ModalItem>
                  </FormField>
                </FormContainer>
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setIstestEmail(false);
                setTestEmail(e.target.value);
              }}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                  handleSendTestMail();
                }
              }}
            />{' '}
            <Button
              renderIcon={(props: any) => <Send {...props} />}
              handleClick={handleSendTestMail}
              buttonLabel="Send mail"
            />{' '}
          </SendMailSection>{' '}
          <ErrorMessage
            invalid={istestEmail}
            invalidText={'Enter Test Email Address'}
          />
        </SendMailContainer>
      </ModalItem>
    </ModalContentContainer>
  );
};

export default SMTP;

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
`;
