import React, {ComponentProps, EventHandler, ReactElement, SyntheticEvent, useCallback, useRef} from "react";
import classNames from "classnames";
import {stopEvent} from "@topsoft4u/utils";
import {Option} from "./Select";
import {SelectOptionStyle} from "./SelectOption.style";

export type SelectOptionProps = {
  optionIndex?: number;
  className?: string;
  isDisabled?: boolean;
  isFocused?: boolean;
  isSelected?: boolean;
  label?: string;
  onFocus?: (index: number, option: Option) => void;
  onSelect?: (option: Option) => void;
  option?: Option;
  children?: ReactElement | string | false;
}

export const SelectOption: <T extends any>(props: SelectOptionProps) => ReactElement<SelectOptionProps> = (
  {
    className,
    isDisabled,
    isSelected,
    isFocused,
    label,
    onFocus,
    onSelect,
    option,
    optionIndex,
    children
  }) => {
  const isDragging = useRef(false);

  const handleTouchStart = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleTouchMove = useCallback(() => {
    isDragging.current = true;
  }, []);

  const handleMouseDown: EventHandler<SyntheticEvent> = useCallback((event) => {
    stopEvent(event);
    if (onSelect && option)
      onSelect(option);
  }, [onSelect, option]);

  const handleTouchEnd: EventHandler<SyntheticEvent> = useCallback((event) => {
    if (isDragging.current)
      return;

    stopEvent(event);
    handleMouseDown(event);
  }, [handleMouseDown]);

  // region Focus events
  const onOptFocus: EventHandler<SyntheticEvent> = useCallback((event) => {
    if (optionIndex && optionIndex >= 0 && !isFocused && onFocus && option)
      onFocus(optionIndex, option);
  }, [isFocused, onFocus, option, optionIndex]);

  const handleMouseEnter: EventHandler<SyntheticEvent> = useCallback((event) => {
    onOptFocus(event);
  }, [onOptFocus]);

  const handleMouseMove: EventHandler<SyntheticEvent> = useCallback((event) => {
    onOptFocus(event);
  }, [onOptFocus]);
  // endregion

  const cn = classNames(className, {
    "item": !!option,
    "disabled": isDisabled,
    "active": isSelected,
    "focused": isFocused,
  });

  const optProps: ComponentProps<typeof SelectOptionStyle> = {
    className: cn,
    tabIndex: 0,
    role: "option",
    "aria-label": label,
    "aria-selected": isSelected,
    children: children || label,
    disabled: isDisabled,
    selected: isSelected,
    focused: isFocused,
  };

  if (isDisabled)
    return <SelectOptionStyle {...optProps} onMouseDown={stopEvent} onClick={stopEvent} onKeyPress={stopEvent} />;

  return <SelectOptionStyle
    {...optProps}
    onMouseDown={handleMouseDown}
    onMouseEnter={handleMouseEnter}
    onMouseMove={handleMouseMove}
    onTouchStart={handleTouchStart}
    onTouchMove={handleTouchMove}
    onTouchEnd={handleTouchEnd}
  />;
};
