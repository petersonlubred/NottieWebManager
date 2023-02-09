import { px } from '@/utils';
import React from 'react';
import styled from 'styled-components';
import {
  Checkbox,
  TextInput,
  FormGroup,
  Select,
  SelectItem,
} from '@carbon/react';
import { Formik, Form, Field } from 'formik';
import { SubscriptionSchema } from '@/schemas';
import ErrorMessage from '../shared/ErrorMessage/ErrorMessage';
import { FormContainer } from '../onboard/NewUserLoginForm';
import { initialSubscription } from '@/interfaces/dtos';
import RadioList from '../shared/Radio/RadioList';

interface Iprops {
  isEdit?: boolean;
}

const ModalContent = ({ isEdit }: Iprops) => {
  return (
    <ModalContentContainer>
      <ModalItem>
        <Formik
          initialValues={initialSubscription}
          validationSchema={SubscriptionSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
          }}
        >
          {({ errors, touched, setFieldTouched }) => (
            <Form>
              <FormGroup legendText="">
                <FormField>
                  <FormContainer>
                    <Field name="customerId">
                      {({ field }: any) => (
                        <TextInput
                          {...field}
                          type="text"
                          id="customerId-input"
                          labelText="Customer ID"
                          placeholder="enter name"
                          onKeyUp={() => setFieldTouched('customerId', true)}
                        />
                      )}
                    </Field>{' '}
                    <Field name="accountNo">
                      {({ field }: any) => (
                        <TextInput
                          {...field}
                          type="text"
                          id="accountNo-input"
                          labelText="Account No"
                          placeholder="input text"
                          onKeyUp={() => setFieldTouched('accountNo', true)}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      invalid={Boolean(touched.customerId && errors.customerId)}
                      invalidText={errors.customerId}
                    />
                    <ErrorMessage
                      invalid={Boolean(touched.accountNo && errors.accountNo)}
                      invalidText={errors.accountNo}
                    />
                  </FormContainer>
                </FormField>
                <FormField>
                  <FormContainer>
                    <Field name="alertMedium">
                      {({ field }: any) => (
                        <ModalItem {...field}>
                          <ModalLabel>Alert Medium</ModalLabel>
                          <RadioList Radioitems={['Classic', 'AD', 'SSO']} />
                        </ModalItem>
                      )}
                    </Field>{' '}
                    <Field name="recipient">
                      {({ field }: any) => (
                        <TextInput
                          {...field}
                          type="text"
                          id="recipient-input"
                          labelText="Recipient"
                          placeholder="enter name"
                          onKeyUp={() => setFieldTouched('recipient', true)}
                        />
                      )}
                    </Field>{' '}
                    <ErrorMessage
                      invalid={Boolean(touched.recipient && errors.recipient)}
                      invalidText={errors.recipient}
                    />
                    <ErrorMessage
                      invalid={Boolean(
                        touched.alertMedium && errors.alertMedium
                      )}
                      invalidText={errors.alertMedium}
                    />
                  </FormContainer>
                </FormField>
                <FormField>
                  <ModalLabel>Transaction Alert Profile</ModalLabel>{' '}
                  <FormEmailContainer>
                    <Field name="profile">
                      {({ field }: any) => (
                        <Select
                          id="select-1"
                          labelText=""
                          {...field}
                          onKeyUp={() => setFieldTouched('profile', true)}
                        >
                          <SelectItem text="Choose option" />
                          <SelectItem text="Option 1" value="option-1" />
                          <SelectItem text="Option 2" value="option-2" />
                        </Select>
                      )}
                    </Field>
                  </FormEmailContainer>
                  <ErrorMessage
                    invalid={Boolean(touched.profile && errors.profile)}
                    invalidText={errors.profile}
                  />
                </FormField>{' '}
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
  margin-bottom: ${px(6)};
  // margin-top: ${px(16)};
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
