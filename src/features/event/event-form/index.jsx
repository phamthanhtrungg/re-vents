import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import { v4 } from "uuid";
import { createEvent, updateEvent } from "../event.action";

function EventForm({ match, history }) {
  const eventId = match.params.id;
  const events = useSelector((state) => state.events);
  const dispatch = useDispatch();
  const event = events.filter((event) => event.id === eventId)[0];

  const { register, handleSubmit, errors } = useForm({
    defaultValues: { ...event },
  });

  const onSubmitForm = (data) => {
    if (!isEmpty(data.id)) {
      dispatch(updateEvent(data));
      history.goBack();
    } else {
      dispatch(
        createEvent({
          ...data,
          id: v4(),
          hostPhotoURL: process.env.PUBLIC_URL + "/assets/user.png",
        })
      );
      history.push("/events");
    }
  };

  return (
    <Segment>
      <Form onSubmit={handleSubmit(onSubmitForm)}>
        <Form.Field>
          <input ref={register} name="id" hidden />
        </Form.Field>
        <Form.Field>
          <label htmlFor="">Event title</label>
          <input
            type="text"
            placeholder="First Name"
            ref={register({ required: { message: "required", value: true } })}
            name="title"
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
        <Button
          style={{ marginLeft: "1rem" }}
          onClick={() => {
            history.goBack();
          }}
        >
          Cancel
        </Button>
      </Form>
    </Segment>
  );
}

export default EventForm;
