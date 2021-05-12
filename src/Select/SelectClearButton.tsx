import React, {EventHandler, useCallback, KeyboardEvent} from "react";
import {TS4UComponent} from "../types/TS4UComponent";
import {SelectClearButtonStyle} from "./SelectClearButton.style";

export type SelectClearButtonProps = {
  clear: () => void;
}

export const SelectClearButton: TS4UComponent<SelectClearButtonProps> = ({className, clear}) => {
  const onKeyDown: EventHandler<KeyboardEvent> = useCallback((e) => {
    switch (e.key) {
      case "Enter":
      case "Space":
        clear();
        break;
    }
  }, [clear]);

  return <SelectClearButtonStyle.Component className={className} tabIndex={0} onClick={clear} onKeyDown={onKeyDown}>
    <span>×</span>
  </SelectClearButtonStyle.Component>;
};
