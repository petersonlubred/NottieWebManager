import { FormGroup, TextArea,TextInput } from '@carbon/react';
import { Copy } from '@carbon/react/icons';
import { Field,Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Button from '@/components/shared/Button';
import ErrorMessage from '@/components/shared/ErrorMessage/ErrorMessage';
import RichTextExample from '@/components/shared/RichText';
import { px } from '@/utils';

const navItems = ['SMS Template', 'Email Template'];

const MailBody = () => {
  const [selected, setSelected] = React.useState(0);
  const [, setEditorLoaded] = useState(false);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);
  return (
    <Container>
      {' '}
      {/* <div>
        <CKeditor
          value={data}
          name="description"
          onChange={(data) => {
            setData(data);
          }}
          editorLoaded={editorLoaded}
        />
        {JSON.stringify(data)}
      </div> */}
      <MailNav>
        <MailNavToggle>
          {navItems?.map((item, index) => (
            <MailNavItem key={index} selected={selected === index} onClick={() => setSelected(index)}>
              {item}
            </MailNavItem>
          ))}
        </MailNavToggle>

        <CopyDetails>
          <CopyParagraphTitle>Template ID: </CopyParagraphTitle>
          <CopyParagraphValue> SDFGHJIOGDUD876</CopyParagraphValue>
          <Copy size={16} />
        </CopyDetails>
        <ActionContainer>
          <Button renderIcon={null} handleClick={() => null} buttonLabel="Discard changes" />
          <Button renderIcon={null} handleClick={() => null} buttonLabel="Save Changes" />
        </ActionContainer>
      </MailNav>
      <Formik
        initialValues={{
          templateBody: '',
          senderId: '',
          emailcontent: '',
          emailcontainer: '',
          templatename: '',
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(!!values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            {selected == 0 ? (
              <FormGroup legendText="">
                <FormField>
                  <FormContainer>
                    <Field name="senderId">{({ field }: any) => <TextInput {...field} type="text" id="senderId-input" labelText="Sender ID" placeholder="input text" />}</Field>
                  </FormContainer>
                  <ErrorMessage invalid={Boolean(touched.senderId && errors.senderId)} invalidText={errors.senderId} />
                </FormField>{' '}
                <FormField>
                  <FormContainer>
                    <Field name="templateBody">
                      {({ field }: any) => <TextArea {...field} enableCounter id="text-area-1" labelText="Template body" maxCount={500} placeholder="input text" />}
                    </Field>
                  </FormContainer>
                  <ErrorMessage invalid={Boolean(touched.templateBody && errors.templateBody)} invalidText={errors.templateBody} />
                </FormField>
              </FormGroup>
            ) : (
              <FormGroup legendText="">
                <FormField>
                  <FormContainer>
                    <Field name="templatename">
                      {({ field }: any) => <TextInput {...field} type="text" id="templatename-input" labelText="Template Name" placeholder="input name" />}
                    </Field>
                  </FormContainer>
                  <ErrorMessage invalid={Boolean(touched.templatename && errors.templatename)} invalidText={errors.templatename} />
                </FormField>
                <FormField>
                  <FormContainer>
                    <Field name="emailcontainer">
                      {({ field }: any) => <TextArea {...field} enableCounter id="text-area-1" labelText="Email container" maxCount={500} placeholder="input text" />}
                    </Field>
                  </FormContainer>
                  <ErrorMessage invalid={Boolean(touched.emailcontainer && errors.emailcontainer)} invalidText={errors.emailcontainer} />
                </FormField>
                <FormField>
                  <FormContainer>
                    <Field name="emailcontent">{() => <RichTextExample />}</Field>
                  </FormContainer>
                  <ErrorMessage invalid={Boolean(touched.emailcontent && errors.emailcontent)} invalidText={errors.emailcontent} />
                </FormField>
              </FormGroup>
            )}
          </Form>
        )}
      </Formik>{' '}
    </Container>
  );
};

export default MailBody;

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
`;

const MailNav = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${px(24)};
  justify-content: space-between;
`;

type HeaderNavItemProps = { selected: boolean };

const MailNavItem = styled.div<HeaderNavItemProps>`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: ${px(15)} ${px(16)};
  color: ${({ selected, theme }) => (selected ? theme.colors.white : theme.colors.lightText)};
  background-color: ${({ selected, theme }) => (selected ? theme.colors.bgPrimaryLight : theme.colors.bgHover)};
  font-weight: ${({ selected }) => (selected ? '600' : '400')};
  transition: all 0.1s ease-in;
  border-top: 1px solid ${({ selected, theme }) => (selected ? theme.colors.normalText : 'transparent')};
  font-weight: ${({ selected }) => selected && '700'};
  &:hover {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.white};
  }
`;

const MailNavToggle = styled.div`
  display: flex;
  align-items: center;
  border-right: 1px solid ${({ theme }) => theme.colors.bgHover};
`;

const ActionContainer = styled.div`
  button {
    padding: ${px(10)} ${px(16)};
    &:first-child {
      background-color: ${({ theme }) => theme.colors.bgHover};
      color: ${({ theme }) => theme.colors.white} !important;
    }
  }
`;

const CopyDetails = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.bgHover};
  border-radius: ${px(24)};
  padding ${px(5)} ${px(8)};

  svg{
    fill: ${({ theme }) => theme.colors.white};
    cursor: pointer;
  }
`;

const CopyParagraphTitle = styled.span`
  font-size: ${px(14)};
  color: ${({ theme }) => theme.colors.lightText};
  font-weight: 400;
  margin-right: ${px(2)};
`;
const CopyParagraphValue = styled.span`
  font-size: ${px(14)};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
  margin-right: ${px(8)};
`;

const FormContainer = styled.div`
  width: 100%;
  padding-left: ${px(16)};
  padding-right: ${px(33)};

  label {
    color: ${({ theme }) => theme.colors.lightText};
  }
  input,
  textarea {
    border-bottom: 1px solid ${({ theme }) => theme.colors.bgHover} !important;
  }
  textarea {
    min-height: ${px(300)};
  }

  .editor {
    color: ${({ theme }) => theme.colors.white} !important;
    background-color: ${({ theme }) => theme.colors.bgPrimaryLight} !important;
    min-height: ${px(300)} !important;
    padding: ${px(11)} ${px(16)};
    border-bottom: 1px solid ${({ theme }) => theme.colors.bgHover} !important;
    margin-bottom: ${px(50)};
  }
`;

const FormField = styled.div`
  margin-bottom: ${px(16)};
`;
