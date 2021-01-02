import Cookies from "js-cookie";
import React from "react";
import Button from "react-bootstrap/Button";
import useTranslation from "next-translate/useTranslation";

type CookiesProps = {
  text?: string;
  closeButtonText?: string;
}

export const CookieAlert: React.FC<CookiesProps> = ({text, closeButtonText}) => {
  const {t} = useTranslation("shared");
  const [show, setShow] = React.useState(() => Cookies.get("cookie_accepted") !== "1");

  const close = React.useCallback(() => {
    Cookies.set("cookie_accepted", "1", {expires: 3650});
    setShow(false);
  }, []);

  if (!show)
    return null;

  return <div role="dialog" className="cookies" aria-live="polite">
    <p>{text || t("cookies.text")}</p>
    <Button variant="outline-light" onClick={close}>
      {closeButtonText || t("cookies.understand")}
    </Button>
  </div>;
};
