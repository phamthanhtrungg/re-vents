import React from "react";
import { Form, Label } from "semantic-ui-react";
import { isEmpty } from "lodash";

function SelectInput({
  value,
  name,
  placeholder,
  error,
  triggerValidation,
  setValue,
  options,
}) {
  return (
    <Form.Field error={!isEmpty(error)}>
      <Form.Select
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={async (e, { name, value }) => {
          setValue(name, value);
          await triggerValidation(name);
        }}
        options={options}
      />
      {!isEmpty(error) && (
        <Label basic color="red" pointing>
          {error}
        </Label>
      )}
    </Form.Field>
  );
}

export default SelectInput;
