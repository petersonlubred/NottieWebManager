import { px } from '@/utils';
import React from 'react';
import styled from 'styled-components';
import { TextInput, FormGroup, Select, SelectItem } from '@carbon/react';
import { Formik, Form, Field } from 'formik';
import { SMSRouteSchema } from '@/schemas/schema';
import { initialSMSRouteValue } from '@/schemas/schema';
import { FormContainer } from '@/components/onboard/NewUserLoginForm';
import ErrorMessage from '@/components/shared/ErrorMessage/ErrorMessage';

const SMSRoute = () => {
  return (
    <ModalContentContainer>
      <ModalItem>
        <Formik
          initialValues={initialSMSRouteValue}
          validationSchema={SMSRouteSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
          }}
        >
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
                    <ErrorMessage
                      invalid={Boolean(touched.route_name && errors.route_name)}
                      invalidText={errors.route_name}
                    />
                    <ErrorMessage
                      invalid={Boolean(touched.aggregator && errors.aggregator)}
                      invalidText={errors.aggregator}
                    />
                  </FormContainer>
                </FormField>{' '}
                <FormField>
                  <ModalLabel>Service Type</ModalLabel>{' '}
                  <FormEmailContainer>
                    <Field name="serviceType">
                      {({ field }: any) => (
                        <Select
                          id="select-1"
                          labelText=""
                          {...field}
                          onKeyUp={() => setFieldTouched('serviceType', true)}
                        >
                          <SelectItem text="Choose option" />
                          <SelectItem text="Option 1" value="option-1" />
                          <SelectItem text="Option 2" value="option-2" />
                        </Select>
                      )}
                    </Field>
                  </FormEmailContainer>
                  <ErrorMessage
                    invalid={Boolean(touched.serviceType && errors.serviceType)}
                    invalidText={errors.serviceType}
                  />
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
