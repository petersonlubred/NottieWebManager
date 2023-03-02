import { FormGroup, Select, SelectItem, TextInput } from '@carbon/react';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import styled from 'styled-components';

import { useToast } from '@/context/ToastContext';
import { ILookupAlertProfile, ILookupAlertType } from '@/interfaces/alert';
import { FormikRefType } from '@/interfaces/formik.type';
import { useCreateExceptionMutation, useLookupAlertProfileQuery, useLookupAlertTypeQuery, useUpdateExceptionMutation } from '@/redux/api';
import { initialSubscription } from '@/schemas/dto';
import { IinitialAlertException } from '@/schemas/interface';
import { AlertExceptionSchema } from '@/schemas/schema';
import { px } from '@/utils';
import { pickValues } from '@/utils/helpers/helpers';

import { FormContainer } from '../onboard/NewUserLoginForm';
import Checkbox from '../shared/Checkbox/Checkbox';
import ErrorMessage from '../shared/ErrorMessage/ErrorMessage';
import Loader from '../shared/Loader';
import RadioButton from '../shared/RadioButton';
interface Iprops {
  formRef: React.RefObject<FormikRefType<IinitialAlertException>>;
  formdata?: IinitialAlertException & { alertExceptionId: string };
  toggleModal: () => void;
}

const ModalContent = ({ formRef, formdata, toggleModal }: Iprops) => {
  const [editException] = useUpdateExceptionMutation();
  const [createException] = useCreateExceptionMutation();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { data: profiles, isFetching } = useLookupAlertProfileQuery({});
  const { data: alertTypes, isFetching: isFetchingAlertTypes } = useLookupAlertTypeQuery({});

  const handleSubmit = async (values: IinitialAlertException) => {
    const formvalues = values as IinitialAlertException & { alertExceptionId: string };
    try {
      setLoading(true);
      if (formdata?.alertExceptionId) {
        await editException(pickValues(formvalues)).unwrap();
      } else {
        await createException(pickValues(formvalues)).unwrap();
      }
      toggleModal();
      toast('success', 'Exception saved successfully');
      setLoading(false);
    } catch (error: any) {
      toast('error', error?.data?.message || error?.data?.title || 'Something went wrong');
      setLoading(false);
    }
  };
  return (
    <ModalContentContainer>
      {(loading || isFetching || isFetchingAlertTypes) && <Loader />}
      <ModalItem>
        <Formik initialValues={{ ...initialSubscription, ...formdata }} validationSchema={AlertExceptionSchema} onSubmit={handleSubmit} innerRef={formRef}>
          {({ errors, touched, setFieldTouched }) => (
            <Form>
              <FormGroup legendText="">
                <FormField>
                  <FormContainer>
                    <Field name="customerId">
                      {({ field }: any) => (
                        <TextInput
                          {...field}
                          type="text"
                          id="customerId-input"
                          labelText="Customer ID"
                          placeholder="enter name"
                          onKeyUp={() => setFieldTouched('customerId', true)}
                        />
                      )}
                    </Field>{' '}
                    <Field name="accountNo">
                      {({ field }: any) => (
                        <TextInput {...field} type="text" id="accountNo-input" labelText="Account No" placeholder="input text" onKeyUp={() => setFieldTouched('accountNo', true)} />
                      )}
                    </Field>
                    <ErrorMessage invalid={Boolean(touched.customerId && errors.customerId)} invalidText={errors.customerId} />
                    <ErrorMessage invalid={Boolean(touched.accountNo && errors.accountNo)} invalidText={errors.accountNo} />
                  </FormContainer>
                </FormField>
                <FormField>
                  <FormContainer>
                    <Field name="alertType">
                      {({ field }: any) => (
                        <ModalItem>
                          <ModalLabel>Alert Type</ModalLabel>
                          <RadioButton
                            {...field}
                            name="alertType"
                            items={
                              alertTypes?.data
                                ? alertTypes.data.map((alertType: ILookupAlertType) => {
                                    return {
                                      value: alertType.id,
                                      label: alertType.name,
                                    };
                                  })
                                : []
                            }
                          />
                          <ErrorMessage invalid={Boolean(touched.alertType && errors.alertType)} invalidText={errors.alertType} />
                        </ModalItem>
                      )}
                    </Field>{' '}
                    <Field name="recipient">
                      {({ field }: any) => (
                        <TextInput {...field} type="text" id="recipient-input" labelText="Recipient" placeholder="enter name" onKeyUp={() => setFieldTouched('recipient', true)} />
                      )}
                    </Field>{' '}
                    <ErrorMessage invalid={Boolean(touched.recipient && errors.recipient)} invalidText={errors.recipient} />
                  </FormContainer>
                </FormField>
                <FormField>
                  <ModalLabel>Transaction Alert Profile</ModalLabel>{' '}
                  <FormEmailContainer>
                    <Field name="alertProfileId">
                      {({ field }: any) => (
                        <Select id="select-1" labelText="" {...field} onKeyUp={() => setFieldTouched('alertProfileId', true)}>
                          <SelectItem text="Choose option" />
                          {profiles?.data.map((template: ILookupAlertProfile) => (
                            <SelectItem key={template.id} text={template.name} value={template.id} />
                          ))}
                        </Select>
                      )}
                    </Field>
                  </FormEmailContainer>
                  <ErrorMessage invalid={Boolean(touched.alertProfileId && errors.alertProfileId)} invalidText={errors.alertProfileId} />
                </FormField>{' '}
                <ModalLabel>Status</ModalLabel> <Checkbox name="status" label="Yes" />
              </FormGroup>
            </Form>
          )}
        </Formik>
      </ModalItem>
    </ModalContentContainer>
  );
};

export default ModalContent;

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
  margin-bottom: ${px(6)};
  // margin-top: ${px(16)};
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
