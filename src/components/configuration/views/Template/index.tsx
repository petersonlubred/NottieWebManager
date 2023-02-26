import MailBody from '@/components/configuration/views/Template/MailBody';
import TagSection from '@/components/configuration/views/Template/TagSection';
import TemplateSidebar from '@/components/configuration/views/Template/TemplateContent';
import Icon from '@/components/shared/Icons';
import React from 'react';
import { ConfigurationContainer, NoDataContainer, NoDataTitle } from '../../../../pages/configuration';

const Template = () => {
  return (
    <ConfigurationContainer>
      <TemplateSidebar />
      <NoDataContainer>
        <Icon id="empty-drawer-icon" width={43} height={51} />
        <NoDataTitle>Select or create a template from the left panel and you can see it here.</NoDataTitle>
      </NoDataContainer>
      {/* <MailBody /> <TagSection /> */}
    </ConfigurationContainer>
  );
};

export default Template;
