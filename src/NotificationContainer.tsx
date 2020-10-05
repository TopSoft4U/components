import React from "react";

import {NotificationManager, NotificationType} from "./NotificationManager";

type NotificationOnClose = (id: number) => void;
export type NotificationProps = NotificationType & {
  onClose: NotificationOnClose;
}

export type NotificationContainerProps = {
  tag: React.FC<NotificationProps>;
}

export const NotificationContainer: React.FC<NotificationContainerProps> = ({tag}) => {
  const [items, setItems] = React.useState<NotificationType[]>([]);

  const handleStoreChange = React.useCallback((notifications) => {
    // Spreading due to apparently shallow comparison
    setItems([...notifications]);
  }, []);

  const onClose = React.useCallback((id: number) => NotificationManager.remove(id), []);

  React.useEffect(() => {
    NotificationManager.addChangeListener(handleStoreChange);
    return () => {
      NotificationManager.removeChangeListener(handleStoreChange);
    };
  }, [handleStoreChange]);

  if (!items)
    return null;

  const Tag = tag;
  return <div className="notifications">
    {items.map(notification => <Tag key={notification.id} {...notification} onClose={onClose} />)}
  </div>;
};

export const useNotification = (id: number, onClose: NotificationOnClose, timeout = 0) => {
  const closeTimeout = React.useRef<ReturnType<typeof setTimeout>>();

  const closeNotification = React.useCallback(() => {
    onClose(id);
  }, [id, onClose]);

  React.useEffect(() => {
    if (timeout)
      closeTimeout.current = setTimeout(closeNotification, timeout);
    return () => {
      if (timeout && closeTimeout.current)
        clearTimeout(closeTimeout.current);
    };
  }, [closeNotification, timeout]);

  return {closeNotification};
};
