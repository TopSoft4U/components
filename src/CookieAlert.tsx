import {_NextI18Next} from "@topsoft4u/utils/dist/i18n";
import Cookies from "js-cookie";
import React from "react";
import Button from "react-bootstrap/Button";

type CookiesProps = {
  text?: string;
  closeButtonText?: string;
}

const CookieAlert: React.FC<CookiesProps> = ({text, closeButtonText}) => {
  const {useTranslation} = _NextI18Next.getInstance();
  const {t} = useTranslation("shared");
  const [show, setShow] = React.useState(() => Cookies.get("cookie_accepted") !== "1");

  const close = React.useCallback(() => {
    Cookies.set("cookie_accepted", "1", {expires: 3650});
    setShow(false);
  }, []);

  if (!show)
    return null;

  return <div role="dialog" className="cookies" aria-live="polite">
    <p>{text || t("We use cookies to track usage and preferences.")}</p>
    <Button variant="outline-light" onClick={close}>
      {closeButtonText || t("I understand")}
    </Button>
  </div>;
};

export default CookieAlert;
