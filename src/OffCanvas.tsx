import classNames from "classnames";
import React, {SyntheticEvent} from "react";
import {OffCanvasContainerProps, OffCanvasSC} from "./OffCanvas.style";
import {TS4UComponent} from "./";

export type OffCanvasProps = {
  isOpen: boolean;
  toggle: React.EventHandler<SyntheticEvent>;
  side?: "left" | "right" | "top" | "bottom"
  offCanvasClassName?: string;
  withBackdrop?: boolean;
  withCloseButton?: boolean;
} & OffCanvasContainerProps;

export const OffCanvas: TS4UComponent<OffCanvasProps> = (
  {
    isOpen, toggle,
    className, offCanvasClassName, side = "right",
    withBackdrop = true, withCloseButton = true,
    children,
    // SC
    zIndex = 1500, transitionDuration = 300, height = "250px", width = "250px"
  }) => {

  const scProps: OffCanvasContainerProps = React.useMemo(() => ({
    zIndex,
    transitionDuration,
    height,
    width
  }), [height, transitionDuration, width, zIndex]);

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

  const sideClass = `side-${side}`;
  const isOpenClass = isOpen ? "open" : undefined;

  const cn = classNames(
    className,
    sideClass,
    isOpenClass
  );

  const offCn = classNames(
    offCanvasClassName,
    sideClass,
    isOpenClass
  );

  return <OffCanvasSC.Container>
    <div className={cn}>
      {children}
    </div>

    {withBackdrop && <OffCanvasSC.Backdrop {...scProps} aria-hidden={isOpen ? "true" : "false"} className={offCn} onClick={toggle} />}
  </OffCanvasSC.Container>;
};
