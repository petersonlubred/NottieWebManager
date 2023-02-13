import React from 'react';
import { InlineNotification, ToastNotification } from '@carbon/react';

interface IProp {
  title?: string;
  type?: string;
  role?: string;
  description?: string;
  message?: string;
}

type IProps = {
  title?: string;
  type?: string;
  caption?: string;
  description?: string;
  message?: string;
  expiresIn?: number;
};

export const Notify = ({ title, type, role, description, message }: IProp) => {
  <InlineNotification
    title={title}
    kind={type}
    role={role}
    description={description}
    subTitle={message}
  />;
};

export const Toast = ({
  title,
  type,
  caption,
  description,
  message,
  expiresIn,
}: IProps) => {
  <ToastNotification
    caption={caption}
    iconDescription={description}
    subtitle={message}
    timeout={expiresIn}
    title={title}
    kind={type}
  />;
};
