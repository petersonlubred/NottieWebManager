import React from 'react';
import { InlineNotification } from '@carbon/react';

interface IProp {
  title?: string;
  kind?: string;
}

const Notify = ({ title, kind = 'success' }: IProp) => {
  return <InlineNotification title={title} kind={kind} />;
};

export default Notify;
