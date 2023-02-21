import React, { useCallback, useEffect } from 'react';
import { ToastNotification } from '@carbon/react';
import { useToast } from '@/context/ToastContext';
import styled from 'styled-components';
import { px, rem } from '@/utils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setNotifications } from '@/redux/slices/util';

const Toast = () => {
  const { kind, title, rerender } = useToast();
  const { notifications } = useSelector(
    (state: RootState) => state.sharedReducer
  );

  const dispatch = useDispatch();

  const handleAddNotification = useCallback((kind: string, title: string) => {
    const id = Date.now().toString();
    if (title) {
      const notification = {
        id,
        title: title + id,
        kind: kind,
      };
      dispatch(setNotifications(notification));
    }
  }, []);

  const handleRemoveNotification = (id: string) => {
    const filteredNotifications = notifications.filter((n: any) => n.id !== id);
    setNotifications(filteredNotifications);
  };

  useEffect(() => {
    handleAddNotification(kind, title);
  }, [handleAddNotification, kind, title, rerender]);

  console.log(notifications);

  return (
    <NotificationContainer>
      {notifications.map(({ id, title, subtitle, kind }: any) => (
        <ToastNotification
          key={id}
          kind={kind}
          title={title}
          subtitle={subtitle}
          timeout={1000000}
          onCloseButtonClick={() => handleRemoveNotification(id)}
        />
      ))}
    </NotificationContainer>
  );
};

export default Toast;

const NotificationContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${px(6)};

  .cds--toast-notification {
    padding-bottom: 0.8125rem;
  }
`;
