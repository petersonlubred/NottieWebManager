import { FormGroup, Select, SelectItem, TextInput } from '@carbon/react';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { FormContainer } from '@/components/onboard/NewUserLoginForm';
import ErrorMessage from '@/components/shared/ErrorMessage/ErrorMessage';
import Loader from '@/components/shared/Loader';
import { useToast } from '@/context/ToastContext';
import { SmscRoute, SmscRouteConfig } from '@/interfaces/configuration';
import { FormikRefType } from '@/interfaces/formik.type';
import {
  useCreateSmscRouteConfigMutation,
  useEditSmscRouteConfigMutation,
  useLookupAccountTypeQuery,
  useLookupCountryQuery,
  useLookupRouteTypeQuery,
  useLookupSmscIdQuery,
  useLookupSmscRouteQuery,
  useLookupTransactionTypeQuery,
} from '@/redux/api';
import { initialSMSRouteConfigValue } from '@/schemas/dto';
import { IinitialSMSRouteConfigForm } from '@/schemas/interface';
import { SMSRouteConfigSchema } from '@/schemas/schema';
import { px } from '@/utils';

interface Props {
  formRef: React.RefObject<FormikRefType<IinitialSMSRouteConfigForm>>;
  formdata?: IinitialSMSRouteConfigForm & { smscRouteConfigId: string };
  toggleModal: () => void;
}

