import { px } from '@/utils';
import React from 'react';
import styled from 'styled-components';
import RadioList from './RadioList';
import { Checkbox, TextInput, MultiSelect, FormGroup } from '@carbon/react';
import { Formik, Form, Field } from 'formik';
import { EmailSchema } from '@/schemas';
import Button from '../shared/Button';
import ErrorMessage from '../shared/ErrorMessage/ErrorMessage';
import { FormContainer } from '../onboard/NewUserLoginForm';

interface Iprops {
  isEdit?: boolean;
}

const ModalContent = ({ isEdit }: Iprops) => {
  return (
    <ModalContentContainer>
      <ModalItem>
        <ModalLabel>AuthenticationType</ModalLabel>
        <RadioList />
      </ModalItem>
      <ModalItem>
        <ModalLabel>Enable Access</ModalLabel>{' '}
        <Checkbox id="checked" labelText="Yes" />
      </ModalItem>
      <ModalItem>
        <ModalLabel>Role</ModalLabel>{' '}
        <MultipleSelect
          id="carbon-multiselect-example"
          itemToString={(item: any) => (item ? item.text : '')}
          items={[
            {
              id: 'downshift-1-item-4',
              text: 'Admin',
            },
            {
              id: 'downshift-1-item-0',
              text: 'Customer Support',
            },
            {
              id: 'downshift-1-item-1',
              text: 'Treasurer',
            },
          ]}
          label="Choose roles"
          size="md"
        />
      </ModalItem>
      <ModalItem>
        <ModalLabel>Email Address</ModalLabel>{' '}
        <Formik
          initialValues={{ email: '', firstname: '', lastname: '' }}
          validationSchema={EmailSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
          }}
        >
          {({ errors, touched, setFieldTouched, values }) => (
            <Form>
              <FormGroup legendText="">
                <FormField>
                  <FormEmailContainer>
                    <Field name="email">
                      {({ field }: any) => (
                        <TextInput
                          {...field}
                          type="text"
                          id="server-input"
                          labelText=""
                          placeholder="input text"
                          onKeyUp={() => setFieldTouched('email', true)}
                        />
                      )}
                    </Field>
                    {!isEdit && (
                      <Button
                        renderIcon={null}
                        disabled={
                          Boolean(touched.email && errors.email) ||
                          !values?.email
                        }
                        handleClick={() => console.log('click')}
                        buttonLabel="Validate Email"
                        validateButton
                      />
                    )}
                  </FormEmailContainer>
                  <ErrorMessage
                    invalid={Boolean(touched.email && errors.email)}
                    invalidText={errors.email}
                  />
                </FormField>
                <FormContainer>
                  <Field name="firstname">
                    {({ field }: any) => (
                      <TextInput
                        {...field}
                        type="text"
                        id="firstname-input"
                        labelText="First Name"
                        placeholder="input text"
                      />
                    )}
                  </Field>
                  <Field name="lastname">
                    {({ field }: any) => (
                      <TextInput
                        {...field}
                        type="text"
                        id="lastname-input"
                        labelText="Last Name"
                        placeholder="input text"
                      />
                    )}
                  </Field>
                </FormContainer>
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
`;

const MultipleSelect = styled(MultiSelect)`
  label {
    display: none;
  }
  & > div {
    background-color: ${({ theme }) => theme.colors.bgPrimaryLight} !important;
  }
  .cds--list-box__label {
    color: ${({ theme }) => theme.colors.white} !important;
  }

  button:first-child {
    > div:first-child {
      color: ${({ theme }) => theme.colors.bgPrimaryLight} !important;
      background-color: ${({ theme }) => theme.colors.white} !important;

      div[role='button']:hover {
        background-color: ${({ theme }) =>
          theme.colors.bgPrimaryLight} !important;
        svg {
          fill: ${({ theme }) => theme.colors.white} !important;
        }
      }
      svg {
        fill: ${({ theme }) => theme.colors.bgPrimaryLight} !important;
      }
    }
  }
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
