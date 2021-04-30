import React from "react";
import {NotificationOnClose} from "./Notification";

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
