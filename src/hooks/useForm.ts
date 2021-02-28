import {ChangeEvent, useCallback, useState} from "react";

export type FormElement = HTMLInputElement & HTMLSelectElement & HTMLTextAreaElement;
export type FormValue = FormElement["value"] | FormElement["checked"] | undefined;
export type FormGenericType<T> = {[Key in keyof T]?: FormValue};

export const useForm = <T extends FormGenericType<T>>(initialState: T = {} as T) => {
  const [form, setForm] = useState<typeof initialState>(initialState);

  const handleFormChange = useCallback((key: keyof T, value: FormValue) => {
    setForm(prev => ({...prev, ...{[key]: value}}));
  }, []);

  const handleInputChange = useCallback((e: ChangeEvent<FormElement>) => {
    const key = e.target.name as keyof T;
    if (!key)
      throw new Error("Attribute 'name' is not defined!");

    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    handleFormChange(key, value);
  }, [handleFormChange]);

  const resetForm = () => setForm(initialState);

  const inputProps = (name: keyof T) => {
    const valProps: { checked?: boolean, value?: string} = {checked: undefined, value: undefined};
    if (typeof form[name] === "boolean")
      valProps.checked = (form[name] as boolean) || false;
    else
      valProps.value = (form[name] as string) || "";

    return {name, onChange: handleInputChange, ...valProps};
  };

  return {form, setForm, resetForm, inputProps};
};
