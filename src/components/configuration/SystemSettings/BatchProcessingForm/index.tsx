import React from 'react';
import styled from 'styled-components';
import { FormGroup, NumberInput } from '@carbon/react';
import { Formik, Form, Field } from 'formik';
import { px } from '@/utils';
import { initialBatchProcessingValue } from '@/schemas/schema';
import { BatchProcessingSchema } from '@/schemas/schema';
import Button from '@/components/shared/Button';
import ErrorMessage from '@/components/shared/ErrorMessage/ErrorMessage';

const BatchProcessingForm = () => {
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
        initialValues={initialBatchProcessingValue}
        validationSchema={BatchProcessingSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
        }}
      >
        {({ errors, touched, setFieldTouched }) => (
          <Form>
            <FormGroup>
              {/* <FormContainer> */}
              <FormFieldContainer>
                <FormFieldCover>
                  <Field name="transactionProcessBatch">
                    {({ field }: any) => (
                      <NumberInput
                        {...field}
                        id="transactionProcessBatch"
                        label="Transaction process batch"
                        className="number-input"
                        max={10000}
                        min={0}
                        step={10}
                        value={0}
                        placeholder="0"
                        onKeyUp={() => {}}
                      />
                    )}
                  </Field>
                </FormFieldCover>

                <FormFieldCover>
                  <Field name="transactionCrawlerProcessBatch">
                    {({ field }: any) => (
                      <NumberInput
                        {...field}
                        id="transactionCrawlerProcessBatch"
                        label="Transaction crawler process batch"
                        max={10000}
                        className="number-input"
                        min={0}
                        step={10}
                        value={0}
                        placeholder="0"
                        onKeyUp={() => {}}
                      />
                    )}
                  </Field>
                </FormFieldCover>
              </FormFieldContainer>
              <FormFieldContainer>
                <FormFieldCover>
                  <Field name="nonTransactionProcessingBatch">
                    {({ field }: any) => (
                      <NumberInput
                        {...field}
                        id="nonTransactionProcessingBatch"
                        label="Non transaction process batch"
                        max={10000}
                        className="number-input"
                        min={0}
                        step={10}
                        value={0}
                        placeholder="0"
                        onKeyUp={() => {}}
                      />
                    )}
                  </Field>
                </FormFieldCover>
                <FormFieldCover>
                  <Field name="nonTransactionCrawlerProcessBatch">
                    {({ field }: any) => (
                      <NumberInput
                        {...field}
                        id="nonTransactionCrawlerProcessBatch"
                        label="Non transaction crawler process batch"
                        max={10000}
                        min={0}
                        className="number-input"
                        step={10}
                        value={0}
                        placeholder="0"
                        onKeyUp={() => {}}
                      />
                    )}
                  </Field>
                </FormFieldCover>
              </FormFieldContainer>
              <FormFieldContainer>
                <FormFieldCover>
                  <Field name="otpProcessBatch">
                    {({ field }: any) => (
                      <NumberInput
                        {...field}
                        id="otpProcessBatch"
                        label="OTP process batch"
                        max={10000}
                        className="number-input"
                        min={0}
                        step={10}
                        value={0}
                        placeholder="0"
                        onKeyUp={() => {}}
                      />
                    )}
                  </Field>
                </FormFieldCover>

                <FormFieldCover>
                  <Field name="otpCrawlerProcessBatch">
                    {({ field }: any) => (
                      <NumberInput
                        {...field}
                        id="otpCrawlerProcessBatch"
                        label="OTP crawler process batch"
                        max={10000}
                        className="number-input"
                        min={0}
                        step={10}
                        value={0}
                        placeholder="0"
                        onKeyUp={() => {}}
                      />
                    )}
                  </Field>
                </FormFieldCover>
              </FormFieldContainer>
              <LastFieldCover>
                <LastFieldCova>
                  <Field name="archiverBatch">
                    {({ field }: any) => (
                      <NumberInput
                        {...field}
                        id="archiverBatch"
                        label="Archiver batch"
                        max={10000}
                        className="number-input"
                        min={0}
                        step={10}
                        value={0}
                        placeholder="0"
                        onKeyUp={() => {}}
                      />
                    )}
                  </Field>
                </LastFieldCova>
              </LastFieldCover>
              {/* </FormContainer> */}
            </FormGroup>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default BatchProcessingForm;

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

const FormFieldContainer = styled.div`
  display: flex;
  gap: ${px(10)};
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const FormFieldCover = styled.div`
  width: 45%;
  margin-bottom: 1rem;
`;


const LastFieldCover = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${px(10)};
  width: 100%;
  `;

  const LastFieldCova = styled.div`
    width: 45%;
    align-self: flex-start;
    margin-left: 2.1rem;
  `;