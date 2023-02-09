import { px } from '@/utils';
import React from 'react';
import styled from 'styled-components';
import {
  Checkbox,
  TextInput,
  FormGroup,
  Select,
  SelectItem,
  NumberInput,
} from '@carbon/react';
import { Formik, Form, Field } from 'formik';
import { AlertProfileSchema } from '@/schemas';
import ErrorMessage from '../shared/ErrorMessage/ErrorMessage';
import { FormContainer } from '../onboard/NewUserLoginForm';
import { initialAlertProfileValue } from '@/interfaces/dtos';

interface Iprops {
  isEdit?: boolean;
}

const ModalContent = ({ isEdit }: Iprops) => {
  return (
    <ModalContentContainer>
      <ModalItem>
        <Formik
          initialValues={initialAlertProfileValue}
          validationSchema={AlertProfileSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
          }}
        >
          {({ errors, touched, setFieldTouched }) => (
            <Form>
              <FormGroup legendText="">
                <FormField>
                  <FormContainer>
                    <Field name="name">
                      {({ field }: any) => (
                        <TextInput
                          {...field}
                          type="text"
                          id="name-input"
                          labelText="Profile Name"
                          placeholder="enter name"
                          onKeyUp={() => setFieldTouched('name', true)}
                        />
                      )}
                    </Field>
                    <Field name="template">
                      {({ field }: any) => (
                        <Select
                          id="select-1"
                          labelText="Template"
                          {...field}
                          onKeyUp={() => setFieldTouched('template', true)}
                        >
                          <SelectItem text="Choose option" />
                          <SelectItem text="Option 1" value="option-1" />
                          <SelectItem text="Option 2" value="option-2" />
                        </Select>
                      )}
                    </Field>
                    <ErrorMessage
                      invalid={Boolean(touched.name && errors.name)}
                      invalidText={errors.name}
                    />
                    <ErrorMessage
                      invalid={Boolean(touched.template && errors.template)}
                      invalidText={errors.template}
                    />
                  </FormContainer>
                </FormField>
                <FormField>
                  <ModalLabel>Profile Description</ModalLabel>{' '}
                  <FormEmailContainer>
                    <Field name="description">
                      {({ field }: any) => (
                        <TextInput
                          {...field}
                          type="text"
                          id="description-input"
                          labelText=""
                          placeholder="Enter description"
                          onKeyUp={() => setFieldTouched('description', true)}
                        />
                      )}
                    </Field>
                  </FormEmailContainer>
                  <ErrorMessage
                    invalid={Boolean(touched.description && errors.description)}
                    invalidText={errors.description}
                  />
                </FormField>{' '}
                <FormField>
                  <FormContainer>
                    <Field name="min_threshold">
                      {({ field }: any) => (
                        <NumberInput
                          {...field}
                          id="min_threshold-input"
                          label="Email minimum threshold"
                          max={10000}
                          min={0}
                          step={10}
                          className="number-input"
                          value={0}
                          placeholder="0"
                          onKeyUp={() => setFieldTouched('min_threshold', true)}
                        />
                      )}
                    </Field>
                    <Field name="max_threshold">
                      {({ field }: any) => (
                        <NumberInput
                          {...field}
                          id="max_threshold-input"
                          label="Email maximum threshold"
                          max={10000}
                          min={0}
                          step={10}
                          className="number-input"
                          value={0}
                          placeholder="0"
                          onKeyUp={() => setFieldTouched('max_threshold', true)}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      invalid={Boolean(
                        touched.min_threshold && errors.min_threshold
                      )}
                      invalidText={errors.min_threshold}
                    />
                    <ErrorMessage
                      invalid={Boolean(
                        touched.max_threshold && errors.max_threshold
                      )}
                      invalidText={errors.max_threshold}
                    />
                    <ModalItem>
                      <ModalLabel>Hide Balance?</ModalLabel>{' '}
                      <Checkbox id="checked" labelText="Yes" />
                    </ModalItem>
                    <ModalItem>
                      <ModalLabel>Mask Account?</ModalLabel>{' '}
                      <Checkbox id="checked-5" labelText="Yes" />
                    </ModalItem>{' '}
                    <ModalItem>
                      <ModalLabel>Enable Email?</ModalLabel>{' '}
                      <Checkbox id="checked-2" labelText="Yes" />
                    </ModalItem>{' '}
                    <ModalItem>
                      <ModalLabel>Enable SMS?</ModalLabel>{' '}
                      <Checkbox id="checked-4" labelText="Yes" />
                    </ModalItem>
                  </FormContainer>
                </FormField>
                <ModalItem>
                  <ModalLabel>Status</ModalLabel>{' '}
                  <Checkbox id="checked-3" labelText="Yes" />
                </ModalItem>
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

const FormEmailContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${px(16)};
`;
