import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";

function EventForm({ handleCancel }) {
  return (
    <Segment>
      <Form>
        <Form.Field>
          <label htmlFor="">Event title</label>
          <input type="text" placeholder="First Name" />
        </Form.Field>
        <Form.Field>
          <label htmlFor="">Event Date</label>
          <input type="date" />
        </Form.Field>
        <Form.Field>
          <label htmlFor="">City</label>
          <input type="text" placeholder="City event is taking place" />
        </Form.Field>
        <Form.Field>
          <label htmlFor="">Venue</label>
          <input type="text" placeholder="Enter the Venue of the event" />
        </Form.Field>
        <Form.Field>
          <label htmlFor="">Hosted By</label>
          <input
            type="text"
            placeholder="Enter the name of the person hosting"
          />
        </Form.Field>
        <Button positive type="submit">
          Submit
        </Button>
        <Button style={{ marginLeft: "1rem" }} onClick={handleCancel}>
          Cancel
        </Button>
      </Form>
    </Segment>
  );
}

export default EventForm;
