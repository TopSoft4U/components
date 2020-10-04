import Cookies from "js-cookie";
import React from "react";

import {useTranslation} from "../../i18n";

type CookiesProps = {
  text: string;
  closeButtonText: string;
}

const CookieAlert: React.FC<CookiesProps> = ({text, closeButtonText}) => {
  const {t} = useTranslation("common");
  const [show, setShow] = React.useState(() => Cookies.get("cookie_accepted") !== "1");

  const close = React.useCallback(() => {
    Cookies.set("cookie_accepted", "1", {expires: 3650});
    setShow(false);
  }, []);

  if (!show)
    return null;

  return <div role="dialog" className="cookies" aria-live="polite">
    <p>{t("We use cookies to track usage and preferences.")}</p>
    <button onClick={close}>{t("I understand")}</button>
  </div>;
};

export default CookieAlert;
