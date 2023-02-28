import React from 'react';

import { SMSC, SMSRoute, SMSRouteConfig, SMTP, SMTPRoute } from '@/components/configuration';
import { FormikRefType } from '@/interfaces/formik.type';

interface Props {
  tab: number;
  formRef: React.RefObject<FormikRefType<any>>;
  toggleModal: () => void;
}

const ModalContent = ({ tab, formRef, toggleModal }: Props) => {
  return tab === 3 ? <SMSC /> : tab === 4 ? <SMSRoute /> : tab === 5 ? <SMSRouteConfig /> : tab === 6 ? <SMTP formRef={formRef} toggleModal={toggleModal} /> : <SMTPRoute />;
};

export default ModalContent;
