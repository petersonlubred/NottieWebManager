import { FormGroup, NumberInput, TextInput } from 'carbon-components-react';
import { Field, Form, Formik } from 'formik';
import { isEmpty } from 'lodash';
import React, { useMemo } from 'react';
import styled from 'styled-components';

import Button from '@/components/shared/Button';
import Checkbox from '@/components/shared/Checkbox/Checkbox';
import Empty from '@/components/shared/Empty';
import Icon from '@/components/shared/Icons';
import Loader from '@/components/shared/Loader';
import RadioButton from '@/components/shared/RadioButton';
import { useToast } from '@/context/ToastContext';
import { ConfigurationContainer, NoDataContainer, NoDataTitle } from '@/pages/configuration';
import { useGetSystemConfigsMenuQuery, useGetSystemConfigsQuery, useUpdateConfigMutation } from '@/redux/api';
import { px } from '@/utils';

import SystemSettingSideBar from './SystemSettingsSidebar.tsx';

const SystemSettings = () => {
  const { data, isFetching } = useGetSystemConfigsQuery();
  const [menuCode, setMenuCode] = React.useState<string>('');
  const { data: configMenu, isFetching: isLoadingMenu } = useGetSystemConfigsMenuQuery({ id: menuCode }, { skip: !menuCode });
  const [saveChanges, { isLoading }] = useUpdateConfigMutation();
  const { toast } = useToast();

  const initialValues = useMemo(
    () =>
      configMenu?.data.reduce((acc: { [key: string]: string | boolean }, obj) => {
        obj.fieldType === 'CHECKBOX' ? (acc[obj.configId] = obj.configValue === 'YES') : (acc[obj.configId] = obj.configValue);
        return acc;
      }, {}) || {},
    [configMenu]
  );

  const handleSubmit = async (values: typeof initialValues) => {
    const newValues = Object.keys(values).reduce((acc: { [key: string]: string | boolean }, key) => {
      if (typeof values[key] === 'boolean') {
        acc[key] = values[key] ? 'true' : 'false';
      } else {
        acc[key] = values[key];
      }
      return acc;
    }, {});
    const updatedValues = configMenu?.data.reduce(
      (
        acc: {
          configId: string;
          configValue: string | boolean;
          isCheckbox: boolean;
        }[],
        item
      ) => {
        if (item.configId in newValues) {
          const { configId, fieldType } = item;
          const isCheckbox = fieldType === 'CHECKBOX';
          acc.push({ configId, configValue: newValues[configId], isCheckbox });
        }
        return acc;
      },
      []
    );
    try {
      await saveChanges(updatedValues);
      toast('success', 'Data  saved successfully');
    } catch (error: any) {
      toast('error', error?.data?.message || error?.data?.title || 'Something went wrong');
    }
  };

  return (
    <ConfigurationContainer>
      <SystemSettingSideBar data={data?.data} setMenuCode={setMenuCode} menuCode={menuCode} />
      <Container>
        {isEmpty(configMenu?.data) ? (
          <NoDataContainer>
            <Icon id="empty-drawer-icon" width={43} height={51} />
            <NoDataTitle>Select a system configuration from the left panel.</NoDataTitle>
          </NoDataContainer>
        ) : (
          <Formik initialValues={initialValues} validationSchema={''} onSubmit={handleSubmit} enableReinitialize>
            {({ setFieldValue, handleSubmit, values }) => (
              <>
                <MailNav>
                  <ActionContainer>
                    <Button renderIcon={null} handleClick={handleSubmit} buttonLabel="Save changes" />
                  </ActionContainer>
                </MailNav>
                <ModalItem>
                  <Form>
                    <FormGroup legendText="">
                      <FormField>
                        <FormContainer>
                          {configMenu?.data?.map((item, index: number) => (
                            <React.Fragment key={index}>
                              {item?.fieldType === 'CHECKBOX' ? (
                                <ModalItem>
                                  <ModalLabel>{item?.fieldLable}</ModalLabel>
                                  <Checkbox label={'Yes'} name={item?.configId} />
                                </ModalItem>
                              ) : item?.fieldType === 'NUMBER' ? (
                                <Field name={item?.configId}>
                                  {({ field }: any) => (
                                    <NumberInput
                                      {...field}
                                      id={item?.configId}
                                      label={item?.fieldLable}
                                      max={10000}
                                      min={0}
                                      step={10}
                                      className="number-input"
                                      placeholder="0"
                                      onChange={(event: React.ChangeEvent<HTMLInputElement>, { value }: any) => {
                                        setFieldValue(item?.configId, value);
                                      }}
                                    />
                                  )}
                                </Field>
                              ) : item?.fieldType === 'TEXT' ? (
                                <Field name={item?.configId}>
                                  {({ field }: any) => (
                                    <TextInput {...field} type="text" id={`${item?.configId}-input`} labelText={item?.fieldLable} value={values[item?.configId] || ''} />
                                  )}
                                </Field>
                              ) : (
                                item?.fieldType === 'RADIO' && (
                                  <ModalItem>
                                    <ModalLabel>{item?.fieldLable} </ModalLabel>
                                    <RadioButton name={item?.configId} items={[]} />
                                  </ModalItem>
                                )
                              )}
                            </React.Fragment>
                          ))}
                        </FormContainer>
                      </FormField>

                      {/* <Field name="template">
                    {({ field }: any) => (
                      <Select id="select-1" labelText="Template" {...field} onKeyUp={() => setFieldTouched('template', true)}>
                        <SelectItem value="" text="Choose option" />
                        <SelectItem value="" text="Option 1" value="option-1" />
                        <SelectItem value="" text="Option 2" value="option-2" />
                      </Select>
                    )}
                  </Field> */}
                      {/* <FormField>
                      <FormContainer>
                        <Field name="password">
                          {({ field }: any) => <PasswordInput {...field} type="password" id="password-input" labelText="Password" placeholder="Password" />}
                        </Field>
                      </FormContainer>
                    </FormField> */}
                    </FormGroup>
                  </Form>
                </ModalItem>
              </>
            )}
          </Formik>
        )}
      </Container>
      {isFetching || isLoadingMenu || isLoading ? <Loader /> : isEmpty(data) && <Empty title={'No system configuration found'} />}
    </ConfigurationContainer>
  );
};

export default SystemSettings;

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
  margin-bottom: ${px(9)};
  margin-top: ${px(16)};
`;

const FormField = styled.div`
  margin-bottom: ${px(16)};
`;

export const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: ${px(16)} ${px(40)};
  margin-bottom: ${px(16)};
  place-items: start;
  > div {
    width: 100%;
  }
  label {
    color: ${({ theme }) => theme.colors.lightText};
  }
  input {
    height: ${px(48)};
    width: 100%;
    border: none;
    background-color: ${({ theme }) => theme.colors.bgPrimaryLight};
    color: ${({ theme }) => theme.colors.white};
    ::placeholder {
      color: ${({ theme }) => theme.colors.darkPrimary20};
    }
    &:hover {
      background-color: ${({ theme }) => theme.colors.bgPrimaryLight};
    }
    &:focus {
      color: ${({ theme }) => theme.colors.white};
    }

    & + svg {
      fill: ${({ theme }) => theme.colors.white};
    }
  }
  svg {
    fill: ${({ theme }) => theme.colors.white} !important;
  }
`;
