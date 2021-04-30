import React from "react";

import {Notification, NotificationClassNames, NotificationProps} from "./Notification";
import {NotificationContainerSC} from "./NotificationContainer.style";
import {NotificationManager, NotificationType} from "./NotificationManager";

export type NotificationContainerProps = {
  tag?: React.FC<NotificationProps>;
  notificationClassNames?: NotificationClassNames;
  className?: string;
}

export const NotificationContainer: React.FC<NotificationContainerProps> = ({tag, notificationClassNames, className}) => {
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

  const Tag = tag || Notification;
  return <NotificationContainerSC.Container className={className}>
    {items.map(notification => <Tag
      key={notification.id}
      {...notification}
      {...notificationClassNames}
      onClose={onClose}
    />)}
  </NotificationContainerSC.Container>;
};
