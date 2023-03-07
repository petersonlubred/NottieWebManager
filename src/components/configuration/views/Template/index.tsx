import React, { useRef, useState } from 'react';

import TemplateSidebar from '@/components/configuration/views/Template/TemplateContent';
import Icon from '@/components/shared/Icons';
import Loader from '@/components/shared/Loader';
import { FormikRefType } from '@/interfaces/formik.type';
import { useGetTemplateConfigEmailQuery, useGetTemplateConfigSmsQuery } from '@/redux/api';

import { ConfigurationContainer, NoDataContainer, NoDataTitle } from '../../../../pages/configuration';
import MailBody from './MailBody';

const Template = () => {
  const [templateId, setTemplateId] = useState<string>('');
  const [serviceTypeId, setServiceTypeId] = useState<string>('');
  const formRef = useRef<FormikRefType<any>>();
  const { data: emailConfig, isFetching: isFetchingEmailConfig } = useGetTemplateConfigEmailQuery({ serviceTypeId, templateId }, { skip: !(serviceTypeId && templateId) });
  const { data: smsConfig, isFetching: isFetchingSmsConfig } = useGetTemplateConfigSmsQuery({ serviceTypeId, templateId }, { skip: !(serviceTypeId && templateId) });

  const onSelectTemplate = ({ templateId, serviceId }: { serviceId: string; templateId: string }) => {
    setServiceTypeId(serviceId);
    setTemplateId(templateId);
  };

  const handleSubmit = async () => {
    formRef.current?.handleSubmit();
  };

  return (
    <ConfigurationContainer>
      <TemplateSidebar onSelectTemplate={onSelectTemplate} formRef={formRef} handleSubmit={handleSubmit} />

      {templateId && serviceTypeId && formRef && !(isFetchingEmailConfig || isFetchingSmsConfig) && emailConfig?.data && smsConfig?.data ? (
        <MailBody templateId={templateId} serviceTypeId={serviceTypeId} emailData={emailConfig?.data} smsData={smsConfig?.data} formRef={formRef} handleSubmit={handleSubmit} />
      ) : (
        <NoDataContainer>
          <Icon id="empty-drawer-icon" width={43} height={51} />
          <NoDataTitle>Select or create a template from the left panel and you can see it here.</NoDataTitle>
        </NoDataContainer>
      )}

      {(isFetchingEmailConfig || isFetchingSmsConfig) && <Loader />}
    </ConfigurationContainer>
  );
};

export default Template;
