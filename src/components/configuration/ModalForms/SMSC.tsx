import { FormGroup, NumberInput, PasswordInput, RadioButton, Select, SelectItem, TextInput } from '@carbon/react';
import { Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import { FormContainer } from '@/components/onboard/NewUserLoginForm';
import Checkbox from '@/components/shared/Checkbox/Checkbox';
import ErrorMessage from '@/components/shared/ErrorMessage/ErrorMessage';
import Loader from '@/components/shared/Loader';
import { useToast } from '@/context/ToastContext';
import { FormikRefType } from '@/interfaces/formik.type';
import { useCreateSmscMutation, useEditSmscMutation } from '@/redux/api';
import { initialSMSCValue } from '@/schemas/dto';
import { IinitialSMSCForm } from '@/schemas/interface';
import { SMSCSchema } from '@/schemas/schema';
import { px } from '@/utils';

interface Props {
  formRef: React.RefObject<FormikRefType<IinitialSMSCForm>>;
  formdata?: IinitialSMSCForm & { smscId: string };
  toggleModal: () => void;
}

const RadioData = [
  { label: 'Transmitter', val: 'transmitter', id: 'transmitter' },
  { label: 'Receiver', val: 'receiver', id: 'receiver' },
  { label: 'Transceiver', val: 'transceiver', id: 'transceiver' },
];

const SMSCForm = ({ formRef, formdata, toggleModal }: Props) => {
  const [createSmsc, { isLoading, isSuccess, isError, error }] = useCreateSmscMutation();
  const [editSmsc, { isLoading: editLoading, isSuccess: editSuccess, isError: isEditError, error: editError }] = useEditSmscMutation();

  const { toast } = useToast();

  useEffect(() => {
    if (isSuccess) {
      toast('success', 'SMSC configuration saved successfully');
      toggleModal();
    }
    if (isError && error && 'status' in error) {
      toast('error', error?.data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isError, isSuccess]);

  useEffect(() => {
    if (editSuccess) {
      toast('success', 'SMSC edited successfully');
      toggleModal();
    }
    if (isEditError && editError && 'status' in editError) {
      toast('error', editError?.data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editError, editSuccess, isEditError]);

  const handleSubmit = (values: IinitialSMSCForm) => {
    const payload: any = {
      ...values,
      dataEncoding: parseInt(values.dataEncoding),
    };
    // console.log('clicked', payload);
    // return;
    const formvalues = payload as IinitialSMSCForm & { smscId: string };
    formdata?.smscId ? editSmsc(formvalues) : createSmsc(formvalues);
  };

  return (
    <ModalContentContainer>
      {(isLoading || editLoading) && <Loader />}
      <ModalItem>
        <Formik initialValues={formdata?.smscId ? formdata : initialSMSCValue} validationSchema={SMSCSchema} onSubmit={handleSubmit} innerRef={formRef}>
          {({ errors, touched, setFieldValue, setFieldTouched }) => (
            <Form>
              <FormGroup legendText="">
                <FormField>
                  <FormContainer>
                    <Field name="username">
                      {({ field }: any) => (
                        <TextInput {...field} type="text" id="username-input" labelText="Username" placeholder="enter username" onKeyUp={() => setFieldTouched('username', true)} />
                      )}
                    </Field>
                    <Field name="password">
                      {({ field }: any) => (
                        <PasswordInput
                          {...field}
                          type="password"
                          id="password-input"
                          labelText="Password"
                          placeholder="enter password"
                          onKeyUp={() => setFieldTouched('password', true)}
                        />
                      )}
                    </Field>
                    <ErrorMessage invalid={Boolean(touched.username && errors.username)} invalidText={errors.username} />
                    <ErrorMessage invalid={Boolean(touched.password && errors.password)} invalidText={errors.password} />
                  </FormContainer>
                </FormField>{' '}
                <FormField>
                  <FormContainer>
                    <Field name="smscName">
                      {({ field }: any) => (
                        <TextInput {...field} type="text" id="smscName-input" labelText="SMSC Name" placeholder="enter name" onKeyUp={() => setFieldTouched('smscName', true)} />
                      )}
                    </Field>
                    <Field name="hostAddress">
                      {({ field }: any) => (
                        <TextInput
                          {...field}
                          type="text"
                          id="hostAddress-input"
                          labelText="Host address"
                          placeholder="enter text"
                          onKeyUp={() => setFieldTouched('hostAddress', true)}
                        />
                      )}
                    </Field>
                    <ErrorMessage invalid={Boolean(touched.smscName && errors.smscName)} invalidText={errors.smscName} />
                    <ErrorMessage invalid={Boolean(touched.hostAddress && errors.hostAddress)} invalidText={errors.hostAddress} />
                  </FormContainer>
                </FormField>{' '}
                <FormField>
                  <ModalLabel>System type</ModalLabel>{' '}
                  <RadioContainer>
                    {RadioData.map((item: any) => (
                      <RadioButton
                        key={item.id}
                        labelText={item.label}
                        value={item.val}
                        id={item.id}
                        labelPosition="right"
                        onClick={(e: any) => setFieldValue('systemType', e.target.id)}
                      />
                    ))}
                  </RadioContainer>
                  <ErrorMessage invalid={Boolean(touched.systemType && errors.systemType)} invalidText={errors.systemType} />
                </FormField>
                <FormField>
                  <FormContainer>
                    <Field name="port">
                      {({ field }: any) => (
                        <NumberInput
                          {...field}
                          id="port-input"
                          label="TX port"
                          max={10000}
                          min={0}
                          step={10}
                          className="number-input"
                          // value={0}
                          placeholder="0"
                          onChange={(event: React.ChangeEvent<HTMLInputElement>, { value }: any) => {
                            setFieldValue('port', value);
                          }}
                          onKeyUp={() => setFieldTouched('port', true)}
                        />
                      )}
                    </Field>
                    <Field name="sessions">
                      {({ field }: any) => (
                        <NumberInput
                          {...field}
                          id="sessions-input"
                          label="Number of Sessions"
                          max={10000}
                          min={0}
                          step={10}
                          className="number-input"
                          // value={0}
                          placeholder="0"
                          onChange={(event: React.ChangeEvent<HTMLInputElement>, { value }: any) => {
                            setFieldValue('sessions', value);
                          }}
                          onKeyUp={() => setFieldTouched('sessions', true)}
                        />
                      )}
                    </Field>
                    <ErrorMessage invalid={Boolean(touched.port && errors.port)} invalidText={errors.port} />
                    <ErrorMessage invalid={Boolean(touched.sessions && errors.sessions)} invalidText={errors.sessions} />
                  </FormContainer>
                </FormField>
                <FormField>
                  <ModalLabel>Data Encoding</ModalLabel>{' '}
                  <FormEmailContainer>
                    <Field name="dataEncoding">
                      {({ field }: any) => (
                        <Select id="select-1" labelText="" {...field} onKeyUp={() => setFieldTouched('dataEncoding', true)}>
                          <SelectItem text="Choose option" />
                          <SelectItem text="Option 1" value={1} />
                          <SelectItem text="Option 2" value={2} />
                        </Select>
                      )}
                    </Field>
                  </FormEmailContainer>
                  <ErrorMessage invalid={Boolean(touched.dataEncoding && errors.dataEncoding)} invalidText={errors.dataEncoding} />
                </FormField>{' '}
                <FormField>
                  <FormContainer>
                    <Field name="npi">
                      {({ field }: any) => (
                        <NumberInput
                          {...field}
                          id="npi-input"
                          label="NPI"
                          max={10000}
                          min={0}
                          step={10}
                          className="number-input"
                          // value={0}
                          placeholder="0"
                          onChange={(event: React.ChangeEvent<HTMLInputElement>, { value }: any) => {
                            setFieldValue('npi', value);
                          }}
                          onKeyUp={() => setFieldTouched('npi', true)}
                        />
                      )}
                    </Field>
                    <Field name="oNpi">
                      {({ field }: any) => (
                        <NumberInput
                          {...field}
                          id="oNpi-input"
                          label="ONPI"
                          max={10000}
                          min={0}
                          step={10}
                          className="number-input"
                          // value={0}
                          placeholder="0"
                          onChange={(event: React.ChangeEvent<HTMLInputElement>, { value }: any) => {
                            setFieldValue('oNpi', value);
                          }}
                          onKeyUp={() => setFieldTouched('oNpi', true)}
                        />
                      )}
                    </Field>
                    <ErrorMessage invalid={Boolean(touched.npi && errors.npi)} invalidText={errors.npi} />
                    <ErrorMessage invalid={Boolean(touched.oNpi && errors.oNpi)} invalidText={errors.oNpi} />
                  </FormContainer>
                </FormField>{' '}
                <FormField>
                  <FormContainer>
                    <Field name="ton">
                      {({ field }: any) => (
                        <NumberInput
                          {...field}
                          id="ton-input"
                          label="ton"
                          max={10000}
                          min={0}
                          step={10}
                          className="number-input"
                          // value={0}
                          placeholder="0"
                          onChange={(event: React.ChangeEvent<HTMLInputElement>, { value }: any) => {
                            setFieldValue('ton', value);
                          }}
                          onKeyUp={() => setFieldTouched('ton', true)}
                        />
                      )}
                    </Field>
                    <Field name="oTon">
                      {({ field }: any) => (
                        <NumberInput
                          {...field}
                          id="oTon-input"
                          label="oTon"
                          max={10000}
                          min={0}
                          step={10}
                          className="number-input"
                          // value={0}
                          placeholder="0"
                          onChange={(event: React.ChangeEvent<HTMLInputElement>, { value }: any) => {
                            setFieldValue('oTon', value);
                          }}
                          onKeyUp={() => setFieldTouched('oTon', true)}
                        />
                      )}
                    </Field>
                    <ErrorMessage invalid={Boolean(touched.ton && errors.ton)} invalidText={errors.ton} />
                    <ErrorMessage invalid={Boolean(touched.oTon && errors.oTon)} invalidText={errors.oTon} />
                  </FormContainer>
                </FormField>{' '}
                <FormField>
                  <FormContainer>
                    <Field name="dNpi">
                      {({ field }: any) => (
                        <NumberInput
                          {...field}
                          id="dNpi-input"
                          label="dNpi"
                          max={10000}
                          min={0}
                          step={10}
                          className="number-input"
                          // value={0}
                          placeholder="0"
                          onChange={(event: React.ChangeEvent<HTMLInputElement>, { value }: any) => {
                            setFieldValue('dNpi', value);
                          }}
                          onKeyUp={() => setFieldTouched('dNpi', true)}
                        />
                      )}
                    </Field>
                    <Field name="dTon">
                      {({ field }: any) => (
                        <NumberInput
                          {...field}
                          id="dTon-input"
                          label="dTon"
                          max={10000}
                          min={0}
                          step={10}
                          className="number-input"
                          // value={0}
                          placeholder="0"
                          onChange={(event: React.ChangeEvent<HTMLInputElement>, { value }: any) => {
                            setFieldValue('dTon', value);
                          }}
                          onKeyUp={() => setFieldTouched('dTon', true)}
                        />
                      )}
                    </Field>
                    <ErrorMessage invalid={Boolean(touched.dNpi && errors.dNpi)} invalidText={errors.dNpi} />
                    <ErrorMessage invalid={Boolean(touched.dTon && errors.dTon)} invalidText={errors.dTon} />
                  </FormContainer>
                </FormField>
                <FormField>
                  <FormContainer>
                    <Field name="connectionMode">
                      {({ field }: any) => (
                        <NumberInput
                          {...field}
                          id="connectionMode-input"
                          label="Connection mode"
                          max={10000}
                          min={1}
                          step={1}
                          className="number-input"
                          // value={1}
                          placeholder="0"
                          onChange={(event: React.ChangeEvent<HTMLInputElement>, { value }: any) => {
                            setFieldValue('connectionMode', value);
                          }}
                          onKeyUp={() => setFieldTouched('connectionMode', true)}
                        />
                      )}
                    </Field>
                    <ModalItem>
                      <ModalLabel>Use SSL/TLS</ModalLabel>
                      <Checkbox label="Yes" name="useSsl" />
                    </ModalItem>
                    <ErrorMessage invalid={Boolean(touched.connectionMode && errors.connectionMode)} invalidText={errors.connectionMode} />
                    <ErrorMessage invalid={Boolean(touched.useSsl && errors.useSsl)} invalidText={errors.useSsl} />
                  </FormContainer>
                </FormField>{' '}
                <FormField>
                  <ModalLabel>Activate SMSC?</ModalLabel>
                  <Checkbox label="Yes" name="status" />
                </FormField>
              </FormGroup>
            </Form>
          )}
        </Formik>
      </ModalItem>
    </ModalContentContainer>
  );
};

export default SMSCForm;

const ModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${px(17)};
  justify-content: center;
`;

const ModalItem = styled.div``;

const ModalLabel = styled.div`
  color: ${({ theme }) => theme.colors.lightText} !important;
  font-size: ${({ theme }) => theme.fontSizes.s};
  font-weight: 400;
  line-height: ${px(12)};
  margin-bottom: ${px(9)};
  margin-top: ${px(16)};
`;

const FormField = styled.div`
  margin-bottom: ${px(16)};
`;

const FormEmailContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${px(16)};
`;

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${px(16)};
`;

// const ModalItemBox = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: start;
//   gap: ${px(16)};
// `;
