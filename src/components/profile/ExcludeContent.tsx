import { px } from '@/utils';
import React from 'react';
import styled from 'styled-components';
import { FormGroup, Select, SelectItem } from '@carbon/react';
import { Formik, Form, Field } from 'formik';
import { AlertExcludeSchema } from '@/schemas';
import ErrorMessage from '../shared/ErrorMessage/ErrorMessage';
import { FormContainer } from '../onboard/NewUserLoginForm';
import { initialAlertExclude } from '@/interfaces/dtos';

interface Iprops {
  isEdit?: boolean;
}

const ExcludeModalContent = ({ isEdit }: Iprops) => {
  return (
    <ModalContentContainer>
      <ModalItem>
        <Formik
          initialValues={initialAlertExclude}
          validationSchema={AlertExcludeSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
          }}
        >
          {({ errors, touched, setFieldTouched }) => (
            <Form>
              <FormGroup legendText="">
                <FormField>
                  <FormContainer>
                    <Field name="label">
                      {({ field }: any) => (
                        <Select
                          id="select-1"
                          labelText="Label"
                          {...field}
                          onKeyUp={() => setFieldTouched('label', true)}
                        >
                          <SelectItem text="Choose option" />
                          <SelectItem text="Option 1" value="option-1" />
                          <SelectItem text="Option 2" value="option-2" />
                        </Select>
                      )}
                    </Field>
                    <Field name="operator">
                      {({ field }: any) => (
                        <Select
                          id="select-1"
                          labelText="Operator"
                          {...field}
                          onKeyUp={() => setFieldTouched('operator', true)}
                        >
                          <SelectItem text="Choose option" />
                          <SelectItem text="Option 1" value="option-1" />
                          <SelectItem text="Option 2" value="option-2" />
                        </Select>
                      )}
                    </Field>
                    <ErrorMessage
                      invalid={Boolean(touched.label && errors.label)}
                      invalidText={errors.label}
                    />
                    <ErrorMessage
                      invalid={Boolean(touched.operator && errors.operator)}
                      invalidText={errors.operator}
                    />
                  </FormContainer>
                </FormField>
                <FormField>
                  <ModalLabel>Text to Exclude</ModalLabel>{' '}
                  <FormEmailContainer>
                    <Field name="textToExclude">
                      {({ field }: any) => (
                        <Select
                          id="select-1"
                          labelText=""
                          {...field}
                          onKeyUp={() => setFieldTouched('textToExclude', true)}
                          helperText="Separate each text with comma “,”"
                        >
                          <SelectItem text="Choose option" />
                          <SelectItem text="Option 1" value="option-1" />
                          <SelectItem text="Option 2" value="option-2" />
                        </Select>
                      )}
                    </Field>
                  </FormEmailContainer>
                  <ErrorMessage
                    invalid={Boolean(
                      touched.textToExclude && errors.textToExclude
                    )}
                    invalidText={errors.textToExclude}
                  />
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
