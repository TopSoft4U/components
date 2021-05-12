import React, {ReactElement, useMemo} from "react";
import classNames from "classnames";
import {Option, Options, TS4USelectProps} from "./Select";
import {SelectOption, SelectOptionProps} from "./SelectOption";
import {SelectOptionListStyle} from "./SelectOptionList.style";

export type SelectOptionComponentType = (props: SelectOptionProps) => ReactElement<SelectOptionProps>;
export type SelectOptionRendererType = (option: Option) => ReactElement | string | false;

type SelectOptionListProps = Pick<TS4USelectProps, "options" | "txtOptionsLoading" | "txtOptionsEmpty" | "txtOptionsNoResult" | "txtCreatableAdd"> & {
  focusedIndex: number;
  className?: string;
  optionClassName?: string;
  inputValue?: string;
  loading?: boolean;
  labelKey: TS4USelectProps["labelKey"];
  valueKey: TS4USelectProps["valueKey"];
  valueArray: Options;
  optionComponent?: SelectOptionComponentType
  optionRenderer?: SelectOptionRendererType
  onFocus: (index: number, value: Option) => void;
  onSelect: (value: Option) => void;
}

const defTxtOptionsEmpty: TS4USelectProps["txtOptionsEmpty"] = "Start typing to search for results";
const defTxtOptionsLoading: TS4USelectProps["txtOptionsLoading"] = "Loading...";
const defTxtOptionsNoResult: TS4USelectProps["txtOptionsNoResult"] = (label: string) => {
  return `No results found for phrase: ${label}`;
};

export const SelectOptionList = <T extends any>(
  {
    focusedIndex,
    className,
    optionClassName,
    inputValue,
    loading,
    onFocus,
    onSelect,
    options,
    valueArray,
    labelKey, valueKey,
    optionComponent,
    optionRenderer,
    // Texts
    txtOptionsEmpty = defTxtOptionsEmpty,
    txtOptionsLoading = defTxtOptionsLoading,
    txtOptionsNoResult = defTxtOptionsNoResult,
    // Creatable
    txtCreatableAdd,
  }: SelectOptionListProps) => {

  const optsMemo = useMemo(() => {
    const OptionComp = optionComponent || SelectOption;

    if (!options || !options.length) {
      if (loading)
        return <OptionComp className="loading" isDisabled>{txtOptionsLoading}</OptionComp>;

      // if (!inputValue && !valueArray.length)
      if (!inputValue)
        return <OptionComp className="empty" isDisabled>{txtOptionsEmpty}</OptionComp>;

      return <OptionComp className="no-results" isDisabled>{txtOptionsNoResult(inputValue)}</OptionComp>;
    }

    return options?.map((option, i) => {
      const isSelected = valueArray && valueArray.some((x: Option) => x[valueKey] === option[valueKey]);
      const isDisabled = option.disabled;
      const isFocused = focusedIndex === i;

      let label = option[labelKey];
      if (option.isCreatePH)
        label = txtCreatableAdd(label);

      const value = option[valueKey];

      return <OptionComp
        className={optionClassName}
        key={`opt-${i}-${value}`}
        onFocus={onFocus}
        onSelect={onSelect}
        option={option}
        label={label}
        isSelected={isSelected}
        isDisabled={isDisabled}
        isFocused={isFocused}
        optionIndex={i}
      >
        {optionRenderer ? optionRenderer(option) : label}
      </OptionComp>;
    });
  }, [optionComponent, options, loading, txtOptionsLoading, inputValue, valueArray, txtOptionsEmpty, txtOptionsNoResult, txtCreatableAdd, focusedIndex, labelKey, valueKey, optionClassName, onFocus, onSelect, optionRenderer]);

  return <SelectOptionListStyle className={classNames("options", className)}>
    {optsMemo}
  </SelectOptionListStyle>;
};
