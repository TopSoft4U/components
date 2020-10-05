import React from "react";
import {_NextI18Next} from "@topsoft4u/utils/dist/i18n";
import Button, {ButtonProps} from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const ProgressButton: React.FC<ProgressButtonProps> = ({inProgress, children, progressText, ...props}) => {
  const {useTranslation} = _NextI18Next.getInstance();
  const {t} = useTranslation("shared");

  let content = children, disabled = props.disabled;

  if (inProgress) {
    content = <>
      <Spinner animation="border" />
      {progressText || t("Please wait")}
    </>;
    disabled = true;
  }

  return <Button {...props} disabled={disabled} className="btn-progress">
    {content}
  </Button>;
};

type ProgressButtonProps = ButtonProps & {
  inProgress: boolean;
  progressText?: string;
};

export default ProgressButton;
