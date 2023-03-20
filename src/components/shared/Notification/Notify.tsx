import { InlineNotification, NotificationKind } from 'carbon-components-react';
import React from 'react';

interface IProp {
  title: NonNullable<React.ReactNode>;
  kind?: NotificationKind;
}

const Notify = ({ title, kind = 'success' }: IProp) => {
  return <InlineNotification title={title} kind={kind} />;
};

export default Notify;
