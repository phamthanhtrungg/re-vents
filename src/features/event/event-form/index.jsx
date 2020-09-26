/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Form, Segment, Grid, Header } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import { cancelToggle, createEvent, updateEvent } from "../event.action";
import TextInput from "../../../app/common/form/text-input";
import TextArea from "../../../app/common/form/text-area";
import SelectInput from "../../../app/common/form/select-input";
import DateInputPicker from "../../../app/common/form/date-picker";
import PlaceInput from "../../../app/common/form/place-input";
import LoadingComponent from "../../../app/layout/loading";
import { useFirestore } from "react-redux-firebase";

const category = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" },
];

function EventForm({ match, history }) {
  const eventId = match.params.id;
  const [mounted, setMounted] = useState(false);
  const [event, setEvent] = useState({});
  const dispatch = useDispatch();
  const firestore = useFirestore();
  const { register, handleSubmit, errors, setValue, trigger, watch } = useForm({
    defaultValues: { ...event },
  });

  useEffect(() => {
    register(
      { name: "category" },
      { required: { message: "Please choose a category", value: true } }
    );
    register(
      { name: "date" },
      { required: { message: "Please choose a valid date", value: true } }
    );
    register(
      { name: "venue" },
      { required: { message: "Please chose a valid venue", value: "true" } }
    );
    register({ name: "lat" }, { required: true });
    register({ name: "lng" }, { required: true });
    async function findEvent() {
      let event = await firestore.get(`events/${eventId}`);
      if (event.exists) {
        setEvent(event.data());
      }
    }
    findEvent();
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isEmpty(event) && mounted) {
      setValue("lat", event.venueLatLng.lat);
      setValue("lng", event.venueLatLng.lng);
      setValue("title", event.title);
      setValue("category", event.category);
      setValue("description", event.description);
      setValue("venue", event.venue);
      setValue("date", event.date.toDate());
      setValue("id", eventId);
    }
  }, [event]);

  const onSubmitForm = (data) => {
    if (!isEmpty(data.id)) {
      dispatch(updateEvent(data));
      history.goBack();
    } else {
      dispatch(createEvent(data));
      history.push("/events");
    }
  };

  return isEmpty(event) && !mounted ? (
    <LoadingComponent />
  ) : (
    <Grid>
      <Grid.Column width={10}>
        <Segment>
          <Form onSubmit={handleSubmit(onSubmitForm)}>
            <Header sub color="teal">
              Event Details
            </Header>
            <Form.Field>
              <input ref={register} name="id" hidden />
            </Form.Field>
            <TextInput
              name="title"
              type="text"
              placeholder="Give your event a title"
              register={register({
                required: { message: "Please enter event title", value: true },
              })}
              error={errors?.title?.message || ""}
            />
            <SelectInput
              options={category}
              value={watch("category")}
              name="category"
              placeholder="What's your event about?"
              error={errors?.category?.message || ""}
              setValue={setValue}
              triggerValidation={trigger}
            />

            <TextArea
              rows={6}
              name="description"
              type="description"
              placeholder="Tell us about your event"
              register={register({
                required: { message: "required", value: true },
              })}
              error={errors?.title?.message || ""}
            />

            <Header sub color="teal" style={{ marginBottom: "1rem" }}>
              Event Location Details
            </Header>

            <PlaceInput
              name="venue"
              placeholder="Venue event is taking place"
              setValue={setValue}
              error={errors?.venue?.message}
              value={watch("venue") || ""}
            />

            <DateInputPicker
              value={watch("date")}
              name="date"
              placeholder="Date and Time of event"
              error={errors?.date?.message || ""}
              setValue={setValue}
              triggerValidation={trigger}
              showTimeSelect={true}
              showYearDropDown={true}
              showMonthDropdown={true}
            />
            <Button positive type="submit">
              Submit
            </Button>
            <Button
              style={{ marginLeft: "1rem" }}
              onClick={() => {
                history.goBack();
              }}
              type="button"
            >
              Cancel
            </Button>
            {eventId && (
              <Button
                onClick={() => {
                  dispatch(cancelToggle(!event.cancelled, eventId));
                  setEvent((state) => ({
                    ...state,
                    cancelled: !state.cancelled,
                  }));
                }}
                floated="right"
                type="button"
                color={event.cancelled ? "green" : "red"}
              >
                {event.cancelled ? "Reactivate event" : "Cancel event"}
              </Button>
            )}
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}

export default EventForm;
