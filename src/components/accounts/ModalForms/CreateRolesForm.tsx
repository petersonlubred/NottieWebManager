import { FormGroup, TextInput } from '@carbon/react';
import { Field, FieldInputProps, Form, Formik } from 'formik';
import React, { useState } from 'react';
import styled from 'styled-components';

import Checkbox from '@/components/shared/Checkbox/Checkbox';
import { useToast } from '@/context/ToastContext';
import { FormikRefType } from '@/interfaces/formik.type';
import { IPrivilege } from '@/interfaces/role';
import { useCreateRoleMutation, useEditRoleMutation } from '@/redux/api';
import { initialRoleValue } from '@/schemas/dto';
import { IinitialRoleForm } from '@/schemas/interface';
import { RoleAndProvilegesSchema } from '@/schemas/schema';
import { px } from '@/utils';
import { pickValues } from '@/utils/helpers/helpers';

import { FormEmailContainer } from '../../profile/SubscriptionContent';
import ErrorMessage from '../../shared/ErrorMessage/ErrorMessage';
import Loader from '../../shared/Loader';

type IProps = {
  formRef: React.RefObject<FormikRefType<IinitialRoleForm>>;
  formdata?: IinitialRoleForm & { roleId: string };
  toggleModal: () => void;
  data?: IPrivilege[];
  loadPrivileges?: boolean;
};
interface FlattenedPrivileges {
  [systemPrivilegeId: string]: string[];
}
interface Access {
  canRead: boolean;
  canWrite: boolean;
  canDelete: boolean;
}
const RolesAndProvileges = ({ formRef, formdata, toggleModal, data, loadPrivileges }: IProps) => {
  const [loading, setLoading] = useState(false);
  const [createRole] = useCreateRoleMutation();
  const [editRole] = useEditRoleMutation();
  const { toast } = useToast();
  const priviledges = data?.map((item: IPrivilege) => item.systemPrivilegeId) || [];

  const flattenedPrivileges = data?.reduce((acc: FlattenedPrivileges, obj) => {
    const { systemPrivilegeId, access } = obj;
    const keys = Object.keys(access).filter((key) => access[key as keyof Access]);
    if (keys.length > 0) {
      acc[systemPrivilegeId] = keys;
    }
    return acc;
  }, {});

  const handleSubmit = async (values: IinitialRoleForm) => {
    const formvalues = values as IinitialRoleForm & { roleId: string };
    const Privileges: Partial<IPrivilege>[] = [];
    for (const systemPrivilegeId of priviledges) {
      const privileges = values[systemPrivilegeId as keyof IinitialRoleForm];
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
    try {
      setLoading(true);
      if (formdata?.roleId) {
        await editRole(
          pickValues({
            roleId: formvalues?.roleId,
            roleName: formvalues?.roleName,
            description: formvalues?.description,
            rolePrivileges: Privileges,
          })
        ).unwrap();
      } else {
        await createRole(pickValues(formvalues)).unwrap();
      }
      toast('success', 'Role  saved successfully');
      toggleModal();
      setLoading(false);
    } catch (error: any) {
      toast('error', error?.data?.message || error?.data?.title || 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <ModalContainer>
      {(loading || loadPrivileges) && <Loader />}
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
                    {({ field }: { field: FieldInputProps<string> }) => (
                      <Text {...field} type="text" id="role-name" labelText="User Role" placeholder="input text" onChange={handleChange} />
                    )}
                  </Field>
                </FormEmailContainer>
                <ErrorMessage invalid={Boolean(touched.roleName && errors.roleName)} invalidText={errors.roleName} />
              </FormField>{' '}
              <FormField>
                <FormEmailContainer>
                  <Field name="description">
                    {({ field }: { field: FieldInputProps<string> }) => (
                      <Text {...field} type="text" id="role-description" labelText="Role Description" placeholder="input text" onChange={handleChange} />
                    )}
                  </Field>
                </FormEmailContainer>
                <ErrorMessage invalid={Boolean(touched.description && errors.description)} invalidText={errors.description} />
              </FormField>
              {formdata?.roleId && (
                <CheckBoxContainer>
                  <Label>Privilages</Label>
                  <CheckBoxContent>
                    {data?.map((item: IPrivilege, index) => (
                      <Wrapper key={index}>
                        <CheckBoxHeader>{item?.privilegeName}</CheckBoxHeader>
                        <CheckBoxWrapper role="group" aria-labelledby="checkbox-group">
                          {Object.entries(item.access)
                            .map(([name, value]) => ({
                              name,
                              value,
                              label: name.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase()),
                            }))
                            .map((checkbox, ind2) => (
                              <Checkbox name={item?.systemPrivilegeId} key={index + ind2} label={checkbox.label} value={checkbox.name} />
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
  overflow-y: auto;
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
  max-height: 300px;
  overflow-y: auto;
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
