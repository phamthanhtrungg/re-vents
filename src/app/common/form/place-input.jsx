/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Form, Label } from "semantic-ui-react";
import { isEmpty } from "lodash";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-dom";
import Places from "./widget";
const searchClient = algoliasearch(
  "latency",
  "6be0576ff61c053d5f9a3225e2a90f76"
);

function PlaceInput({ error, setValue, placeholder, value }) {
  return (
    <Form.Field error={!isEmpty(error)}>
      <InstantSearch indexName="airports" searchClient={searchClient}>
        <Places
          key={value}
          value={value}
          defaultRefinement={{
            lat: 37.7793,
            lng: -122.419,
          }}
          handleChange={(e) => {
            const {
              value,
              latlng: { lat, lng },
            } = e.suggestion;
            setValue("venue", value);
            setValue("lat", lat);
            setValue("lng", lng);
          }}
          placeholder={placeholder}
        />
      </InstantSearch>
      {!isEmpty(error) && (
        <Label basic color="red" pointing>
          {error}
        </Label>
      )}
    </Form.Field>
  );
}

export default PlaceInput;
