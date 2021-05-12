import {useMemo, useState} from "react";
import {TS4USelectProps, Option} from "./Select";

export type CustomSelectHookProps = Pick<TS4USelectProps, "value" | "onChange" | "defaultInputValue" | "helperSetInputValue">;
export const useCustomSelect = (defaultInputValue?: string | null)
  : [Option | undefined, CustomSelectHookProps, string | null | undefined] => {
  const [value, setValue] = useState<Option>();
  // Stores and updates the input value from control
  const [inputValue, helperSetInputValue] = useState(defaultInputValue || "");

  const selectProps: CustomSelectHookProps = useMemo(() => {
    return {
      defaultInputValue,
      value,
      onChange: setValue,
      helperSetInputValue
    };
  }, [defaultInputValue, value]);

  return [value, selectProps, inputValue];
};
