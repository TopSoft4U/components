import classNames from "classnames";
import React, {ReactElement} from "react";
import {TS4UComponent} from "../types/TS4UComponent";
import {Option, Options, TS4USelectProps} from "./Select";
import {SelectMultiItem, SelectMultiItemProps} from "./SelectMultiItem";
import {SelectMultiItemListStyle} from "./SelectMultiItemList.style";

export type SelectMultiItemComponentType = (props: SelectMultiItemProps) => ReactElement<SelectMultiItemProps>;
export type SelectMultiItemRendererType = (option: Option) => ReactElement | string | false;

export type SelectMultiItemListProps = Pick<TS4USelectProps, "options"> & {
  className?: string;
  optionClassName?: string;

  valueArray: Options;

  labelKey: TS4USelectProps["labelKey"];
  valueKey: TS4USelectProps["valueKey"];

  itemComponent?: SelectMultiItemComponentType;
  itemRenderer?: SelectMultiItemRendererType;

  onRemoveItem: (value: Option) => void;
}

export const SelectMultiItemList: TS4UComponent<SelectMultiItemListProps> = (
  {
    className, children,
    optionClassName,
    labelKey, valueKey,
    itemComponent, itemRenderer,
    onRemoveItem,
    options, valueArray
  }) => {

  const selectedOptions = valueArray;
  // const selectedOptions = options?.filter(opt => valueArray?.some((x: Option) => x[valueKey] === opt[valueKey]));

  const cn = classNames(className, "ts4u-select-multi-items");

  return <SelectMultiItemListStyle className={cn}>
    {selectedOptions?.map((option, i) => {
      const label = option[labelKey];
      const value = option[valueKey];

      const ItemComp = itemComponent || SelectMultiItem;

      return <ItemComp
        key={`multi-item-${i}-${value}`}
        className={optionClassName}
        option={option}
        onRemoveItem={onRemoveItem}
      >
        {itemRenderer ? itemRenderer(option) : label}
      </ItemComp>;
    })}
    {children}
  </SelectMultiItemListStyle>;
};
