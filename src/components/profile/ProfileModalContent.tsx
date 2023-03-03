import { FormGroup, NumberInput, Select, SelectItem, TextInput } from '@carbon/react';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import styled from 'styled-components';

import Loader from '@/components/shared/Loader';
import { useToast } from '@/context/ToastContext';
import { FormikRefType } from '@/interfaces/formik.type';
import { ITemplate } from '@/interfaces/template';
import { useCreateProfileMutation, useUpdateProfileMutation } from '@/redux/api';
import { useLookupTemplateQuery } from '@/redux/api/templateApi';
import { initialAlertProfileValue } from '@/schemas/dto';
import { IinitialAlertProfile } from '@/schemas/interface';
import { AlertProfileSchema } from '@/schemas/schema';
import { px } from '@/utils';
import { pickValues } from '@/utils/helpers/helpers';

import { FormContainer } from '../onboard/NewUserLoginForm';
import Checkbox from '../shared/Checkbox/Checkbox';
import ErrorMessage from '../shared/ErrorMessage/ErrorMessage';

interface Iprops {
  formRef: React.RefObject<FormikRefType<IinitialAlertProfile>>;
  formdata?: IinitialAlertProfile & { alertProfileId: string };
  toggleModal: () => void;
}

const ModalContent = ({ formRef, formdata, toggleModal }: Iprops) => {
  const [createProfile] = useCreateProfileMutation();
  const [editProfile] = useUpdateProfileMutation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { data: templates, isFetching } = useLookupTemplateQuery({});

  const handleSubmit = async (values: IinitialAlertProfile) => {
    const formvalues = values as IinitialAlertProfile & { alertProfileId: string };
    try {
      setLoading(true);
      if (formdata?.alertProfileId) {
        await editProfile(pickValues(formvalues)).unwrap();
      } else {
        await createProfile(pickValues(formvalues)).unwrap();
      }
      toggleModal();
      toast('success', 'Profile saved successfully');
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
        <Formik initialValues={{ ...initialAlertProfileValue, ...formdata }} validationSchema={AlertProfileSchema} onSubmit={handleSubmit} innerRef={formRef}>
          {({ errors, touched, setFieldTouched }) => (
            <Form>
              <FormGroup legendText="">
                <FormField>
                  <FormContainer>
                    <Field name="profileName">
                      {({ field }: any) => (
                        <TextInput {...field} type="text" id="name-input" labelText="Profile Name" placeholder="enter name" onKeyUp={() => setFieldTouched('profileName', true)} />
                      )}
                    </Field>
                    <Field name="templateId">
                      {({ field }: any) => (
                        <Select id="select-1" labelText="Template" {...field} onKeyUp={() => setFieldTouched('templateId', true)}>
                          <SelectItem text="Choose option" />
                          {templates?.data.map((template: ITemplate) => (
                            <SelectItem key={template.id} text={template.description} value={template.id} />
                          ))}
                        </Select>
                      )}
                    </Field>
                    <ErrorMessage invalid={Boolean(touched.profileName && errors.profileName)} invalidText={errors.profileName} />
                    <ErrorMessage invalid={Boolean(touched.templateId && errors.templateId)} invalidText={errors.templateId} />
                  </FormContainer>
                </FormField>
                <FormField>
                  <FormContainer>
                    <Field name="emailMinThreshhold">
                      {({ field }: any) => (
                        <NumberInput
                          {...field}
                          id="min_threshold-input"
                          label="Email minimum threshold"
                          max={10000}
                          min={0}
                          step={10}
                          className="number-input"
                          placeholder="0"
                          onKeyUp={() => setFieldTouched('emailMinThreshhold', true)}
                        />
                      )}
                    </Field>
                    <Field name="smsMinThreshhold">
                      {({ field }: any) => (
                        <NumberInput
                          {...field}
                          id="max_threshold-input"
                          label="Sms minimum threshold"
                          max={10000}
                          min={0}
                          step={10}
                          className="number-input"
                          placeholder="0"
                          onKeyUp={() => setFieldTouched('emailMinThreshhold', true)}
                        />
                      )}
                    </Field>
                    <ErrorMessage invalid={Boolean(touched.emailMinThreshhold && errors.emailMinThreshhold)} invalidText={errors.emailMinThreshhold} />
                    <ErrorMessage invalid={Boolean(touched.smsMinThreshhold && errors.smsMinThreshhold)} invalidText={errors.smsMinThreshhold} />
                    <ModalItem>
                      <ModalLabel>Hide Balance?</ModalLabel> <Checkbox name="hideBalance" label="Yes" />
                    </ModalItem>
                    <ModalItem>
                      <ModalLabel>Mask Account?</ModalLabel> <Checkbox name="maskAccount" label="Yes" />
                    </ModalItem>{' '}
                    <ModalItem>
                      <ModalLabel>Enable Email?</ModalLabel> <Checkbox name="enableEmail" label="Yes" />
                    </ModalItem>{' '}
                    <ModalItem>
                      <ModalLabel>Enable SMS?</ModalLabel> <Checkbox name="enableSms" label="Yes" />
                    </ModalItem>
                  </FormContainer>
                </FormField>
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
  margin-bottom: ${px(9)};
  margin-top: ${px(16)};
`;

const FormField = styled.div`
  margin-bottom: ${px(16)};
`;
