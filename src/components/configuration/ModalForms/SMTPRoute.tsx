import { FormGroup, Select, SelectItem, TextInput } from '@carbon/react';
import { Field, Form, Formik } from 'formik';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { FormContainer } from '@/components/onboard/NewUserLoginForm';
import ErrorMessage from '@/components/shared/ErrorMessage/ErrorMessage';
import Loader from '@/components/shared/Loader';
import { useToast } from '@/context/ToastContext';
import { SmscRoute, SmtpRoute } from '@/interfaces/configuration';
import { FormikRefType } from '@/interfaces/formik.type';
import { useCreateSmtpRouteMutation, useEditSmtpRouteMutation, useLookupServiceTypeIdQuery, useLookupSmtpQuery } from '@/redux/api';
import { initialSMTPRouteValue } from '@/schemas/dto';
import { IinitialSMTPRouteForm } from '@/schemas/interface';
import { SMTPRouteSchema } from '@/schemas/schema';
import { px } from '@/utils';

interface Props {
  formRef: React.RefObject<FormikRefType<IinitialSMTPRouteForm>>;
  formdata?: IinitialSMTPRouteForm & { smtpRouteId: string };
  toggleModal: () => void;
}
export type LookupTemp = {
  id?: string;
  name: string;
  description: string;
};

const SMTPRoute = ({ formRef, formdata, toggleModal }: Props) => {
  const [serviceTypeLookup, setServiceTypeLookup] = useState<SmscRoute[]>([]);
  const [smtpLookup, setSmtpLookup] = useState<SmtpRoute[]>([]);
  const [editSmtpRoute, { isLoading: editLoading, isSuccess: editSuccess, isError: isEditError, error: editError }] = useEditSmtpRouteMutation();
  const [createSmtpRoute, { isLoading, isSuccess, isError, error }] = useCreateSmtpRouteMutation();
  const { data: serviceTypeLookupData } = useLookupServiceTypeIdQuery();
  const { data: smtpLookupData } = useLookupSmtpQuery();

  const { toast } = useToast();

  useEffect(() => {
    !isEmpty(serviceTypeLookupData?.data) && setServiceTypeLookup(serviceTypeLookupData?.data as SmscRoute[]);
    !isEmpty(smtpLookupData?.data) && setSmtpLookup(smtpLookupData?.data as SmtpRoute[]);
  }, [serviceTypeLookupData?.data, smtpLookupData?.data]);

  useEffect(() => {
    if (isSuccess) {
      toast('success', 'SMTP ROUTE configuration saved successfully');
      toggleModal();
    }
    if (isError && error && 'status' in error) {
      toast('error', error?.data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isError, isSuccess]);

  useEffect(() => {
    if (editSuccess) {
      toast('success', 'SMTP ROUTE edited successfully');
      toggleModal();
    }
    if (isEditError && editError && 'status' in editError) {
      toast('error', editError?.data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editError, editSuccess, isEditError]);

  const handleSubmit = (values: IinitialSMTPRouteForm) => {
    const payload: any = {
      ...values,
    };

    const formvalues = payload as IinitialSMTPRouteForm & { smtpRouteId: string };
    formdata?.smtpRouteId ? editSmtpRoute(formvalues) : createSmtpRoute(formvalues);
  };

  return (
    <ModalContentContainer>
      {(isLoading || editLoading) && <Loader />}
      <ModalItem>
        <Formik initialValues={{ ...initialSMTPRouteValue, ...formdata }} validationSchema={SMTPRouteSchema} onSubmit={handleSubmit} innerRef={formRef}>
          {({ errors, touched, setFieldTouched }) => (
            <Form>
              <FormGroup legendText="">
                <FormField>
                  <FormContainer>
                    <Field name="routeName">
                      {({ field }: any) => (
                        <TextInput
                          {...field}
                          type="text"
                          id="routeName-input"
                          labelText="SMTP Route Name"
                          placeholder="enter name"
                          onKeyUp={() => setFieldTouched('routeName', true)}
                        />
                      )}
                    </Field>
                    <Field name="smtpId">
                      {({ field }: any) => (
                        <Select id="select-1" labelText="Smtp Name" {...field} onKeyUp={() => setFieldTouched('smtpId', true)}>
                          <SelectItem text="Choose smtp name" />
                          {smtpLookup.map((item: any) => (
                            <SelectItem key={item.id} text={item.name} value={item.id} />
                          ))}
                        </Select>
                      )}
                    </Field>
                    <ErrorMessage invalid={Boolean(touched.routeName && errors.routeName)} invalidText={errors.routeName} />
                    <ErrorMessage invalid={Boolean(touched.smtpId && errors.smtpId)} invalidText={errors.smtpId} />
                  </FormContainer>
                </FormField>{' '}
                <FormField>
                  <ModalLabel>Service Type</ModalLabel>{' '}
                  <FormEmailContainer>
                    <Field name="serviceTypeId">
                      {({ field }: any) => (
                        <Select id="select-1" labelText="" {...field} onKeyUp={() => setFieldTouched('serviceTypeId', true)}>
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

export default SMTPRoute;

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
