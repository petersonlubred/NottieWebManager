import { FormGroup, Select, SelectItem, TextInput } from '@carbon/react';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import styled from 'styled-components';

import { useToast } from '@/context/ToastContext';
import { ILookupAlertProfile } from '@/interfaces/alert';
import { FormikRefType } from '@/interfaces/formik.type';
import { useCreateSubscriptionMutation, useLookupAlertProfileQuery, useUpdateSubscriptionMutation } from '@/redux/api';
import { initialSubscription } from '@/schemas/dto';
import { IinitialSubscription } from '@/schemas/interface';
import { SubscriptionSchema } from '@/schemas/schema';
import { px } from '@/utils';
import { pickValues } from '@/utils/helpers/helpers';

import { FormContainer } from '../onboard/NewUserLoginForm';
import Checkbox from '../shared/Checkbox/Checkbox';
import ErrorMessage from '../shared/ErrorMessage/ErrorMessage';
import Loader from '../shared/Loader';
import RadioButton from '../shared/RadioButton';

interface Iprops {
  formRef: React.RefObject<FormikRefType<IinitialSubscription>>;
  formdata?: IinitialSubscription & { alertSubscriptionId: string };
  toggleModal: () => void;
}

const SubscriptionModalContent = ({ formRef, formdata, toggleModal }: Iprops) => {
  const [editException] = useUpdateSubscriptionMutation();
  const [createException] = useCreateSubscriptionMutation();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { data: profiles, isFetching } = useLookupAlertProfileQuery({});

  const handleSubmit = async (values: IinitialSubscription) => {
    const formvalues = values as IinitialSubscription & { alertSubscriptionId: string };
    try {
      setLoading(true);
      if (formdata?.alertSubscriptionId) {
        await editException(pickValues(formvalues)).unwrap();
      } else {
        await createException(pickValues(formvalues)).unwrap();
      }
      toggleModal();
      toast('success', 'Subscription saved successfully');
      setLoading(false);
    } catch (error: any) {
      toast('error', error?.data?.message || error?.data?.title || 'Something went wrong');
      setLoading(false);
    }
  };
  return (
    <ModalContentContainer>
      {(loading || isFetching) && <Loader />}
      <ModalItem>
        <Formik initialValues={{ ...initialSubscription, ...formdata }} validationSchema={SubscriptionSchema} onSubmit={handleSubmit} innerRef={formRef}>
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
                            items={[
                              { value: 'sms', label: 'SMS' },
                              { value: 'email', label: 'Email' },
                            ]}
                          />
                        </ModalItem>
                      )}
                    </Field>{' '}
                    <Field name="recipient">
                      {({ field }: any) => (
                        <TextInput {...field} type="text" id="recipient-input" labelText="Recipient" placeholder="enter name" onKeyUp={() => setFieldTouched('recipient', true)} />
                      )}
                    </Field>{' '}
                    <ErrorMessage invalid={Boolean(touched.alertType && errors.alertType)} invalidText={errors.alertType} />
                    <ErrorMessage invalid={Boolean(touched.recipient && errors.recipient)} invalidText={errors.recipient} />
                  </FormContainer>
                </FormField>
                <FormField>
                  <ModalLabel> Transaction Alert Profile</ModalLabel>{' '}
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
                <ModalItem>
                  <ModalLabel>Status</ModalLabel> <Checkbox name="status" label="Yes" />
                </ModalItem>
              </FormGroup>
            </Form>
          )}
        </Formik>
      </ModalItem>
    </ModalContentContainer>
  );
};

export default SubscriptionModalContent;

const ModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${px(17)};
  justify-content: center;
`;

const ModalItem = styled.div``;

export const ModalLabel = styled.div`
  color: ${({ theme }) => theme.colors.lightText} !important;
  font-size: ${({ theme }) => theme.fontSizes.s};
  font-weight: 400;
  line-height: ${px(12)};
  margin-bottom: ${px(6)};
  margin-top: ${px(16)};
`;

const FormField = styled.div`
  margin-bottom: ${px(16)};
`;

export const FormEmailContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${px(16)};
`;
