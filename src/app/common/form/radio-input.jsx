import { isEmpty } from "lodash";
import React from "react";
import { Form, Label } from "semantic-ui-react";

function RadioInput({ error, value, type, name, register, label }) {
  return (
    <Form.Field error={!isEmpty(error)}>
      <div className="ui radio">
        <input value={value} type={type} name={name} ref={register} />{" "}
        <label>{label}</label>
      </div>
      {!isEmpty(error) && (
        <Label basic color="red" pointing>
          {error}
        </Label>
      )}
    </Form.Field>
  );
}

export default RadioInput;
