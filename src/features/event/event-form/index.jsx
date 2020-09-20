import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useForm } from "react-hook-form";

function EventForm({ handleCancel }) {
  const { register, handleSubmit, errors } = useForm();
  const onSubmitForm = (data) => {
    console.log(data);
  };
  console.log(errors);
  return (
    <Segment>
      <Form onSubmit={handleSubmit(onSubmitForm)}>
        <Form.Field>
          <label htmlFor="">Event title</label>
          <input
            type="text"
            placeholder="First Name"
            ref={register({ required: { message: "required", value: true } })}
            name="eventTitle"
          />
          {errors.eventTitle && (
            <div className="error field">{errors.eventTitle.message}</div>
          )}
        </Form.Field>
        <Form.Field>
          <label htmlFor="">Event Date</label>
          <input
            type="date"
            ref={register({ required: { message: "required", value: true } })}
            name="date"
          />
          {errors.date && (
            <div className="error field">{errors.date.message}</div>
          )}
        </Form.Field>
        <Form.Field>
          <label htmlFor="">City</label>
          <input
            type="text"
            placeholder="City event is taking place"
            ref={register({ required: { message: "required", value: true } })}
            name="city"
          />
          {errors.city && (
            <div className="error field">{errors.city.message}</div>
          )}
        </Form.Field>
        <Form.Field>
          <label htmlFor="">Venue</label>
          <input
            type="text"
            placeholder="Enter the Venue of the event"
            ref={register({ required: { message: "required", value: true } })}
            name="venue"
          />

          {errors.venue && (
            <div className="error field">{errors.venue.message}</div>
          )}
        </Form.Field>
        <Form.Field>
          <label htmlFor="">Hosted By</label>
          <input
            type="text"
            placeholder="Enter the name of the person hosting"
            ref={register({ required: { message: "required", value: true } })}
            name="hostedBy"
          />
          {errors.hostedBy && (
            <div className="error field">{errors.hostedBy.message}</div>
          )}
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
