import { px } from '@/utils';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { TextInput, MultiSelect, FormGroup } from '@carbon/react';
import { Formik, Form, Field } from 'formik';
import { userAccountSchema } from '@/schemas/schema';

import { FormikRefType } from '@/interfaces/formik.type';
import {
  useCreateUserMutation,
  useEditUserMutation,
  useGetRolesQuery,
} from '@/redux/api';
import { useToast } from '@/context/ToastContext';
import ErrorMessage from '@/components/shared/ErrorMessage/ErrorMessage';
import Button from '@/components/shared/Button';
import { FormContainer } from '@/components/onboard/NewUserLoginForm';
import Loader from '@/components/shared/Loader';
import { IRoles } from '@/interfaces/role';
import RadioButton from '@/components/shared/RadioButton';
import { initialUserValue } from '@/schemas/dto';
import { IinitialUserForm } from '@/schemas/interface';
import { pickValues } from '@/utils/helpers/helpers';
import Checkbox from '@/components/shared/Checkbox/Checkbox';

interface Iprops {
  formRef: React.RefObject<FormikRefType<IinitialUserForm>>;
  formdata?: IinitialUserForm & { id: string };
  toggleModal: () => void;
  isUpdatedMultiselect: boolean;
  setIsUpdatedMultiselect?: Function;
}

const CreateUserForm = ({
  formRef,
  formdata,
  toggleModal,
  isUpdatedMultiselect,
  setIsUpdatedMultiselect,
}: Iprops) => {
  const { data, isLoading: rolesLoading } = useGetRolesQuery();

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
    console.log(values);
    formdata?.id
      ? editUser(pickValues(values))
      : createUser(pickValues(values));
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

  useEffect(() => {
    setIsUpdatedMultiselect && setIsUpdatedMultiselect(true);
  }, [data, setIsUpdatedMultiselect]);

  return (
    <ModalContentContainer>
      {(isLoading || editLoading || rolesLoading) && <Loader />}
      <ModalItem>
        <Formik
          initialValues={{ ...initialUserValue, ...formdata }}
          validationSchema={userAccountSchema}
          onSubmit={handleSubmit}
          innerRef={formRef}
        >
          {({ errors, touched, setFieldTouched, setFieldValue }) => (
            <Form>
              <FormGroup legendText="">
                <ModalItem>
                  <ModalLabel>Authentication Type</ModalLabel>
                  <RadioButton
                    items={[
                      { value: 'Classic', label: 'Classic' },
                      { value: 'AD', label: 'AD' },
                      { value: 'SSO', label: 'SSO' },
                    ]}
                  />
                  <ErrorMessage
                    invalid={Boolean(
                      touched.authenticationType && errors.authenticationType
                    )}
                    invalidText={errors.authenticationType}
                  />
                </ModalItem>
                {formdata?.id && (
                  <ModalItem>
                    <ModalLabel>Enable Access</ModalLabel>{' '}
                    <Checkbox label="Yes" name="status" />
                  </ModalItem>
                )}{' '}
                <ModalItem>
                  <ModalLabel>Role</ModalLabel>{' '}
                  <MultipleSelect
                    itemToString={(item: any) => (item ? item.text : '')}
                    id="roleIds"
                    items={
                      data?.data
                        ? data?.data?.map((item: IRoles) => ({
                            id: item.roleId,
                            text: item.roleName,
                          }))
                        : []
                    }
                    label="Choose roles"
                    size="md"
                    onChange={(e?: any) => {
                      setFieldValue(
                        'roleIds',
                        e.selectedItems?.map(
                          (item?: { id: string; text?: string }) => item?.id
                        )
                      );
                    }}
                    key={isUpdatedMultiselect?.toString()}
                    initialSelectedItems={
                      formdata?.roleIds
                        ? data?.data
                            ?.filter((item: IRoles) =>
                              formdata?.roleIds?.includes(item.roleId)
                            )
                            .map((item: IRoles) => ({
                              id: item.roleId,
                              text: item.roleName,
                            }))
                        : []
                    }
                  />
                  <ErrorMessage
                    invalid={Boolean(touched.roleIds && errors.roleIds)}
                    invalidText={errors?.roleIds}
                  />
                </ModalItem>
                <ModalItem>
                  <ModalLabel>Email Address</ModalLabel>{' '}
                  <FormField>
                    <FormEmailContainer>
                      <Field name="emailAddress">
                        {({ field }: any) => (
                          <TextInput
                            {...field}
                            type="text"
                            id="server-input"
                            labelText=""
                            placeholder="input text"
                            onKeyUp={() =>
                              setFieldTouched('emailAddress', true)
                            }
                          />
                        )}
                      </Field>
                      {formdata?.id && (
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
                  {formdata?.id && (
                    <FormContainer>
                      <Field name="firstName">
                        {({ field }: any) => (
                          <TextInput
                            {...field}
                            type="text"
                            id="firstName-input"
                            labelText="First Name"
                            placeholder="input text"
                          />
                        )}
                      </Field>
                      <Field name="lastName">
                        {({ field }: any) => (
                          <TextInput
                            {...field}
                            type="text"
                            id="lastName-input"
                            labelText="Last Name"
                            placeholder="input text"
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        invalid={Boolean(touched.firstName && errors.firstName)}
                        invalidText={errors.firstName}
                      />{' '}
                      <ErrorMessage
                        invalid={Boolean(touched.lastName && errors.lastName)}
                        invalidText={errors.lastName}
                      />
                    </FormContainer>
                  )}
                </ModalItem>{' '}
              </FormGroup>
            </Form>
          )}
        </Formik>
      </ModalItem>
    </ModalContentContainer>
  );
};

export default CreateUserForm;

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