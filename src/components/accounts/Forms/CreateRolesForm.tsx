import React, { useEffect } from 'react';
import { TextInput, FormGroup } from '@carbon/react';
import { Formik, Form, Field } from 'formik';
import styled from 'styled-components';
import { px } from '@/utils';
import { FormikRefType } from '@/interfaces/formik.type';
import { useCreateRoleMutation, useEditRoleMutation } from '@/redux/api';
import { useToast } from '@/context/ToastContext';
import { RoleAndProvilegesSchema } from '@/schemas/schema';
import ErrorMessage from '../../shared/ErrorMessage/ErrorMessage';
import { FormEmailContainer } from '../../profile/SubscriptionContent';
import Loader from '../../shared/Loader';
import { IPrivileges } from '@/interfaces/role';
import { initialRoleValue } from '@/schemas/dto';
import { IinitialRoleForm } from '@/schemas/interface';
import Checkbox from '@/components/shared/Checkbox/Checkbox';

type IProps = {
  formRef: React.RefObject<FormikRefType<IinitialRoleForm>>;
  formdata?: IinitialRoleForm & { roleId: string };
  toggleModal: () => void;
  data?: IPrivileges[];
  loadPrivileges?: boolean;
};

const RolesAndProvileges = ({
  formRef,
  formdata,
  toggleModal,
  data,
  loadPrivileges,
}: IProps) => {
  const [createRole, { isLoading, isSuccess, isError, error }] =
    useCreateRoleMutation();
  const [
    editRole,
    {
      isLoading: editLoading,
      isSuccess: editSuccess,
      isError: isEditError,
      error: editError,
    },
  ] = useEditRoleMutation();
  const { toast } = useToast();

  const priviledges =
    data?.map((item: IPrivileges) => item.systemPrivilegeId) || [];

  const flattenedPrivileges = data?.reduce((acc: any, obj) => {
    const { systemPrivilegeId, access }: any = obj;
    const keys = Object.keys(access).filter((key) => access[key]);
    if (keys.length > 0) {
      acc[systemPrivilegeId] = keys;
    }
    return acc;
  }, {});

  const handleSubmit = (values: any) => {
    const Privileges = [];
    for (const systemPrivilegeId of priviledges) {
      const privileges = values[systemPrivilegeId];
      if (privileges) {
        const access = {
          canRead: privileges.includes('canRead'),
          canWrite: privileges.includes('canWrite'),
          canDelete: privileges.includes('canDelete'),
        };
        Privileges.push({
          systemPrivilegeId,
          access,
        });
      }
    }
    if (formdata?.roleId) {
      editRole({
        roleId: values?.roleId,
        roleName: values?.roleName,
        description: values?.description,
        rolePrivileges: Privileges,
      });
    } else {
      createRole(values);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast('success', 'Role saved successfully');
      toggleModal();
    }
    if (isError && error && 'status' in error) {
      toast('error', error?.data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isError, isSuccess]);

  useEffect(() => {
    if (editSuccess) {
      toast('success', 'Role saved successfully');
      toggleModal();
    }
    if (isEditError && editError && 'status' in editError) {
      toast('error', editError?.data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editError, editSuccess, isEditError]);

  return (
    <ModalContainer>
      {(isLoading || editLoading || loadPrivileges) && <Loader />}
      <Formik
        initialValues={{
          ...initialRoleValue,
          ...formdata,
          ...flattenedPrivileges,
        }}
        validationSchema={RoleAndProvilegesSchema}
        onSubmit={handleSubmit}
        innerRef={formRef}
        enableReinitialize
      >
        {({ errors, touched, handleChange }) => (
          <Form>
            <FormGroup legendText="">
              <FormField>
                <FormEmailContainer>
                  <Field name="roleName">
                    {({ field }: any) => (
                      <Text
                        {...field}
                        type="text"
                        id="role-name"
                        labelText="User Role"
                        placeholder="input text"
                        onChange={handleChange}
                      />
                    )}
                  </Field>
                </FormEmailContainer>
                <ErrorMessage
                  invalid={Boolean(touched.roleName && errors.roleName)}
                  invalidText={errors.roleName}
                />
              </FormField>{' '}
              <FormField>
                <FormEmailContainer>
                  <Field name="description">
                    {({ field }: any) => (
                      <Text
                        {...field}
                        type="text"
                        id="role-description"
                        labelText="Role Description"
                        placeholder="input text"
                        onChange={handleChange}
                      />
                    )}
                  </Field>
                </FormEmailContainer>
                <ErrorMessage
                  invalid={Boolean(touched.description && errors.description)}
                  invalidText={errors.description}
                />
              </FormField>
              {formdata?.roleId && (
                <CheckBoxContainer>
                  <Label>Privilages</Label>
                  <CheckBoxContent>
                    {data?.map((item: IPrivileges, index) => (
                      <Wrapper key={index}>
                        <CheckBoxHeader>{item?.privilegeName}</CheckBoxHeader>
                        <CheckBoxWrapper
                          role="group"
                          aria-labelledby="checkbox-group"
                        >
                          {Object.entries(item.access)
                            .map(([name, value]) => ({
                              name,
                              value,
                              label: name
                                .replace(/([A-Z])/g, ' $1')
                                .replace(/^./, (s) => s.toUpperCase()),
                            }))
                            .map((checkbox, ind2) => (
                              <Checkbox
                                name={item?.systemPrivilegeId}
                                key={index + ind2}
                                label={checkbox.label}
                                value={checkbox.name}
                              />
                            ))}
                        </CheckBoxWrapper>
                      </Wrapper>
                    ))}
                  </CheckBoxContent>
                </CheckBoxContainer>
              )}
            </FormGroup>
          </Form>
        )}
      </Formik>
    </ModalContainer>
  );
};

export default RolesAndProvileges;

const ModalContainer = styled.div`
  width: 100%;
  padding: 1rem;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Text = styled(TextInput)`
  label {
    color: ${({ theme }) => theme.colors.lightText};
  }
`;

const CheckBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.p`
  font-family: ${({ theme }) => theme.fontFamilies.heading};
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;

  margin-bottom: 4px;
  color: ${({ theme }) => theme.colors.lightText};
`;

const CheckBoxContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 290px;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.bgPrimaryLight};
  box-shadow: inset 0px 0px 0px 1px ${({ theme }) => theme.colors.bgHover};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
`;

const CheckBoxHeader = styled.legend`
  font-family: ${({ theme }) => theme.fontFamilies.heading};
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 20px;
  letter-spacing: 0.16px;
  margin-bottom: ${px(20)};
  color: ${({ theme }) => theme.colors.white};
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${px(33)};

  & > div:first-of-type {
    margin-top: 0 !important;
  }
`;

const FormField = styled.div`
  margin-bottom: ${px(16)};
`;