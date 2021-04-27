import React from "react";
import Button, {ButtonProps} from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

export const progressButtonWaitText = "Please wait";

export const ProgressButton: React.FC<ProgressButtonProps> = ({inProgress, children, progressText, ...props}) => {
  let content = children, disabled = props.disabled;

  if (inProgress) {
    content = <>
      <Spinner animation="border" />
      {progressText || progressButtonWaitText}
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
