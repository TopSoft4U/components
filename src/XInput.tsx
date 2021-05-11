import React from "react";
import Form from "react-bootstrap/Form";
import {FormControlProps} from "react-bootstrap";
import {XInputSC} from "./XInput.style";
import {TS4UComponent} from "./types/TS4UComponent";

let lastId = 0;
const uniqId = (prefix = "id") => {
  lastId++;
  return `${prefix}${lastId}`;
};

export const XInput: TS4UComponent<XInputProps> = ({label, required, error, success, help, value, ...props}) => {
  const [id] = React.useState(() => uniqId("label"));
  const inputProps: FormControlProps = {
    value: value || "",
    isValid: undefined,
    isInvalid: undefined
  };

  if (error) {
    inputProps.isValid = false;
    inputProps.isInvalid = true;
  } else if (success) {
    inputProps.isValid = true;
    inputProps.isInvalid = false;
  }

  return <Form.Group>
    <Form.Label htmlFor={id}>
      {label}
      {required && <XInputSC.LabelRequired className="required">*</XInputSC.LabelRequired>}
    </Form.Label>
    <Form.Control {...props} {...inputProps} id={id} required={required} />
    {error && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
    {success && <Form.Control.Feedback type="valid">{success}</Form.Control.Feedback>}
    {help && <Form.Text>{help}</Form.Text>}
  </Form.Group>;
};

type XInputProps = FormControlProps & {
  label: string;
  required?: boolean;
  error?: string;
  success?: string;
  help?: string;
  rows?: number;
}
