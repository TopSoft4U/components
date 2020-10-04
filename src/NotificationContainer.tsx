import {NotificationManager, NotificationType} from "@topsoft4u/utils/dist/NotificationManager";
import React from "react";

export type NotificationProps = NotificationType & {
  onClose: (id: number) => void;
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
