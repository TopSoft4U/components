import classNames from "classnames";
import React, {useCallback} from "react";

import {TS4UComponent} from "../types/TS4UComponent";
import {SelectMultiItemStyle} from "./SelectMultiItem.style";
import {Option} from "./Select";
import {SelectMultiItemListProps} from "./SelectMultiItemList";

export type SelectMultiItemProps = Pick<SelectMultiItemListProps, "onRemoveItem"> & {
  option: Option;
}

export const SelectMultiItem: TS4UComponent<SelectMultiItemProps> = (
  {
    className,
    option,
    onRemoveItem,
    children
  }) => {

  const onRemoveClick = useCallback(() => {
    onRemoveItem(option);
  }, [onRemoveItem, option]);

  const cn = classNames(className, {
    "item": true,
  });

  return <SelectMultiItemStyle.Container className={cn}>
    <SelectMultiItemStyle.Label className="label">
      {children}
    </SelectMultiItemStyle.Label>
    <SelectMultiItemStyle.ButtonRemove className="remove" onClick={onRemoveClick}>
      <span>×</span>
    </SelectMultiItemStyle.ButtonRemove>
  </SelectMultiItemStyle.Container>;
};
