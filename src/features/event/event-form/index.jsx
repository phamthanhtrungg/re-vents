/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Form, Segment, Grid, Header } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import { v4 } from "uuid";
import { createEvent, updateEvent } from "../event.action";
import TextInput from "../../../app/common/form/text-input";
import TextArea from "../../../app/common/form/text-area";
import SelectInput from "../../../app/common/form/select-input";
import DateInputPicker from "../../../app/common/form/date-picker";
import PlaceInput from "../../../app/common/form/place-input";
import LoadingComponent from "../../../app/layout/loading";

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

  const events = useSelector((state) => state.events);
  const dispatch = useDispatch();

  const event = events.filter((event) => event.id === eventId)[0];

  const {
    register,
    handleSubmit,
    errors,
    setValue,
    trigger,
    watch,
    reset,
  } = useForm({
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

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isEmpty(event) && mounted) {
      reset({
        ...event,
        lat: event.venueLatLng.lat,
        lng: event.venueLatLng.lng,
      });
      setValue("lat", event.venueLatLng.lat);
      setValue("lng", event.venueLatLng.lng);
    }
  }, [event]);

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
              type="text"
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
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}

export default EventForm;
