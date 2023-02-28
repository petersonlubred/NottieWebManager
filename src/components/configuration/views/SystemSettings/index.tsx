import { Checkbox, FormGroup, NumberInput, PasswordInput, RadioButton, RadioButtonGroup, Select, SelectItem, TextInput } from '@carbon/react';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import styled from 'styled-components';

import { FormContainer } from '@/components/onboard/NewUserLoginForm';
import Button from '@/components/shared/Button';
import { ConfigurationContainer } from '@/pages/configuration';
import { px } from '@/utils';

import SystemSettingSideBar from './SystemSettingsSidebar.tsx';

const SystemSettings = () => {
  return (
    <ConfigurationContainer>
      <SystemSettingSideBar />
      <Container>
        <MailNav>
          <ActionContainer>
            <Button renderIcon={null} handleClick={() => null} buttonLabel="Save changes" disabled={true} />
          </ActionContainer>
        </MailNav>{' '}
        <ModalItem>
          <Formik
            initialValues={{}}
            validationSchema={{}}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
            }}
          >
            {({ setFieldTouched }) => (
              <Form>
                <FormGroup legendText="">
                  <FormField>
                    <FormContainer>
                      <Field name="name">
                        {({ field }: any) => (
                          <TextInput {...field} type="text" id="name-input" labelText="Profile Name" placeholder="enter name" onKeyUp={() => setFieldTouched('name', true)} />
                        )}
                      </Field>
                      <Field name="template">
                        {({ field }: any) => (
                          <Select id="select-1" labelText="Template" {...field} onKeyUp={() => setFieldTouched('template', true)}>
                            <SelectItem text="Choose option" />
                            <SelectItem text="Option 1" value="option-1" />
                            <SelectItem text="Option 2" value="option-2" />
                          </Select>
                        )}
                      </Field>
                    </FormContainer>
                  </FormField>
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
                      <ModalItem>
                        <ModalLabel>Radio Button</ModalLabel>{' '}
                        <RadioButtonGroup>
                          <RadioButton labelText="Radio button label" value="radio-3" id="radio-3" disabled />
                        </RadioButtonGroup>
                      </ModalItem>
                      <ModalItem>
                        <ModalLabel>Hide Balance?</ModalLabel> <Checkbox id="checked" labelText="Yes" />
                      </ModalItem>
                    </FormContainer>
                  </FormField>
                  <FormField>
                    <FormContainer>
                      <Field name="password">
                        {({ field }: any) => <PasswordInput {...field} type="password" id="password-input" labelText="Password" placeholder="Password" />}
                      </Field>
                    </FormContainer>
                  </FormField>
                </FormGroup>
              </Form>
            )}
          </Formik>
        </ModalItem>
      </Container>
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
