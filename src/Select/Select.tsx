import React, {ChangeEvent, FocusEventHandler, KeyboardEventHandler, ReactElement, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {stopEvent} from "@topsoft4u/utils";
import {SelectClearButton} from "./SelectClearButton";
import {SelectOptionList, SelectOptionRendererType} from "./SelectOptionList";
import {SelectMultiItemList, SelectMultiItemListProps} from "./SelectMultiItemList";
import {SelectStyle} from "./Select.style";

// region Types
export type Option = {
  [key: string]: any;
  isCreatePH?: boolean;
};

export type Options = Option[];
export type ValueType = Options | Option | undefined;

export type TS4USelectPropOnChangeHandler<T = ValueType> = (selected: T) => void;
export type TS4USelectOptionRendererType = (option: Option) => ReactElement | null | false;

export type TS4USelectMultipleProps = {
  multiple?: boolean;
  selectedOptionRenderer?: TS4USelectOptionRendererType;
  hideSelected?: boolean;
};

export type TS4USelectAsyncProps = {
  async?: boolean;
  isLoading?: boolean;
  fetch?: (phrase?: string) => Promise<Options | undefined>;
  manualFiltering?: boolean;
};

export type TS4USelectCreatableProps = {
  creatable?: boolean;
  creatableIsValidOption?: (inputValue: string) => boolean;
  txtCreatableAdd?: (inputValue: string) => string;
};

export type TS4USelectClassNameProps = {
  cnContainer?: string;
  cnInputContainer?: string;
  cnInput?: string;
  cnClearButton?: string;
  cnArrowZone?: string;
  cnArrow?: string;
  cnOptions?: string;
  cnOptionItem?: string;
  cnMultiOptions?: string;
  cnMultiOptionItem?: string;
};

export type TS4USelectProps = {
  onChange: TS4USelectPropOnChangeHandler
  value?: ValueType;
  options?: Options;
  defaultInputValue?: string | null;
  labelKey?: string;
  valueKey?: string;
  filterMethod?: "startsWith" | "endsWith" | "includes";
  showSelectArrow?: boolean;
  optionRenderer?: SelectOptionRendererType;
  closeOnSelect?: boolean;
  placeholder?: string;
  required?: boolean;

  // region Texts
  txtOptionsLoading?: string;
  txtOptionsEmpty?: string;
  txtOptionsNoResult?: (inputValue: string) => string;
  // endregion

  // Helpers
  helperSetInputValue?: (phrase: string) => void;

  allowUnboundValue?: boolean;
} & TS4USelectAsyncProps & TS4USelectCreatableProps & TS4USelectMultipleProps & TS4USelectClassNameProps;
// endregion

const defIsValidNewOption: TS4USelectCreatableProps["creatableIsValidOption"] = (inputValue) => {
  return !!inputValue;
};

const defTxtCreatableAdd: TS4USelectProps["txtCreatableAdd"] = (inputValue) => {
  return `Add option: ${inputValue}`;
};

const defaultOptions = [];
export const Select = (
  {
    defaultInputValue, helperSetInputValue,
    placeholder, required,
    multiple,
    closeOnSelect,
    options = defaultOptions,
    filterMethod = "includes",
    onChange, value,
    labelKey = "label", valueKey = "value",
    manualFiltering = true,
    async, fetch,
    showSelectArrow,
    optionRenderer,
    hideSelected = true,
    // Class names
    cnContainer,
    cnInputContainer, cnInput,
    cnClearButton,
    cnArrowZone, cnArrow,
    cnOptions, cnOptionItem,
    cnMultiOptions, cnMultiOptionItem,
    // Texts
    txtOptionsLoading,
    txtOptionsEmpty,
    txtOptionsNoResult,
    // Creatable
    creatable,
    creatableIsValidOption = defIsValidNewOption,
    txtCreatableAdd = defTxtCreatableAdd,
  }: TS4USelectProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const [asyncOptions, setAsyncOptions] = useState<Options>([]);
  const [creatableOptions, setCreatableOptions] = useState<Options>([]);

  const [inputValue, setInputValue] = useState<string>(defaultInputValue || "");
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!value || Array.isArray(value)) {
      setInputValue("");
      return;
    }

    setInputValue(value ? `${value[labelKey]}` : "");
  }, [labelKey, value]);

  useEffect(() => {
    if (defaultInputValue)
      setInputValue(defaultInputValue || "");
  }, [defaultInputValue]);

  const valueArray: Options = useMemo(() => {
    if (!value)
      return [];

    // Simplification
    if (Array.isArray(value))
      return value;

    return [value];
  }, [value]);

  const removeItem: SelectMultiItemListProps["onRemoveItem"] = useCallback((option) => {
    onChange(valueArray.filter(opt => opt[valueKey] !== option[valueKey]));
  }, [onChange, valueArray, valueKey]);

  const updateInputValue = useCallback((phrase = "") => {
    setInputValue(phrase);
    if (helperSetInputValue)
      helperSetInputValue(phrase);
  }, [helperSetInputValue]);

  // region Change events
  const setValue = useCallback((val: Option | undefined) => {
    if (closeOnSelect)
      inputRef.current?.blur();

    if (onChange)
      onChange(val);

    const newInputValue = val ? val[labelKey] : "";
    updateInputValue(newInputValue);
  }, [closeOnSelect, labelKey, onChange, updateInputValue]);

  const addValue: ((value: Option) => void) = useCallback((val: Option) => {
    setValue(valueArray.concat(val));
  }, [setValue, valueArray]);

  const removeValue = useCallback((val: Option) => {
    setValue(valueArray.filter(i => i[valueKey] !== val[valueKey]));
  }, [setValue, valueArray, valueKey]);

  const popValue = useCallback(() => {
    if (!multiple)
      return false;

    if (inputValue?.length > 0)
      return false;

    removeItem(valueArray[valueArray.length - 1]);
    return true;
  }, [inputValue, multiple, removeItem, valueArray]);

  const onOptionSelectSingle = useCallback((val: Option) => {
    setValue(val);
  }, [setValue]);

  const onOptionSelectMultiple = useCallback((val: Option) => {
    const newValues = [...valueArray];
    if (newValues.some(x => x[valueKey] === val[valueKey]))
      removeValue(val);
    else
      addValue(val);
  }, [addValue, removeValue, valueArray, valueKey]);

  const createNewOption = useCallback((val: Option) => {
    if (!creatable)
      return;

    // Invalid
    if (!creatableIsValidOption(inputValue))
      return;

    // Already exists
    if ([...options, creatableOptions].find(x => x[valueKey] === inputValue))
      return;

    delete val.isCreatePH;
    setCreatableOptions(prev => [...prev, val]);
  }, [creatable, creatableIsValidOption, creatableOptions, inputValue, options, valueKey]);

  const selectValue = useCallback((val: Option) => {
    if (!val)
      return;

    createNewOption(val);

    if (multiple)
      onOptionSelectMultiple(val);
    else
      onOptionSelectSingle(val);

  }, [createNewOption, multiple, onOptionSelectMultiple, onOptionSelectSingle]);
  // endregion

  // region Options fetching
  const fetchOptions = useCallback((phrase?: string) => {
    if (!async || !fetch)
      return;

    setIsLoading(true);
    const promise = fetch(phrase !== undefined ? phrase : inputValue);
    if (promise) {
      promise
        .then(data => setAsyncOptions(data || []))
        .finally(() => setIsLoading(false));
    }
  }, [async, fetch, inputValue]);

  const createPlaceholderOption: Option = useMemo(() => {
    return {isCreatePH: true, [labelKey]: inputValue, [valueKey]: inputValue};
  }, [inputValue, labelKey, valueKey]);

  const optionsFiltered: Options = useMemo(() => {
    let opts = (async ? asyncOptions : options) || [];

    if (creatable) {
      opts = [...opts, ...creatableOptions];
      if (inputValue && creatableIsValidOption(inputValue) && !opts.find(x => x[labelKey] === inputValue)) {
        opts = [createPlaceholderOption, ...opts];
      }
    }

    if (multiple && hideSelected)
      opts = opts.filter(x => !valueArray.some(v => v[valueKey] === x[valueKey]));

    if (async && manualFiltering)
      return opts;

    if (!inputValue)
      return opts;

    return opts.filter(x => `${x[labelKey]}`[filterMethod](inputValue));
  }, [async, asyncOptions, creatable, creatableIsValidOption, creatableOptions, createPlaceholderOption, filterMethod, hideSelected, inputValue, labelKey, manualFiltering, multiple, options, valueArray, valueKey]);
  // endregion

  // region Input handlers
  const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const phrase = e.target.value;
    updateInputValue(phrase);
    fetchOptions(phrase);
  }, [fetchOptions, updateInputValue]);

  const onInputFocus: FocusEventHandler = useCallback(() => {
    setIsFocused(true);
    fetchOptions();
  }, [fetchOptions]);

  const onInputBlur: FocusEventHandler = useCallback(() => {
    setIsFocused(false);
    setFocusedIndex(0);
  }, []);

  const clearInput = useCallback(() => {
    setValue(undefined);
    setAsyncOptions([]);
  }, [setValue]);

  const onKeyDown: KeyboardEventHandler = useCallback((e) => {
    if (!optionsFiltered)
      return;

    let doStopEvent = true;
    switch (e.key) {
      case "Backspace":
        if (!popValue())
          doStopEvent = false;
        break;
      case "ArrowUp":
        setFocusedIndex(prev => {
          return Math.max(prev - 1, 0);
        });
        break;
      case "ArrowDown":
        setFocusedIndex(prev => {
          return Math.min(prev + 1, Math.max(optionsFiltered.length - 1, 0));
        });
        break;
      // case "Tab":
      case "Enter":
        if (optionsFiltered[focusedIndex]) {
          updateInputValue(`${optionsFiltered[focusedIndex][labelKey]}`);
          selectValue(optionsFiltered[focusedIndex]);
        }
        break;
      default:
        return;
    }

    if (doStopEvent)
      stopEvent(e);
  }, [optionsFiltered, popValue, updateInputValue, focusedIndex, labelKey, selectValue]);
  // endregion

  const onOptionFocus = useCallback((index: number/* , option: Option */) => {
    setFocusedIndex(index);
  }, []);

  const input = useMemo(() => {
    return <SelectStyle.Input className={cnInput} ref={inputRef} type="text" value={inputValue} onChange={onInputChange} onKeyDown={onKeyDown} onFocus={onInputFocus}
      onBlur={onInputBlur} placeholder={placeholder} required={required} />;
  }, [cnInput, inputValue, onInputBlur, onInputChange, onInputFocus, onKeyDown, placeholder, required]);

  return <SelectStyle.Container className={cnContainer}>
    <SelectStyle.InputContainer className={cnInputContainer}>

      {multiple
        ? <SelectMultiItemList
          className={cnMultiOptions}
          optionClassName={cnMultiOptionItem}
          labelKey={labelKey}
          valueKey={valueKey}
          onRemoveItem={removeItem}
          options={options}
          valueArray={valueArray}
        >
          {input}
        </SelectMultiItemList>
        : input
      }

      <SelectClearButton className={cnClearButton} clear={clearInput} />
      {showSelectArrow && <SelectStyle.ArrowContainer className={cnArrowZone}>
        <SelectStyle.Arrow className={cnArrow} />
      </SelectStyle.ArrowContainer>}
    </SelectStyle.InputContainer>
    {isFocused && <SelectOptionList
      className={cnOptions} optionClassName={cnOptionItem}
      focusedIndex={focusedIndex}
      options={optionsFiltered}
      valueArray={valueArray}
      loading={isLoading}
      onFocus={onOptionFocus}
      onSelect={selectValue}

      {...{
        labelKey, valueKey, optionRenderer, inputValue,
        // Texts
        txtOptionsEmpty, txtOptionsLoading, txtOptionsNoResult,
        // Creatable
        txtCreatableAdd,
      }}
    />}
  </SelectStyle.Container>;
};
