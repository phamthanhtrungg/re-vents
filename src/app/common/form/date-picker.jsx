import React from "react";
import { isEmpty } from "lodash";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormField, Label } from "semantic-ui-react";

function DateInputPicker({
  placeholder,
  error,
  width,
  setValue,
  triggerValidation,
  name,
  value,
  ...rest
}) {
  return (
    <FormField error={!isEmpty(error)}>
      <DatePicker
        name={name}
        selected={value ? new Date(value) : null}
        onChange={async (date) => {
          setValue(name, date);
          triggerValidation(name);
        }}
        placeholderText={placeholder}
        dateFormat="dd/MM/yyyy HH:mm"
        timeFormat="HH:mm"
        showYearDropDown
        dropdownMode="select"
        {...rest}
      />
      {!isEmpty(error) && (
        <Label basic color="red" pointing>
          {error}
        </Label>
      )}
    </FormField>
  );
}

export default DateInputPicker;
