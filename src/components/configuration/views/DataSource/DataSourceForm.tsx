import { FormGroup, NumberInput, PasswordInput, Select, SelectItem, TextInput } from 'carbon-components-react';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import styled from 'styled-components';

import { FormContainer } from '@/components/onboard/NewUserLoginForm';
import Button from '@/components/shared/Button';
import Checkbox from '@/components/shared/Checkbox/Checkbox';
import ErrorMessage from '@/components/shared/ErrorMessage/ErrorMessage';
import { useToast } from '@/context/ToastContext';
import { IDatabaseType, IDataSourceType } from '@/interfaces/configuration';
import { ISetState } from '@/interfaces/formik.type';
import { useCreateDatasourceMutation, useEditDatasourceMutation, useUpdateStatusMutation } from '@/redux/api';
import { initialDataSource } from '@/schemas/dto';
import { DataSourceSchema } from '@/schemas/schema';
import { px } from '@/utils';

type Iprops = {
  databaseType?: IDatabaseType[];
  setLoading: ISetState<boolean>;
  data?: IDataSourceType;
};
const DataSourceForm = ({ databaseType, setLoading, data }: Iprops) => {
  const [create] = useCreateDatasourceMutation();
  const [edit] = useEditDatasourceMutation();
  const [updateStatus] = useUpdateStatusMutation();
  const { toast } = useToast();

  const handleSubmit = async (
    values: any,
    {
      resetForm,
    }: {
      resetForm: () => void;
    }
  ) => {
    try {
      setLoading(true);
      data?.dataSourceId ? await edit(values).unwrap() : (await create(values).unwrap(), resetForm());
      setLoading(false);
      data?.dataSourceId ? toast('success', 'Data Source created successfully') : toast('success', 'Data Source updated successfully');
    } catch (error: any) {
      setLoading(false);
      toast('error', error?.data?.message || 'Something went wrong');
    }
  };
  const handleUpdateStatus = async () => {
    try {
      setLoading(true);
      await updateStatus({ dataSourceId: data?.dataSourceId, status: data?.status ? false : true }).unwrap();
      setLoading(false);
      toast('success', 'Status updated successfully');
    } catch (error: any) {
      setLoading(false);
      toast('error', error?.data?.message || 'Something went wrong');
    }
  };

  return (
    <Container>
      <Formik initialValues={{ ...initialDataSource, ...data }} validationSchema={DataSourceSchema} onSubmit={handleSubmit} enableReinitialize>
        {({ errors, touched, setFieldTouched, handleSubmit, setFieldValue, values }) => (
          <>
            <MailNav>
              <ActionContainer>
                <Button renderIcon={null} handleClick={handleUpdateStatus} buttonLabel={data?.status ? 'Disable' : 'Enable'} />
              </ActionContainer>
              <ActionContainer>
                <Button renderIcon={null} handleClick={handleSubmit} buttonLabel={data?.dataSourceId ? 'Edit source' : 'Create source'} />
              </ActionContainer>
            </MailNav>{' '}
            <Form>
              <FormGroup legendText="">
                <FormField>
                  <FormContainer>
                    <Field name="databaseName">
                      {({ field }: any) => (
                        <TextInput
                          {...field}
                          type="text"
                          id="databaseName-input"
                          labelText="Data source name"
                          placeholder="enter name"
                          onKeyUp={() => setFieldTouched('databaseName', true)}
                          value={values?.databaseName ?? ''}
                        />
                      )}
                    </Field>{' '}
                    <Field name="databaseType">
                      {({ field }: any) => (
                        <Select id="select-1" labelText="Database Type" {...field} onKeyUp={() => setFieldTouched('databaseType', true)}>
                          <SelectItem value="" text="Choose option" />
                          {databaseType?.map((item: IDatabaseType) => (
                            <SelectItem key={item?.id} text={item?.name} value={item?.name} />
                          ))}
                        </Select>
                      )}
                    </Field>
                    <ErrorMessage invalid={Boolean(touched.databaseName && errors.databaseName)} invalidText={errors.databaseName} />
                    <ErrorMessage invalid={Boolean(touched.databaseType && errors.databaseType)} invalidText={errors.databaseType} />
                  </FormContainer>
                </FormField>
                <FormField>
                  <FormContainer>
                    <Field name="server">
                      {({ field }: any) => (
                        <TextInput
                          {...field}
                          type="text"
                          id="server-input"
                          labelText="Server/IP"
                          placeholder="input text"
                          onKeyUp={() => setFieldTouched('server', true)}
                          value={values?.server ?? ''}
                        />
                      )}
                    </Field>{' '}
                    <Field name="port">
                      {({ field }: any) => (
                        <NumberInput
                          {...field}
                          id="port-input"
                          label="Port"
                          max={10000}
                          min={0}
                          step={10}
                          className="number-input"
                          placeholder="0"
                          onKeyUp={() => setFieldTouched('port', true)}
                          onChange={(event: React.ChangeEvent<HTMLInputElement>, { value }: any) => {
                            setFieldValue('port', value);
                          }}
                        />
                      )}
                    </Field>
                    <ErrorMessage invalid={Boolean(touched.server && errors.server)} invalidText={errors.server} />
                    <ErrorMessage invalid={Boolean(touched.port && errors.port)} invalidText={errors.port} />
                  </FormContainer>
                </FormField>
                <FormField>
                  <FormContainer>
                    <Field name="maxPoolSize">
                      {({ field }: any) => (
                        <NumberInput
                          {...field}
                          id="maxPoolSize"
                          label="Max pool size"
                          max={10000}
                          min={0}
                          step={10}
                          className="number-input"
                          placeholder="0"
                          onKeyUp={() => setFieldTouched('maxPoolSize', true)}
                          onChange={(event: React.ChangeEvent<HTMLInputElement>, { value }: any) => {
                            setFieldValue('maxPoolSize', value);
                          }}
                        />
                      )}
                    </Field>{' '}
                    <Field name="connectionTimeout">
                      {({ field }: any) => (
                        <NumberInput
                          {...field}
                          id="connectionTimeout"
                          label="Connection timeout"
                          max={10000}
                          min={0}
                          step={10}
                          className="number-input"
                          placeholder="0"
                          onChange={(event: React.ChangeEvent<HTMLInputElement>, { value }: any) => {
                            setFieldValue('connectionTimeout', value);
                          }}
                          onKeyUp={() => setFieldTouched('connectionTimeout', true)}
                        />
                      )}
                    </Field>{' '}
                    <ErrorMessage invalid={Boolean(touched.maxPoolSize && errors.maxPoolSize)} invalidText={errors.maxPoolSize} />
                    <ErrorMessage invalid={Boolean(touched.connectionTimeout && errors.connectionTimeout)} invalidText={errors.connectionTimeout} />
                  </FormContainer>
                </FormField>
                <FormField>
                  <FormContainer>
                    <Field name="commandTimeout">
                      {({ field }: any) => (
                        <NumberInput
                          {...field}
                          id="commandTimeout"
                          label="Connection timeout"
                          max={10000}
                          min={0}
                          step={10}
                          className="number-input"
                          onChange={(event: React.ChangeEvent<HTMLInputElement>, { value }: any) => {
                            setFieldValue('commandTimeout', value);
                          }}
                          placeholder="0"
                          onKeyUp={() => setFieldTouched('commandTimeout', true)}
                        />
                      )}
                    </Field>{' '}
                    <Field name="description">
                      {({ field }: any) => (
                        <TextInput
                          {...field}
                          type="text"
                          id="description-input"
                          labelText="Description"
                          placeholder="enter name"
                          onKeyUp={() => setFieldTouched('description', true)}
                          value={values?.description ?? ''}
                        />
                      )}
                    </Field>{' '}
                    <ErrorMessage invalid={Boolean(touched.commandTimeout && errors.commandTimeout)} invalidText={errors.commandTimeout} />
                    <ErrorMessage invalid={Boolean(touched.description && errors.description)} invalidText={errors.description} />
                  </FormContainer>
                </FormField>
                <FormField>
                  <FormContainer>
                    <Field name="userId">
                      {({ field }: any) => (
                        <TextInput
                          {...field}
                          type="text"
                          id="userId-input"
                          labelText="Username"
                          placeholder="enter name"
                          onKeyUp={() => setFieldTouched('userId', true)}
                          invalid={Boolean(touched.userId && errors.userId)}
                          invalidText={errors.userId}
                          value={values?.userId ?? ''}
                        />
                      )}
                    </Field>{' '}
                    <PasswordContainer>
                      <Field name="password">
                        {({ field }: any) => (
                          <PasswordInput
                            {...field}
                            type="password"
                            id="password-input"
                            labelText="Password"
                            placeholder="Password"
                            onKeyUp={() => setFieldTouched('password', true)}
                            invalid={Boolean(touched.password && errors.password)}
                            invalidText={errors.password}
                            value={values?.password ?? ''}
                          />
                        )}
                      </Field>
                    </PasswordContainer>
                  </FormContainer>
                </FormField>
                <ModalItem>
                  <ModalLabel>Status</ModalLabel> <Checkbox name="status" label="Yes" />
                </ModalItem>
              </FormGroup>
            </Form>
          </>
        )}
      </Formik>
    </Container>
  );
};

export default DataSourceForm;

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 300px);
  overflow: auto;

  .color-picker {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, 10%);
    z-index: 1000;
    background-color: ${({ theme }) => theme.colors.bgHover};
    border: 1px solid ${({ theme }) => theme.colors.borderLight};
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }

  form {
    padding: 0 ${px(252)} ${px(16)} ${px(13)};
    svg {
      fill: ${({ theme }) => theme.colors.white} !important ;
    }
  }
`;

const MailNav = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${px(24)};
  justify-content: flex-end;
  gap: ${px(8)};
`;

const ActionContainer = styled.div`
  button {
    padding: ${px(10)} ${px(16)};
  }
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

export const PasswordContainer = styled.div`
  position: relative;
`;
