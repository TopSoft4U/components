import Cookies from "js-cookie";
import React from "react";
import classNames from "classnames";
import {TS4UComponent} from "./types/TS4UComponent";
import {CookieAlertSC} from "./CookieAlert.style";

type CookiesProps = {
  text?: string;
  closeButtonText?: string;
  closeButtonClassName?: string;
}

export const cookieAlertButtonText = "I understand";
export const cookieAlertText = "We use cookies to track usage and preferences.";

export const CookieAlert: TS4UComponent<CookiesProps> = (
  {
    className,
    text = cookieAlertText,
    closeButtonText = cookieAlertButtonText, closeButtonClassName
  }) => {
  const [show, setShow] = React.useState(() => Cookies.get("cookie_accepted") !== "1");

  const close = React.useCallback(() => {
    Cookies.set("cookie_accepted", "1", {expires: 3650});
    setShow(false);
  }, []);

  if (!show)
    return null;

  return <CookieAlertSC.Alert role="dialog" className={classNames(className, "bg-primary")} aria-live="polite">
    <CookieAlertSC.Text>{text}</CookieAlertSC.Text>
    <CookieAlertSC.CloseButton className={closeButtonClassName} variant="outline-light" onClick={close}>
      {closeButtonText}
    </CookieAlertSC.CloseButton>
  </CookieAlertSC.Alert>;
};
