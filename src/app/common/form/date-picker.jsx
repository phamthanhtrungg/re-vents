import React from "react";
import { isEmpty } from "lodash";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { FormField } from "semantic-ui-react";

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
  console.log(moment(value).format());
  return (
    <FormField error={!isEmpty(error)}>
      <DatePicker
        name={name}
        selected={value ? new Date(value) : null}
        onChange={async (date) => {
          console.log(date);
          setValue(name, date);
          await triggerValidation(name);
        }}
        placeholderText={placeholder}
        dateFormat="dd/MM/yyyy HH:mm"
        showTimeSelect
        {...rest}
      />
    </FormField>
  );
}

export default DateInputPicker;
