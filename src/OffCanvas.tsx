import classNames from "classnames";
import React, {SyntheticEvent} from "react";

type OffCanvasProps = {
  isOpen: boolean;
  toggle: React.EventHandler<SyntheticEvent>;
  side?: "left" | "right" | "top" | "bottom"
  className?: string;
  offCanvasClassName?: string;
  withBackdrop?: boolean;
  withCloseButton?: boolean;
};

export const OffCanvas: React.FC<OffCanvasProps> = (
  {
    isOpen, toggle,
    className, side = "right",
    withBackdrop = true, withCloseButton = true,
    children
  }) => {

  const onKeyDown = React.useCallback((e) => {
    if (!isOpen)
      return;

    switch (e.key) {
      case "Escape":
      case "Backspace":
        toggle(e);
        break;
      default:
        break;
    }
  }, [isOpen, toggle]);

  React.useEffect(() => {
    document.addEventListener("keydown", onKeyDown, false);
    return () => {
      document.removeEventListener("keydown", onKeyDown, false);
    };
  }, [onKeyDown]);

  const cn = classNames(
    "offcanvas",
    className,
    `side-${side}`,
    {
      "open": isOpen
    }
  );

  const offCn = classNames(
    "offcanvas-overlay",
    className,
    `side-${side}`,
    {
      "open": isOpen
    }
  );

  return <>
    <div className={cn}>
      {children}
    </div>

    {withBackdrop && <div aria-hidden={isOpen ? "true" : "false"} className={offCn} onClick={toggle} />}
  </>;
};
