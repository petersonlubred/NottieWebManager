import { FormGroup, Select, SelectItem, TextInput } from 'carbon-components-react';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import styled from 'styled-components';

import { useToast } from '@/context/ToastContext';
import { ILookupAlertExcludeOperator, ILookupAlertExcludeType } from '@/interfaces/alert';
import { FormikRefType } from '@/interfaces/formik.type';
import { useCreateExclusionMutation, useLookupAlertExcludeOperatorQuery, useLookupAlertExcludeTypeQuery, useUpdateExclusionMutation } from '@/redux/api';
import { initialAlertExclude } from '@/schemas/dto';
import { IinitialAlertExclude } from '@/schemas/interface';
import { AlertExcludeSchema } from '@/schemas/schema';
import { px } from '@/utils';
import { pickValues } from '@/utils/helpers/helpers';

import { FormContainer } from '../onboard/NewUserLoginForm';
import ErrorMessage from '../shared/ErrorMessage/ErrorMessage';
import Loader from '../shared/Loader';

interface Iprops {
  formRef: React.RefObject<FormikRefType<IinitialAlertExclude>>;
  formdata?: IinitialAlertExclude & { alertExcludeId: string };
  toggleModal: () => void;
}

const ExcludeModalContent = ({ formRef, formdata, toggleModal }: Iprops) => {
  const [createException] = useCreateExclusionMutation();
  const [editException] = useUpdateExclusionMutation();
  const [loading, setLoading] = useState(false);
  const { data: excludeType, isFetching: isFetchingExcludeType } = useLookupAlertExcludeTypeQuery({});
  const { data: excludeOperator, isFetching: isFetchingExcludeOperator } = useLookupAlertExcludeOperatorQuery({});
  const { toast } = useToast();

  const handleSubmit = async (values: IinitialAlertExclude) => {
    const formvalues = values as IinitialAlertExclude & { alertExcludeId: string };
    try {
      setLoading(true);
      if (formdata?.alertExcludeId) {
        await editException(pickValues(formvalues)).unwrap();
      } else {
        await createException(pickValues(formvalues)).unwrap();
      }
      toggleModal();
      toast('success', 'Exclusion saved successfully');
      setLoading(false);
    } catch (error: any) {
      toast('error', error?.data?.message || error?.data?.title || 'Something went wrong');
      setLoading(false);
    }
  };
  return (
    <ModalContentContainer>
      {(loading || isFetchingExcludeOperator || isFetchingExcludeType) && <Loader />}
      <ModalItem>
        <Formik initialValues={{ ...initialAlertExclude, ...formdata }} validationSchema={AlertExcludeSchema} onSubmit={handleSubmit} innerRef={formRef}>
          {({ errors, touched, setFieldTouched }) => (
            <Form>
              <FormGroup legendText="">
                <FormField>
                  <FormContainer>
                    <Field name="excludeType">
                      {({ field }: any) => (
                        <Select id="select-1" labelText="Exclude Type" {...field} onKeyUp={() => setFieldTouched('excludeType', true)}>
                          <SelectItem value="" text="Choose option" />
                          {excludeType?.data.map((template: ILookupAlertExcludeType) => (
                            <SelectItem key={template.id} text={template.name} value={template.id} />
                          ))}
                        </Select>
                      )}
                    </Field>
                    <Field name="excludeOperator">
                      {({ field }: any) => (
                        <Select id="select-1" labelText="Exclude Operator" {...field} onKeyUp={() => setFieldTouched('excludeOperator', true)}>
                          <SelectItem value="" text="Choose option" />
                          {excludeOperator?.data.map((template: ILookupAlertExcludeOperator) => (
                            <SelectItem key={template.id} text={template.name} value={template.id} />
                          ))}
                        </Select>
                      )}
                    </Field>
                    <ErrorMessage invalid={Boolean(touched.excludeType && errors.excludeType)} invalidText={errors.excludeType} />
                    <ErrorMessage invalid={Boolean(touched.excludeOperator && errors.excludeOperator)} invalidText={errors.excludeOperator} />
                  </FormContainer>
                </FormField>
                <FormField>
                  <ModalLabel>Text to Exclude</ModalLabel>{' '}
                  <FormEmailContainer>
                    <Field name="excludeValue">
                      {({ field }: any) => (
                        <TextInput {...field} type="text" id="text-input" labelText="" placeholder="Enter value" onKeyUp={() => setFieldTouched('excludeValue', true)} />
                      )}
                    </Field>
                  </FormEmailContainer>
                  <ErrorMessage invalid={Boolean(touched.excludeValue && errors.excludeValue)} invalidText={errors.excludeValue} />
                </FormField>
              </FormGroup>
            </Form>
          )}
        </Formik>
      </ModalItem>
    </ModalContentContainer>
  );
};

export default ExcludeModalContent;

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
