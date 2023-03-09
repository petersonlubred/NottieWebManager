import { Copy } from '@carbon/react/icons';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Button from '@/components/shared/Button';
import { useToast } from '@/context/ToastContext';
import { FormikRefType } from '@/interfaces/formik.type';
import { ITemplateConfigEmail, ITemplateConfigSms } from '@/interfaces/template';
import { initialEmailTemplate, initialSmsTemplate } from '@/schemas/dto';
import { px } from '@/utils';

import EmailForm from './EmailForm';
import SmsForm from './SmsForm';

const navItems = ['SMS Template', 'Email Template'];

interface IMailBody {
  template: { templateId: string; templateName: string };
  serviceTypeId: string;
  emailData: ITemplateConfigEmail;
  smsData: ITemplateConfigSms;
  formRef: React.RefObject<FormikRefType<any>>;
  handleSubmit: () => void;
  handleFormData: () => void;
}

const MailBody = ({ template, serviceTypeId, emailData, smsData, formRef, handleSubmit, handleFormData }: IMailBody) => {
  const [selected, setSelected] = React.useState<number>(0);
  const [responseData, setResponseData] = useState<ITemplateConfigEmail | ITemplateConfigSms>();

  const { toast } = useToast();

  const discardChanges = () => {
    let resetData;
    if (selected === 0) {
      resetData = smsData;
    } else {
      resetData = emailData;
    }
    setResponseData(resetData);
    formRef.current?.resetForm({ values: { ...resetData, templateId: template?.templateId, serviceTypeId } });
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(template?.templateId);
    toast('info', 'TemplateId copied to clipboard');
  };

  useEffect(() => {
    if (selected === 0) {
      !isEmpty(smsData)
        ? (setResponseData(smsData), formRef.current?.resetForm({ values: { ...smsData, templateId: template?.templateId, serviceTypeId } }))
        : setResponseData({ ...initialSmsTemplate });
    } else {
      !isEmpty(emailData)
        ? (setResponseData(emailData), formRef.current?.resetForm({ values: { ...emailData, templateId: template?.templateId, serviceTypeId } }))
        : setResponseData({ ...initialEmailTemplate });
    }
  }, [emailData, smsData, selected, template?.templateId, serviceTypeId, formRef]);

  return (
    <Container>
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
          <CopyParagraphValue> {template.templateId}</CopyParagraphValue>
          <Copy size={16} onClick={handleCopy} />
        </CopyDetails>
        <ActionContainer>
          <Button renderIcon={null} handleClick={() => handleFormData()} buttonLabel="Edit Template" />
          <Button renderIcon={null} handleClick={() => discardChanges()} buttonLabel="Discard changes" />
          <Button renderIcon={null} handleClick={() => handleSubmit()} buttonLabel="Save Changes" />{' '}
        </ActionContainer>
      </MailNav>
      {selected === 0 && responseData && <SmsForm formdata={{ ...(responseData as ITemplateConfigSms), templateId: template?.templateId, serviceTypeId }} formRef={formRef} />}
      {selected === 1 && responseData && <EmailForm formdata={{ ...(responseData as ITemplateConfigEmail), templateId: template?.templateId, serviceTypeId }} formRef={formRef} />}
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
    &:nth-child(2) {
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
  padding: ${px(5)} ${px(8)};

  svg {
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
