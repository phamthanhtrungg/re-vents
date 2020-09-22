/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Form, Label } from "semantic-ui-react";
import { isEmpty } from "lodash";
import Autosuggest from "react-autosuggest";
import city from "./city.json";

const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : city.filter((city) => city.city.toLowerCase().includes(inputValue));
};

function PlaceInput({
  name,
  value = "",
  register,
  setValue,
  error,
  placeholder = "",
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [localValue, setLocalValue] = useState(value);

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const renderSuggestionsContainer = ({ containerProps, children, query }) => {
    return (
      <div
        {...containerProps}
        className="suggestion-container"
        style={{ border: suggestions.length === 0 ? "none" : "1px solid #ccc" }}
      >
        {children}
      </div>
    );
  };

  return (
    <Form.Field error={!isEmpty(error)}>
      <Autosuggest
        suggestions={suggestions}
        renderSuggestionsContainer={renderSuggestionsContainer}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={(suggestion) => suggestion.city}
        renderSuggestion={(suggestion) => (
          <div className="suggestion-item">
            <span>{suggestion.city}</span>
          </div>
        )}
        inputProps={{
          ref: register,
          name,
          value: localValue,
          placeholder,
          onChange: (e, { newValue }) => {
            setLocalValue(newValue);
          },
        }}
      />
    </Form.Field>
  );
}

export default PlaceInput;