const SMSRouteConfig = ({ formRef, formdata, toggleModal }: Props) => {
  const [countryLookup, setCountryLookup] = useState<SmscRouteConfig[]>([]);
  const [routeTypeLookup, setRouteTypeLookup] = useState<SmscRouteConfig[]>([]);
  const [smscLookup, setSmscLookup] = useState<SmscRoute[]>([]);
  const [accountTypeLookup, setAccountTypeLookup] = useState<SmscRouteConfig[]>([]);
  const [countryId, setCountryId] = useState<any>('');
  const [networkLookup, setNetworkLookup] = useState<SmscRouteConfig[]>([]);
  const [transactionTypeLookup, setTransactionTypeLookup] = useState<SmscRouteConfig[]>([]);
  const [smscRouteLookup, setSmscRouteLookup] = useState<SmscRouteConfig[]>([]);

  const [createSmscRouteConfig, { isLoading, isSuccess, isError, error }] = useCreateSmscRouteConfigMutation();
  const [editSmscRouteConfig, { isLoading: editLoading, isSuccess: editSuccess, isError: isEditError, error: editError }] = useEditSmscRouteConfigMutation();
  const { data: lookupCountryData } = useLookupCountryQuery();
  const { data: lookupRouteTypeData } = useLookupRouteTypeQuery();
  const { data: smscLookupData } = useLookupSmscIdQuery();
  const { data: lookupAccountTypeData } = useLookupAccountTypeQuery();
  const { data: lookupTransactionTypeData } = useLookupTransactionTypeQuery();
  const { data: lookupSmscRouteData } = useLookupSmscRouteQuery();

  const { toast } = useToast();

  useEffect(() => {
    if (!countryId) {
      return;
    }
    const getNetwork = async () => {
      const networkData = await axios.get(`https://api-test.nottie.net/api/Lookup/Network/${countryId}`);
      if (networkData) {
        const { data } = networkData;
        setNetworkLookup(data.data ? data.data : []);
      }
    };

    getNetwork();
  }, [countryId]);

  useEffect(() => {
    !isEmpty(smscLookupData?.data) && setSmscLookup(smscLookupData?.data as SmscRoute[]);
    !isEmpty(lookupCountryData?.data) && setCountryLookup(lookupCountryData?.data as SmscRouteConfig[]);
    !isEmpty(lookupRouteTypeData?.data) && setRouteTypeLookup(lookupRouteTypeData?.data as SmscRouteConfig[]);
    !isEmpty(lookupAccountTypeData?.data) && setAccountTypeLookup(lookupAccountTypeData?.data as SmscRouteConfig[]);
    !isEmpty(lookupTransactionTypeData?.data) && setTransactionTypeLookup(lookupTransactionTypeData?.data as SmscRouteConfig[]);
    !isEmpty(lookupSmscRouteData?.data) && setSmscRouteLookup(lookupSmscRouteData?.data as SmscRouteConfig[]);
  }, [lookupCountryData?.data, lookupRouteTypeData?.data, smscLookupData?.data, lookupAccountTypeData?.data, lookupTransactionTypeData?.data, lookupSmscRouteData?.data]);

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

  const handleSubmit = (values: IinitialSMSRouteConfigForm) => {
    const payload: any = {
      smscRouteId: values.smscRoute,
      smscId: values.aggregator,
      routeTypeId: values.routeType,
      countryId: values.country,
      networkId: values.network,
      productCode: values.productCode,
      accountType: values.accountType,
      transactionType: values.transactionType,
    };

    const formvalues = payload as IinitialSMSRouteConfigForm & { smscRouteConfigId: string };
    formdata?.smscRouteConfigId ? editSmscRouteConfig(formvalues) : createSmscRouteConfig(formvalues);
  };
  return (
    <ModalContentContainer>
      {(isLoading || editLoading) && <Loader />}
      <ModalItem>
        <Formik initialValues={initialSMSRouteConfigValue} validationSchema={SMSRouteConfigSchema} onSubmit={handleSubmit} innerRef={formRef}>
          {({ errors, touched, setFieldTouched, values, setFieldValue }) => (
            <Form>
              <FormGroup legendText="">
                <FormField>
                  <ModalLabel>SMS Route</ModalLabel>{' '}
                  <FormEmailContainer>
                    <Field name="smscRoute">
                      {({ field }: any) => (
                        <Select
                          id="smscRoute-1"
                          labelText="Smsc Route"
                          {...field}
                          onKeyUp={() => setFieldTouched('smscRoute', true)}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setFieldValue('smscRoute', e.target.value);
                          }}
                        >
                          <SelectItem text="Choose smsc route" />
                          {smscRouteLookup.map((item: any) => (
                            <SelectItem key={item.id} text={item.name} value={item.id} label={item.name} />
                          ))}
                        </Select>
                      )}
                    </Field>
                  </FormEmailContainer>
                  <ErrorMessage invalid={Boolean(touched.smscRoute && errors.smscRoute)} invalidText={errors.smscRoute} />
                </FormField>{' '}
                <FormField>
                  <FormContainer>
                    <Field name="aggregator">
                      {({ field }: any) => (
                        <Select
                          id="aggregator-1"
                          labelText="Aggregator/SMSC"
                          {...field}
                          onKeyUp={() => setFieldTouched('aggregator', true)}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setFieldValue('aggregator', e.target.value);
                          }}
                        >
                          <SelectItem text="Choose aggregator" />
                          {smscLookup.map((item: any) => (
                            <SelectItem key={item.id} text={item.name} value={item.id} label={item.name} />
                          ))}
                        </Select>
                      )}
                    </Field>
                    <Field name="routeType">
                      {({ field }: any) => (
                        <Select
                          id="routeType-1"
                          labelText="Route Type"
                          {...field}
                          onKeyUp={() => setFieldTouched('routeType', true)}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setFieldValue('routeType', e.target.value);
                          }}
                        >
                          <SelectItem text="Choose route type" />
                          {routeTypeLookup.map((item: any) => (
                            <SelectItem key={item.id} text={item.name} value={item.id} label={item.name} />
                          ))}
                        </Select>
                      )}
                    </Field>
                    <ErrorMessage invalid={Boolean(touched.aggregator && errors.aggregator)} invalidText={errors.aggregator} />
                    <ErrorMessage invalid={Boolean(touched.routeType && errors.routeType)} invalidText={errors.routeType} />
                  </FormContainer>
                </FormField>{' '}
                {values?.routeType === '1' ? (
                  <FormField>
                    <FormContainer>
                      <Field name="country">
                        {({ field }: any) => (
                          <Select
                            id="country-1"
                            labelText="Country"
                            {...field}
                            onKeyUp={() => setFieldTouched('country', true)}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              setCountryId(e.target.value);
                              setFieldValue('country', e.target.value);
                            }}
                          >
                            <SelectItem text="Choose country" />
                            {countryLookup.map((item: any) => (
                              <SelectItem key={item.id} text={item.name} value={item.id} label={item.name} />
                            ))}
                          </Select>
                        )}
                      </Field>
                      <Field name="network">
                        {({ field }: any) => (
                          <Select
                            id="network-1"
                            labelText="Network"
                            {...field}
                            disabled={networkLookup.length === 0}
                            onKeyUp={() => setFieldTouched('network', true)}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              setFieldValue('network', e.target.value);
                            }}
                          >
                            <SelectItem text="Choose network service" />
                            {networkLookup.map((item: any) => (
                              <SelectItem key={item.id} text={item.name} value={item.id} label={item.name} />
                            ))}
                          </Select>
                        )}
                      </Field>
                      <ErrorMessage invalid={Boolean(touched.country && errors.country)} invalidText={errors.country} />
                      <ErrorMessage invalid={Boolean(touched.network && errors.network)} invalidText={errors.network} />
                    </FormContainer>
                  </FormField>
                ) : values?.routeType === '2' ? (
                  <FormField>
                    <FormContainer>
                      <Field name="productCode">
                        {({ field }: any) => (
                          <TextInput
                            {...field}
                            type="text"
                            id="productCode-input"
                            labelText="Product Code"
                            placeholder="enter code"
                            onKeyUp={() => setFieldTouched('productCode', true)}
                          />
                        )}
                      </Field>
                      <ErrorMessage invalid={Boolean(touched.productCode && errors.productCode)} invalidText={errors.productCode} />
                    </FormContainer>
                  </FormField>
                ) : values.routeType === '3' ? (
                  <FormField>
                    <FormContainer>
                      <Field name="accountType">
                        {({ field }: any) => (
                          <Select
                            id="accountType-1"
                            labelText="Account Type"
                            {...field}
                            onKeyUp={() => setFieldTouched('accountType', true)}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              setFieldValue('accountType', e.target.value);
                            }}
                          >
                            <SelectItem text="Choose service type" />
                            {accountTypeLookup.map((item: any) => (
                              <SelectItem key={item.id} text={item.name} value={item.id} label={item.name} />
                            ))}
                          </Select>
                        )}
                      </Field>
                      <ErrorMessage invalid={Boolean(touched.accountType && errors.accountType)} invalidText={errors.accountType} />
                    </FormContainer>
                  </FormField>
                ) : (
                  values?.routeType === '4' && (
                    <FormField>
                      <FormContainer>
                        <Field name="transactionType">
                          {({ field }: any) => (
                            <Select
                              id="transactionType-1"
                              labelText="Transaction Type"
                              {...field}
                              onKeyUp={() => setFieldTouched('accountType', true)}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setFieldValue('transactionType', e.target.value);
                              }}
                            >
                              <SelectItem text="Choose transaction type" />
                              {transactionTypeLookup.map((item: any) => (
                                <SelectItem key={item.id} text={item.name} value={item.id} label={item.name} />
                              ))}
                            </Select>
                          )}
                        </Field>

                        <ErrorMessage invalid={Boolean(touched.transactionType && errors.transactionType)} invalidText={errors.transactionType} />
                      </FormContainer>
                    </FormField>
                  )
                )}
              </FormGroup>
            </Form>
          )}
        </Formik>
      </ModalItem>
    </ModalContentContainer>
  );
};

export default SMSRouteConfig;

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

const FormEmailContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${px(16)};
`;

const ModalLabel = styled.div`
  color: ${({ theme }) => theme.colors.lightText} !important;
  font-size: ${({ theme }) => theme.fontSizes.s};
  font-weight: 400;
  line-height: ${px(12)};
  margin-bottom: ${px(9)};
  margin-top: ${px(16)};
`;
