import { FormGroup, Select, SelectItem, TextInput } from '@carbon/react';
import { Field, Form, Formik } from 'formik';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { FormContainer } from '@/components/onboard/NewUserLoginForm';
import ErrorMessage from '@/components/shared/ErrorMessage/ErrorMessage';
import Loader from '@/components/shared/Loader';
import { useToast } from '@/context/ToastContext';
import { SmscRoute } from '@/interfaces/configuration';
import { FormikRefType } from '@/interfaces/formik.type';
import { useCreateSmscRouteMutation, useEditSmscRouteMutation, useLookupServiceTypeIdQuery, useLookupSmscIdQuery } from '@/redux/api';
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
  const [smscLookup, setSmscLookup] = useState<SmscRoute[]>([]);
  const [serviceTypeLookup, setServiceTypeLookup] = useState<SmscRoute[]>([]);
  const [createSmscRoute, { isLoading, isSuccess, isError, error }] = useCreateSmscRouteMutation();
  const [editSmscRoute, { isLoading: editLoading, isSuccess: editSuccess, isError: isEditError, error: editError }] = useEditSmscRouteMutation();
  const { data: smscLookupData } = useLookupSmscIdQuery();
  const { data: serviceTypeLookupData } = useLookupServiceTypeIdQuery();

  const { toast } = useToast();

  useEffect(() => {
    !isEmpty(smscLookupData?.data) && setSmscLookup(smscLookupData?.data as SmscRoute[]);
    !isEmpty(serviceTypeLookupData?.data) && setServiceTypeLookup(serviceTypeLookupData?.data as SmscRoute[]);
  }, [smscLookupData?.data, serviceTypeLookupData?.data]);

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
      ...values,
    };

    const formvalues = payload as IinitialSMSRouteForm & { smscRouteId: string };
    formdata?.smscRouteId ? editSmscRoute(formvalues) : createSmscRoute(formvalues);
  };

  return (
    <ModalContentContainer>
      {(isLoading || editLoading) && <Loader />}
      <ModalItem>
        <Formik
          initialValues={formdata?.smscRouteId ? formdata : initialSMSRouteValue}
          validationSchema={SMSRouteSchema}
          onSubmit={handleSubmit}
          innerRef={formRef}
          enableReinitialize
        >
          {({ errors, touched, setFieldTouched }) => (
            <Form>
              <FormGroup legendText="">
                <FormField>
                  <FormContainer>
                    <Field name="smscRouteName">
                      {({ field }: any) => (
                        <TextInput
                          {...field}
                          type="text"
                          id="smscRouteName-input"
                          labelText="SMS Route Name"
                          placeholder="enter name"
                          onKeyUp={() => setFieldTouched('smscRouteName', true)}
                        />
                      )}
                    </Field>
                    <Field name="smscId">
                      {({ field }: any) => (
                        <Select id="smscId-input" labelText="Aggregator/SMSC" {...field} onKeyUp={() => setFieldTouched('smscId', true)}>
                          <SelectItem text="Choose service type" />
                          {smscLookup.map((item: any) => (
                            <SelectItem key={item.id} text={item.name} value={item.id} />
                          ))}
                        </Select>
                      )}
                    </Field>
                    <ErrorMessage invalid={Boolean(touched.smscRouteName && errors.smscRouteName)} invalidText={errors.smscRouteName} />
                    <ErrorMessage invalid={Boolean(touched.smscId && errors.smscId)} invalidText={errors.smscId} />
                  </FormContainer>
                </FormField>{' '}
                <FormField>
                  <ModalLabel>Service Type</ModalLabel>{' '}
                  <FormEmailContainer>
                    <Field name="serviceTypeId">
                      {({ field }: any) => (
                        <Select id="serviceTypeId-input" labelText="" {...field} onKeyUp={() => setFieldTouched('serviceType', true)}>
                          <SelectItem text="Choose service type" />
                          {serviceTypeLookup.map((item: any) => (
                            <SelectItem key={item.id} text={item.name} value={item.id} />
                          ))}
                        </Select>
                      )}
                    </Field>
                  </FormEmailContainer>
                  <ErrorMessage invalid={Boolean(touched.serviceTypeId && errors.serviceTypeId)} invalidText={errors.serviceTypeId} />
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
