import React from 'react';

import { SMSC, SMSRoute, SMSRouteConfig, SMTP, SMTPRoute } from '@/components/configuration';
import { FormikRefType } from '@/interfaces/formik.type';
interface Props {
  tab: number;
  formRef: React.RefObject<FormikRefType<any>>;
  toggleModal: () => void;
}

const ModalContent = ({ tab, formRef, toggleModal }: Props) => {
  return tab === 3 ? (
    <SMSC formRef={formRef} toggleModal={toggleModal} />
  ) : tab === 4 ? (
    <SMSRoute formRef={formRef} toggleModal={toggleModal} />
  ) : tab === 5 ? (
    <SMSRouteConfig formRef={formRef} toggleModal={toggleModal} />
  ) : tab === 6 ? (
    <SMTP formRef={formRef} toggleModal={toggleModal} />
  ) : tab === 7 ? (
    <SMTPRoute formRef={formRef} toggleModal={toggleModal} />
  ) : null;
};

export default ModalContent;
