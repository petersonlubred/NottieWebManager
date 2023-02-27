import { InlineNotification } from '@carbon/react';
import React from 'react';

interface IProp {
  title?: string;
  kind?: string;
}

const Notify = ({ title, kind = 'success' }: IProp) => {
  return <InlineNotification title={title} kind={kind} />;
};

export default Notify;
