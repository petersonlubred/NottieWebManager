import React, { useRef, useState } from 'react';

import TemplateSidebar from '@/components/configuration/views/Template/TemplateContent';
import Icon from '@/components/shared/Icons';
import Loader from '@/components/shared/Loader';
import { FormikRefType } from '@/interfaces/formik.type';
import { useGetTemplateConfigEmailQuery, useGetTemplateConfigSmsQuery } from '@/redux/api';
import { initialTemplate } from '@/schemas/dto';
import { IinitialTemplate } from '@/schemas/interface';

import { ConfigurationContainer, NoDataContainer, NoDataTitle } from '../../../../pages/configuration';
import CreateTemplateAlertModal from './CreateTemplateModal';
import MailBody from './MailBody';
import TagSection from './TagSection';

const Template = () => {
  const [template, setTemplate] = useState<{ templateId: string; templateName: string }>({ templateId: '', templateName: '' });
  const [formdata, setFormData] = useState<IinitialTemplate & { templateId: string }>({ templateName: '', templateId: '', serviceTypeId: '' });
  const [serviceTypeId, setServiceTypeId] = useState<string>('');
  const [getNonTransactionalTag, setGetNonTransactionalTag] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const formRef = useRef<FormikRefType<any>>();
  const { data: emailConfig, isFetching: isFetchingEmailConfig } = useGetTemplateConfigEmailQuery(
    { serviceTypeId, templateId: template?.templateId },
    { skip: !(serviceTypeId && template?.templateId) }
  );
  const { data: smsConfig, isFetching: isFetchingSmsConfig } = useGetTemplateConfigSmsQuery(
    { serviceTypeId, templateId: template?.templateId },
    { skip: !(serviceTypeId && template?.templateId) }
  );

  const onSelectTemplate = ({
    template,
    serviceId,
    shouldGetNonTransactionalTag,
  }: {
    template: { templateId: string; templateName: string };
    serviceId: string;
    shouldGetNonTransactionalTag: boolean;
  }) => {
    setServiceTypeId(serviceId);
    setTemplate(template);
    setGetNonTransactionalTag(shouldGetNonTransactionalTag);
  };

  const toggleModal = () => {
    setOpenModal(false);
    setFormData({
      templateId: '',
      templateName: '',
      serviceTypeId: '',
    });
    formRef.current?.resetForm({ values: initialTemplate });
  };

  const handleSubmit = async () => {
    formRef.current?.handleSubmit();
  };

  const handleFormData = () => {
    setOpenModal(true);
    setFormData({ ...template, serviceTypeId: serviceTypeId });
  };

  return (
    <ConfigurationContainer>
      <TemplateSidebar onSelectTemplate={onSelectTemplate} template={template} setOpenModal={setOpenModal} />

      {template.templateId && serviceTypeId && formRef && !(isFetchingEmailConfig || isFetchingSmsConfig) && emailConfig?.data && smsConfig?.data ? (
        <MailBody
          template={template}
          serviceTypeId={serviceTypeId}
          emailData={emailConfig?.data}
          smsData={smsConfig?.data}
          formRef={formRef}
          handleSubmit={handleSubmit}
          handleFormData={handleFormData}
        />
      ) : (
        <NoDataContainer>
          <Icon id="empty-drawer-icon" width={43} height={51} />
          <NoDataTitle>Select or create a template from the left panel and you can see it here.</NoDataTitle>
        </NoDataContainer>
      )}
      {serviceTypeId && <TagSection getNonTransactionalTag={getNonTransactionalTag} templateId={template.templateId} />}
      {(isFetchingEmailConfig || isFetchingSmsConfig) && <Loader />}

      <CreateTemplateAlertModal open={openModal} toggleModal={toggleModal} formRef={formRef} formdata={formdata} handleSubmit={handleSubmit} />
    </ConfigurationContainer>
  );
};

export default Template;
