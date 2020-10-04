import {_NextI18Next} from "@topsoft4u/utils/dist/i18n";
import Cookies from "js-cookie";
import React from "react";

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
    <button className="btn btn-outline-light" onClick={close}>{closeButtonText || t("I understand")}</button>
  </div>;
};

export default CookieAlert;
