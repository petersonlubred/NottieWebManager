import React from 'react';
import styled from 'styled-components';
import { FormGroup, TextInput, PasswordInput } from '@carbon/react';
import { Formik, Form, Field } from 'formik';
import Button from '@/components/shared/Button';
import { AdDetailsSchema } from '@/schemas';
import { initialAdDetials } from '@/interfaces/dtos';
import { px } from '@/utils';

type IProps = {
  isSSO: boolean;
};

const DetailsForm = ({ isSSO }: IProps) => {
  return (
    <Container>
      <MailNav>
        <ActionContainer>
          <Button
            renderIcon={null}
            handleClick={() => console.log('123')}
            buttonLabel="Save changes"
            disabled={true}
          />
        </ActionContainer>
      </MailNav>{' '}
      <Formik
        initialValues={initialAdDetials}
        validationSchema={AdDetailsSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
        }}
      >
        {({ errors, touched, setFieldTouched }) => (
          <Form>
            <FormGroup>
              <FormContainer>
                <FormFieldCover>
                  <InputCover>
                    <Field name="username">
                      {({ field }: any) => (
                        <TextInput
                          {...field}
                          type="text"
                          id="username"
                          labelText="User name"
                          placeholder="0"
                          onKeyUp={() => {}}
                        />
                      )}
                    </Field>
                  </InputCover>
                  <InputCover>
                    <Field name="password">
                      {({ field }: any) => (
                        <PasswordInput
                          {...field}
                          type="password"
                          id="password-input"
                          labelText="Password"
                          placeholder="Password"
                          onKeyUp={() => {}}
                          invalid={Boolean(touched.password && errors.password)}
                          invalidText={errors.password}
                        />
                      )}
                    </Field>
                  </InputCover>
                </FormFieldCover>
                {!isSSO && (
                  <LastInputCover>
                    <InputCover>
                      <Field name="adServer">
                        {({ field }: any) => (
                          <TextInput
                            {...field}
                            type="text"
                            id="adServer"
                            labelText="AD server"
                            placeholder="0"
                            onKeyUp={() => {}}
                          />
                        )}
                      </Field>
                    </InputCover>
                  </LastInputCover>
                )}
              </FormContainer>
            </FormGroup>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default DetailsForm;

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

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;
`;

const FormFieldCover = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
`;
const LastInputCover = styled.div`
  position: relative;
  margin-left: 2.1rem;
  width: 100%;
`;

const InputCover = styled.div`
  width: 45%;
`;
