import { FormGroup, Select, SelectItem, TextInput } from '@carbon/react';
import { Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import { FormContainer } from '@/components/onboard/NewUserLoginForm';
import ErrorMessage from '@/components/shared/ErrorMessage/ErrorMessage';
import Loader from '@/components/shared/Loader';
import { useToast } from '@/context/ToastContext';
import { FormikRefType } from '@/interfaces/formik.type';
import { useCreateSmscRouteMutation, useEditSmscRouteMutation } from '@/redux/api';
import { initialSMSRouteValue } from '@/schemas/dto';
import { IinitialSMSRouteForm } from '@/schemas/interface';
import { SMSRouteSchema } from '@/schemas/schema';
import { px } from '@/utils';
interface Props {
  formRef: React.RefObject<FormikRefType<IinitialSMSRouteForm>>;
  formdata?: IinitialSMSRouteForm & { smscRouteId: string };
  toggleModal: () => void;
}

const SMSRoute = ({ formRef, formdata, toggleModal }: Props) => {
  const [createSmscRoute, { isLoading, isSuccess, isError, error }] = useCreateSmscRouteMutation();
  const [editSmscRoute, { isLoading: editLoading, isSuccess: editSuccess, isError: isEditError, error: editError }] = useEditSmscRouteMutation();

  const { toast } = useToast();

  useEffect(() => {
    if (isSuccess) {
      toast('success', 'SMSC ROUTE configuration saved successfully');
      toggleModal();
    }
    if (isError && error && 'status' in error) {
      toast('error', error?.data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isError, isSuccess]);

  useEffect(() => {
    if (editSuccess) {
      toast('success', 'SMSC ROUTE edited successfully');
      toggleModal();
    }
    if (isEditError && editError && 'status' in editError) {
      toast('error', editError?.data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editError, editSuccess, isEditError]);

  const handleSubmit = (values: IinitialSMSRouteForm) => {
    const payload: any = {
      smscRouteName: values.route_name,
      ...values,
    };
    // console.log('clicked', payload);
    return;
    const formvalues = payload as IinitialSMSRouteForm & { smscRouteId: string };
    formdata?.smscRouteId ? editSmscRoute(formvalues) : createSmscRoute(formvalues);
  };

  return (
    <ModalContentContainer>
      {(isLoading || editLoading) && <Loader />}
      <ModalItem>
        <Formik initialValues={formdata?.smscRouteId ? formdata : initialSMSRouteValue} validationSchema={SMSRouteSchema} onSubmit={handleSubmit} innerRef={formRef}>
          {({ errors, touched, setFieldTouched }) => (
            <Form>
              <FormGroup legendText="">
                <FormField>
                  <FormContainer>
                    <Field name="route_name">
                      {({ field }: any) => (
                        <TextInput
                          {...field}
                          type="text"
                          id="route_name-input"
                          labelText="SMS Route Name"
                          placeholder="enter name"
                          onKeyUp={() => setFieldTouched('route_name', true)}
                        />
                      )}
                    </Field>
                    <Field name="aggregator">
                      {({ field }: any) => (
                        <TextInput
                          {...field}
                          type="text"
                          id="aggregator-input"
                          labelText="Aggregator/SMSC"
                          placeholder="enter text"
                          onKeyUp={() => setFieldTouched('aggregator', true)}
                        />
                      )}
                    </Field>
                    <ErrorMessage invalid={Boolean(touched.route_name && errors.route_name)} invalidText={errors.route_name} />
                    <ErrorMessage invalid={Boolean(touched.aggregator && errors.aggregator)} invalidText={errors.aggregator} />
                  </FormContainer>
                </FormField>{' '}
                <FormField>
                  <ModalLabel>Service Type</ModalLabel>{' '}
                  <FormEmailContainer>
                    <Field name="serviceType">
                      {({ field }: any) => (
                        <Select id="select-1" labelText="" {...field} onKeyUp={() => setFieldTouched('serviceType', true)}>
                          <SelectItem text="Choose option" />
                          <SelectItem text="Option 1" value="option-1" />
                          <SelectItem text="Option 2" value="option-2" />
                        </Select>
                      )}
                    </Field>
                  </FormEmailContainer>
                  <ErrorMessage invalid={Boolean(touched.serviceType && errors.serviceType)} invalidText={errors.serviceType} />
                </FormField>{' '}
              </FormGroup>
            </Form>
          )}
        </Formik>
      </ModalItem>
    </ModalContentContainer>
  );
};

export default SMSRoute;

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
