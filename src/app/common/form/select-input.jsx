import React from "react";
import { Form } from "semantic-ui-react";
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
    <Form.Select
      value={value}
      error={!isEmpty(error)}
      name={name}
      placeholder={placeholder}
      onChange={async (e, { name, value }) => {
        setValue(name, value);
        await triggerValidation(name);
      }}
      options={options}
    />
  );
}

export default SelectInput;
