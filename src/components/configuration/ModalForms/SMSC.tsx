import React,{useEffect} from 'react';
import { Checkbox, FormGroup, NumberInput, Select, SelectItem, TextInput } from '@carbon/react';
import { Field, Form, Formik } from 'formik';
import styled from 'styled-components';
import Loader from '@/components/shared/Loader';

import { useCreateSmscMutation, useEditSmscMutation } from '@/redux/api';

import { FormContainer } from '@/components/onboard/NewUserLoginForm';
import ErrorMessage from '@/components/shared/ErrorMessage/ErrorMessage';
import { SMSCSchema } from '@/schemas/schema';
import { initialSMSCValue } from '@/schemas/dto';
import { IinitialSMSCForm } from '@/schemas/interface';
import { FormikRefType } from '@/interfaces/formik.type';
import { px } from '@/utils';
import { useToast } from '@/context/ToastContext';

interface Props {
  formRef: React.RefObject<FormikRefType<IinitialSMSCForm>>;
  formdata?: IinitialSMSCForm & { smscId: string };
  toggleModal: () => void;
}

const SMSCForm = ({ formRef, formdata, toggleModal }: Props) => {
  const [createSmsc,{isLoading, isSuccess, isError, error}]=useCreateSmscMutation()
  const [editSmsc,{isLoading: editLoading, isSuccess: editSuccess, isError: isEditError, error: editError}]=useEditSmscMutation()

  const {toast} =useToast()

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
    console.log('clicked');
    const formvalues = values as IinitialSMSCForm & { smscId: string };
    formdata?.smscId ? editSmsc(formvalues) : createSmsc(formvalues);
  };



  return (
    <ModalContentContainer>
      {(isLoading  || editLoading) && <Loader />}
      <ModalItem>
        <Formik
          initialValues={formdata?.smscId? formdata: initialSMSCValue}
          validationSchema={SMSCSchema}
          onSubmit={handleSubmit}
          innerRef={formRef}
        >
          {({ errors, touched, setFieldValue, setFieldTouched }) => (
            <Form>
              <FormGroup legendText="">
                <FormField>
                  <FormContainer>
                    <Field name="smsc_name">
                      {({ field }: any) => (
                        <TextInput {...field} type="text" id="smsc_name-input" labelText="SMSC Name" placeholder="enter name"  onKeyUp={() => setFieldTouched('smsc_name', true)} />
                      )}
                    </Field>
                    <Field name="server">
                      {({ field }: any) => (
                        <TextInput {...field} type="text" id="server-input" labelText="Server/IP" placeholder="enter text" onKeyUp={() => setFieldTouched('server', true)} />
                      )}
                    </Field>
                    <ErrorMessage invalid={Boolean(touched.smsc_name && errors.smsc_name)} invalidText={errors.smsc_name} />
                    <ErrorMessage invalid={Boolean(touched.server && errors.server)} invalidText={errors.server} />
                  </FormContainer>
                </FormField>{' '}
                <FormField>
                  <FormContainer>
                    <Field name="TXPort">
                      {({ field }: any) => (
                        <NumberInput
                          {...field}
                          id="TXPort-input"
                          label="TX port"
                          max={10000}
                          min={0}
                          step={10}
                          className="number-input"
                          value={0}
                          placeholder="0"
                          onChange={(event: React.ChangeEvent<HTMLInputElement>, { value }: any) => {
                            setFieldValue('TXPort', value);
                          }}
                          onKeyUp={() => setFieldTouched('TXPort', true)}
                        />
                      )}
                    </Field>
                    <Field name="noOfSessions">
                      {({ field }: any) => (
                        <NumberInput
                          {...field}
                          id="noOfSessions-input"
                          label="Number of Sessions"
                          max={10000}
                          min={0}
                          step={10}
                          className="number-input"
                          value={0}
                          placeholder="0"
                          onChange={(event: React.ChangeEvent<HTMLInputElement>, { value }: any) => {
                            setFieldValue('noOfSessions', value);
                          }}
                          onKeyUp={() => setFieldTouched('noOfSessions', true)}
                        />
                      )}
                    </Field>
                    <ErrorMessage invalid={Boolean(touched.TXPort && errors.TXPort)} invalidText={errors.TXPort} />
                    <ErrorMessage invalid={Boolean(touched.noOfSessions && errors.noOfSessions)} invalidText={errors.noOfSessions} />
                  </FormContainer>
                </FormField>
                <FormField>
                  <ModalLabel>Data Encoding</ModalLabel>{' '}
                  <FormEmailContainer>
                    <Field name="dataEncoding">
                      {({ field }: any) => (
                        <Select id="select-1" labelText="dataEncoding" {...field} onKeyUp={() => setFieldTouched('dataEncoding', true)}>
                          <SelectItem text="Choose option" />
                          <SelectItem text="Option 1" value="option-1" />
                          <SelectItem text="Option 2" value="option-2" />
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
                          value={0}
                          placeholder="0"
                          onChange={(event: React.ChangeEvent<HTMLInputElement>, { value }: any) => {
                            setFieldValue('npi', value);
                          }}
                          onKeyUp={() => setFieldTouched('npi', true)}
                        />
                      )}
                    </Field>
                    <Field name="onpi">
                      {({ field }: any) => (
                        <NumberInput
                          {...field}
                          id="onpi-input"
                          label="ONPI"
                          max={10000}
                          min={0}
                          step={10}
                          className="number-input"
                          value={0}
                          placeholder="0"
                          onChange={(event: React.ChangeEvent<HTMLInputElement>, { value }: any) => {
                            setFieldValue('onpi', value);
                          }}
                          onKeyUp={() => setFieldTouched('onpi', true)}
                        />
                      )}
                    </Field>
                    <ErrorMessage invalid={Boolean(touched.npi && errors.npi)} invalidText={errors.npi} />
                    <ErrorMessage invalid={Boolean(touched.onpi && errors.onpi)} invalidText={errors.onpi} />
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
                          value={0}
                          placeholder="0"
                          onChange={(event: React.ChangeEvent<HTMLInputElement>, { value }: any) => {
                            setFieldValue('ton', value);
                          }}
                          onKeyUp={() => setFieldTouched('ton', true)}
                        />
                      )}
                    </Field>
                    <Field name="otin">
                      {({ field }: any) => (
                        <NumberInput
                          {...field}
                          id="otin-input"
                          label="otin"
                          max={10000}
                          min={0}
                          step={10}
                          className="number-input"
                          value={0}
                          placeholder="0"
                          onChange={(event: React.ChangeEvent<HTMLInputElement>, { value }: any) => {
                            setFieldValue('otin', value);
                          }}
                          onKeyUp={() => setFieldTouched('otin', true)}
                        />
                      )}
                    </Field>
                    <ErrorMessage invalid={Boolean(touched.ton && errors.ton)} invalidText={errors.ton} />
                    <ErrorMessage invalid={Boolean(touched.otin && errors.otin)} invalidText={errors.otin} />
                  </FormContainer>
                </FormField>{' '}
                <FormField>
                  <FormContainer>
                    <Field name="dnpi">
                      {({ field }: any) => (
                        <NumberInput
                          {...field}
                          id="dnpi-input"
                          label="dnpi"
                          max={10000}
                          min={0}
                          step={10}
                          className="number-input"
                          value={0}
                          placeholder="0"
                          onChange={(event: React.ChangeEvent<HTMLInputElement>, { value }: any) => {
                            setFieldValue('dnpi', value);
                          }}
                          onKeyUp={() => setFieldTouched('dnpi', true)}
                        />
                      )}
                    </Field>
                    <Field name="dton">
                      {({ field }: any) => (
                        <NumberInput
                          {...field}
                          id="dton-input"
                          label="dton"
                          max={10000}
                          min={0}
                          step={10}
                          className="number-input"
                          value={0}
                          placeholder="0"
                          onChange={(event: React.ChangeEvent<HTMLInputElement>, { value }: any) => {
                            setFieldValue('dton', value);
                          }}
                          onKeyUp={() => setFieldTouched('dton', true)}
                        />
                      )}
                    </Field>
                    <ErrorMessage invalid={Boolean(touched.dnpi && errors.dnpi)} invalidText={errors.dnpi} />
                    <ErrorMessage invalid={Boolean(touched.dton && errors.dton)} invalidText={errors.dton} />
                  </FormContainer>
                </FormField>
                <FormField>
                  <ModalLabel>Activate SMSC?</ModalLabel>{' '}
                  <ModalItemBox>
                    <ModalItem>
                      <Checkbox id="checked" labelText="Yes" />
                    </ModalItem>
                    <ModalItem>
                      <Checkbox id="checked-5" labelText="No" />
                    </ModalItem>{' '}
                  </ModalItemBox>
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

const ModalItemBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: ${px(16)};
`;
