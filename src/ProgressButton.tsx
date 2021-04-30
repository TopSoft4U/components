import React from "react";
import classNames from "classnames";
import {ButtonProps} from "react-bootstrap/Button";
import {TS4UComponent} from "./types/TS4UComponent";
import {ProgressButtonSC} from "./ProgressButton.style";

export const progressButtonWaitText = "Please wait";

export const ProgressButton: TS4UComponent<ProgressButtonProps> = ({inProgress, className, children, progressText, ...props}) => {
  let content = children, disabled = props.disabled;

  if (inProgress) {
    content = <>
      <ProgressButtonSC.Spinner animation="border" />
      {progressText || progressButtonWaitText}
    </>;
    disabled = true;
  }

  return <ProgressButtonSC.Button {...props} disabled={disabled} className={classNames("btn-progress", className)}>
    {content}
  </ProgressButtonSC.Button>;
};

export type ProgressButtonProps = ButtonProps & {
  inProgress: boolean;
  progressText?: string;
};
