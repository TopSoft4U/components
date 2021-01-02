import React from "react";
import useTranslation from "next-translate/useTranslation";
import Button, {ButtonProps} from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

export const ProgressButton: React.FC<ProgressButtonProps> = ({inProgress, children, progressText, ...props}) => {
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
