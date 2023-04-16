import { ToastNotification } from 'carbon-components-react';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { useToast } from '@/context/ToastContext';
import { setNotifications } from '@/redux/slices/util';
import { RootState } from '@/redux/store';
import { px } from '@/utils';

const Toast = () => {
  const { kind, title, rerender } = useToast();
  const { notifications } = useSelector((state: RootState) => state.sharedReducer);

  const dispatch = useDispatch();

  const handleAddNotification = useCallback(
    (kind: string, title: string) => {
      const id = Date.now().toString();
      if (title) {
        const notification = {
          id,
          title: title,
          kind: kind,
        };
        dispatch(setNotifications(notification));
      }
    },
    [dispatch]
  );

  const handleRemoveNotification = (id: string) => {
    const filteredNotifications = notifications.filter((n: any) => n.id !== id);
    setNotifications(filteredNotifications);
  };

  useEffect(() => {
    handleAddNotification(kind, title);
  }, [handleAddNotification, kind, title, rerender]);

  return (
    <NotificationContainer>
      {notifications.map(({ id, title, subtitle, kind }: any) => (
        <ToastNotification key={id} kind={kind} title={title} subtitle={subtitle} timeout={3000} onCloseButtonClick={() => handleRemoveNotification(id)} />
      ))}
    </NotificationContainer>
  );
};

export default Toast;

const NotificationContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${px(6)};

  .cds--toast-notification {
    padding-bottom: 0.8125rem;
  }
`;
