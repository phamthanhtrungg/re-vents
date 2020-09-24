import React from "react";
import { Form, Label } from "semantic-ui-react";
import { isEmpty } from "lodash";

const TextArea = ({
  error,
  width,
  register,
  placeholder = "",
  name,
  ...otherProps
}) => {
  return (
    <Form.Field error={!isEmpty(error)} width={width}>
      <textarea
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

export default TextArea;
