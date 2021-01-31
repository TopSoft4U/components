import React, {useState} from "react";
import {ModelFieldError} from "@towtow/client/src/api";

export type FormValue = any;
export type FormDictionary = Record<string, FormValue>;

type UseForm = <T extends object = any>(initialState?: FormDictionary) => {
  form: T;
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
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleError400: (errors: ModelFieldError[] | null | undefined) => void;
}

export const useForm: UseForm = <T>(initialState = {}) => {
  const [form, setForm] = React.useState<any>(initialState);
  const [errors, setErrors] = useState<ModelFieldError[]>([]);

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
    const valProps: { checked?: boolean, value?: FormValue, error?: string; } = {checked: undefined, value: undefined, error: undefined};
    if (typeof form[name] === "boolean")
      valProps.checked = (form[name] as boolean) || false;
    else
      valProps.value = form[name] || "";

    const error = errors.find(x => x.field === name);
    if (error)
      valProps.error = (error.messages || []).join(", ");

    return {name, onChange: handleInputChange, ...valProps};
  };

  const handleError400 = (fieldErrors: ModelFieldError[] | null | undefined) => {
    setErrors(fieldErrors || []);
  };

  return {
    form,
    handleFormChange,
    handleFormChangeMulti,
    handleInputChange,
    handleError400,
    setForm,
    resetForm,
    inputProps,
  };
};
