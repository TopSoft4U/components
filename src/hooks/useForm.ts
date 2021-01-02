import React from "react";

export type FormValue = any;
export type FormDictionary = Record<string, FormValue>;

type UseForm = <T extends object = any>(initialState?: FormDictionary) => {
  form: FormDictionary;
  inputProps: (name: keyof T) => {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: keyof T | string;
    checked?: boolean;
    value?: FormValue
  };
  resetForm: () => void;
  handleFormChange: (key: string, value: FormValue) => void;
  setForm: (value: (((prevState: FormDictionary) => FormDictionary) | FormDictionary)) => void;
  handleFormChangeMulti: (obj: FormDictionary) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const useForm: UseForm = <T>(initialState = {}) => {
  const [form, setForm] = React.useState<any>(initialState);

  const handleFormChange = React.useCallback((key: string, value: FormValue) => {
    setForm((prevForm: object) => ({...prevForm, [key]: value}));
  }, []);

  const handleFormChangeMulti = React.useCallback((obj: FormDictionary) => {
    setForm((prevForm: object) => ({...prevForm, ...obj}));
  }, []);

  const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name;
    if (!key)
      throw new Error("Attribute 'name' is not defined!");

    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    handleFormChange(key, value);
  }, [handleFormChange]);

  const resetForm = () => setForm(initialState);

  const inputProps = (name: keyof T) => {
    const valProps: { checked?: boolean, value?: FormValue } = {checked: undefined, value: undefined};
    if (typeof form[name] === "boolean")
      valProps.checked = (form[name] as boolean) || false;
    else
      valProps.value = form[name] || "";

    return {name, onChange: handleInputChange, ...valProps};
  };

  return {
    form,
    handleFormChange,
    handleFormChangeMulti,
    handleInputChange,
    setForm,
    resetForm,
    inputProps,
  };
};

