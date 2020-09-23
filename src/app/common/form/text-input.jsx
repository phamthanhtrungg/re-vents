import React from "react";
import { Form, Label } from "semantic-ui-react";
import { isEmpty } from "lodash";

const TextInput = ({
  error,
  width,
  register,
  placeholder = "",
  type = "text",
  name,
  fieldProps,
  ...otherProps
}) => {
  return (
    <Form.Field error={!isEmpty(error)} width={width} {...fieldProps}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        ref={register}
        {...otherProps}
      />
      {!isEmpty(error) && (
        <Label basic color="red" pointing>
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default TextInput;
