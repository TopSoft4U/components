import Cookies from "js-cookie";
import React from "react";
import Button from "react-bootstrap/Button";

type CookiesProps = {
  text?: string;
  closeButtonText?: string;
}

export const cookieAlertButtonText = "I understand";
export const cookieAlertText = "We use cookies to track usage and preferences.";

export const CookieAlert: React.FC<CookiesProps> = ({text, closeButtonText}) => {
  const [show, setShow] = React.useState(() => Cookies.get("cookie_accepted") !== "1");

  const close = React.useCallback(() => {
    Cookies.set("cookie_accepted", "1", {expires: 3650});
    setShow(false);
  }, []);

  if (!show)
    return null;

  return <div role="dialog" className="cookies" aria-live="polite">
    <p>{text || cookieAlertText}</p>
    <Button variant="outline-light" onClick={close}>
      {closeButtonText || cookieAlertButtonText}
    </Button>
  </div>;
};
