import {USDefVal} from "@topsoft4u/utils";
import {useCallback, useMemo, useState} from "react";
import {TS4USelectPropOnChangeHandler, Options} from "./Select";
import {CustomSelectHookProps} from "./useSelect";

export const useMultiSelect = (defaultValue?: USDefVal<Options>)
  : [Options, (v: Options) => void, CustomSelectHookProps] => {
  const [value, setValue] = useState<Options>(defaultValue || []);

  const onChange: TS4USelectPropOnChangeHandler = useCallback((v) => {
    if (!Array.isArray(v))
      return;

    setValue(v);
  }, []);

  const selectProps: CustomSelectHookProps = useMemo(() => {
    return {
      value,
      onChange
    };
  }, [onChange, value]);

  return [value, setValue, selectProps];
};
