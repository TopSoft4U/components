import React from "react";
import classNames from "classnames";
import {TS4UComponent} from "../types/TS4UComponent";
import {NotificationSC} from "./Notification.style";
import {NotificationType} from "./NotificationManager";
import {useNotification} from "./useNotification";

export type NotificationOnClose = (id: number) => void;
export type NotificationClassNames = {
  containerClassName?: string;
  titleClassName?: string;
  clickClassName?: string;
  closeClassName?: string;
  contentClassName?: string;
};

export type NotificationProps = NotificationType & NotificationClassNames & {
  onClose: NotificationOnClose;
}

export const Notification: TS4UComponent<NotificationProps> = (
  {
    id, type, timeout,
    // Content
    message, title,
    // Buttons
    onClick, onClickText = "Click", onClose,
    // Class names
    containerClassName, clickClassName, closeClassName, contentClassName, titleClassName,
  }) => {
  const {closeNotification} = useNotification(id, onClose, timeout);

  return <NotificationSC.Container className={classNames(containerClassName, `${type}`, `bg-${type}`)}>
    {title && <NotificationSC.Title className={titleClassName}>{title}</NotificationSC.Title>}
    <NotificationSC.Content className={contentClassName}>
      {message}
    </NotificationSC.Content>
    {onClick && <NotificationSC.ButtonClick className={clickClassName}>{onClickText || "Click"}</NotificationSC.ButtonClick>}
    <NotificationSC.ButtonClose className={closeClassName} onClick={closeNotification}>
      <span aria-hidden="true">{String.fromCharCode(215)}</span>
    </NotificationSC.ButtonClose>
  </NotificationSC.Container>;
};
