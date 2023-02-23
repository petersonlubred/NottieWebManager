import { px } from '@/utils';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import RadioList from '../shared/Radio/RadioList';
import { Checkbox, TextInput, MultiSelect, FormGroup } from '@carbon/react';
import { Formik, Form, Field } from 'formik';
import { userAccountSchema } from '@/schemas';
import Button from '../shared/Button';
import ErrorMessage from '../shared/ErrorMessage/ErrorMessage';
import { FormContainer } from '../onboard/NewUserLoginForm';
import { FormikRefType } from '@/interfaces/formik.type';
import { IinitialUserForm } from '@/interfaces/schema';
import { useCreateUserMutation, useEditUserMutation } from '@/redux/services';
import { useToast } from '@/context/ToastContext';
import Loader from '../shared/Loader';
import { initialUserValue } from '@/interfaces/dtos';

interface Iprops {
  formRef: React.RefObject<FormikRefType<IinitialUserForm>>;
  formdata?: IinitialUserForm & { id: string };
  toggleModal: () => void;
}

const ModalContent = ({ formRef, formdata, toggleModal }: Iprops) => {
  const [createUser, { isLoading, isSuccess, isError, error }] =
    useCreateUserMutation();
  const [
    editUser,
    {
      isLoading: editLoading,
      isSuccess: editSuccess,
      isError: isEditError,
      error: editError,
    },
  ] = useEditUserMutation();
  const { toast } = useToast();

  const handleSubmit = (values: IinitialUserForm) => {
    formdata?.id ? editUser(values) : createUser(values);
  };

  useEffect(() => {
    if (isSuccess) {
      toast('success', 'User Account saved successfully');
      toggleModal();
    }
    if (isError && error && 'status' in error) {
      toast('error', error?.data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isError, isSuccess]);

  useEffect(() => {
    if (editSuccess) {
      toast('success', 'User Account saved successfully');
      toggleModal();
    }
    if (isEditError && editError && 'status' in editError) {
      toast('error', editError?.data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editError, editSuccess, isEditError]);

  return (
    <ModalContentContainer>
      {(isLoading || editLoading) && <Loader />}
      <ModalItem>
        <Formik
          initialValues={{ ...initialUserValue, ...formdata }}
          validationSchema={userAccountSchema}
          onSubmit={handleSubmit}
          innerRef={formRef}
        >
          {({ errors, touched, setFieldTouched, setFieldValue, values }) => (
            <Form>
              <FormGroup legendText="">
                <ModalItem>
                  <ModalLabel>Authentication Type</ModalLabel>
                  <RadioList Radioitems={['Classic', 'AD', 'SSO']} />
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
                      {!formdata?.id && (
                        <Button
                          renderIcon={null}
                          // disabled={
                          //   Boolean(touched.email && errors.email) ||
                          //   !values?.email
                          // }
                          handleClick={() => console.log('click')}
                          buttonLabel="Validate Email"
                          validateButton
                        />
                      )}
                    </FormEmailContainer>
                    <ErrorMessage
                      invalid={Boolean(
                        touched.emailAddress && errors.emailAddress
                      )}
                      invalidText={errors.emailAddress}
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
                </ModalItem>{' '}
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

const ModalItem = styled.div`
  margin-bottom: ${px(16)};
`;

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
