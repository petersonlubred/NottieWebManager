import { px } from '@/utils';
import React from 'react';
import styled from 'styled-components';
import { TextInput, FormGroup, Select, SelectItem } from '@carbon/react';
import { Formik, Form, Field } from 'formik';
import { SMSRouteConfigSchema } from '@/schemas';
import { initialSMSRouteConfigValue } from '@/interfaces/dtos';
import { FormContainer } from '@/components/onboard/NewUserLoginForm';
import ErrorMessage from '@/components/shared/ErrorMessage/ErrorMessage';

const SMSRouteConfig = () => {
  return (
    <ModalContentContainer>
      <ModalItem>
        <Formik
          initialValues={initialSMSRouteConfigValue}
          validationSchema={SMSRouteConfigSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
          }}
        >
          {({ errors, touched, setFieldTouched, values }) => (
            <Form>
              <FormGroup legendText="">
                <FormField>
                  <ModalLabel>SMS Route</ModalLabel>{' '}
                  <FormEmailContainer>
                    <Field name="route">
                      {({ field }: any) => (
                        <Select
                          id="select-1"
                          labelText=""
                          {...field}
                          onKeyUp={() => setFieldTouched('route', true)}
                        >
                          <SelectItem text="Choose option" />
                          <SelectItem text="Option 1" value="option-1" />
                          <SelectItem text="Option 2" value="option-2" />
                        </Select>
                      )}
                    </Field>
                  </FormEmailContainer>
                  <ErrorMessage
                    invalid={Boolean(touched.route && errors.route)}
                    invalidText={errors.route}
                  />
                </FormField>{' '}
                <FormField>
                  <FormContainer>
                    <Field name="aggregator">
                      {({ field }: any) => (
                        <Select
                          id="select-1"
                          labelText="Aggregator/SMSC"
                          {...field}
                          onKeyUp={() => setFieldTouched('aggregator', true)}
                        >
                          <SelectItem text="Choose option" />
                          <SelectItem text="Option 1" value="option-1" />
                          <SelectItem text="Option 2" value="option-2" />
                        </Select>
                      )}
                    </Field>
                    <Field name="routeType">
                      {({ field }: any) => (
                        <Select
                          id="select-1"
                          labelText="Route Type"
                          {...field}
                          onKeyUp={() => setFieldTouched('routeType', true)}
                        >
                          <SelectItem text="Choose an option" />
                          <SelectItem text="Network" value="network" />
                          <SelectItem text="Product code" value="productCode" />
                          <SelectItem text="Account" value="account" />
                          <SelectItem text="Transaction" value="transaction" />
                        </Select>
                      )}
                    </Field>
                    <ErrorMessage
                      invalid={Boolean(touched.aggregator && errors.aggregator)}
                      invalidText={errors.aggregator}
                    />
                    <ErrorMessage
                      invalid={Boolean(touched.routeType && errors.routeType)}
                      invalidText={errors.routeType}
                    />
                  </FormContainer>
                </FormField>{' '}
                {values?.routeType === 'network' ? (
                  <FormField>
                    <FormContainer>
                      <Field name="country">
                        {({ field }: any) => (
                          <Select
                            id="select-1"
                            labelText="Country"
                            {...field}
                            onKeyUp={() => setFieldTouched('country', true)}
                          >
                            <SelectItem text="Choose option" />
                            <SelectItem text="Option 1" value="option-1" />
                            <SelectItem text="Option 2" value="option-2" />
                          </Select>
                        )}
                      </Field>
                      <Field name="network">
                        {({ field }: any) => (
                          <Select
                            id="select-1"
                            labelText="Route Type"
                            {...field}
                            onKeyUp={() => setFieldTouched('network', true)}
                          >
                            <SelectItem text="Choose a network" />
                            <SelectItem text="Option 1" value="option-1" />
                            <SelectItem text="Option 2" value="option-2" />
                          </Select>
                        )}
                      </Field>
                      <ErrorMessage
                        invalid={Boolean(touched.country && errors.country)}
                        invalidText={errors.country}
                      />
                      <ErrorMessage
                        invalid={Boolean(touched.network && errors.network)}
                        invalidText={errors.network}
                      />
                    </FormContainer>
                  </FormField>
                ) : values?.routeType === 'productCode' ? (
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
                      <ErrorMessage
                        invalid={Boolean(
                          touched.productCode && errors.productCode
                        )}
                        invalidText={errors.productCode}
                      />
                    </FormContainer>
                  </FormField>
                ) : values.routeType === 'account' ? (
                  <FormField>
                    <FormContainer>
                      <Field name="accountType">
                        {({ field }: any) => (
                          <Select
                            id="select-1"
                            labelText="Account Type"
                            {...field}
                            onKeyUp={() => setFieldTouched('accountType', true)}
                          >
                            <SelectItem text="Choose option" />
                            <SelectItem text="Option 1" value="option-1" />
                            <SelectItem text="Option 2" value="option-2" />
                          </Select>
                        )}
                      </Field>
                      <ErrorMessage
                        invalid={Boolean(
                          touched.accountType && errors.accountType
                        )}
                        invalidText={errors.accountType}
                      />
                    </FormContainer>
                  </FormField>
                ) : (
                  values?.routeType === 'transaction' && (
                    <FormField>
                      <FormContainer>
                        <Field name="transactionType">
                          {({ field }: any) => (
                            <Select
                              id="select-1"
                              labelText="Transaction Type"
                              {...field}
                              onKeyUp={() =>
                                setFieldTouched('transactionType', true)
                              }
                            >
                              <SelectItem text="Choose option" />
                              <SelectItem text="Option 1" value="option-1" />
                              <SelectItem text="Option 2" value="option-2" />
                            </Select>
                          )}
                        </Field>

                        <ErrorMessage
                          invalid={Boolean(
                            touched.transactionType && errors.transactionType
                          )}
                          invalidText={errors.transactionType}
                        />
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
