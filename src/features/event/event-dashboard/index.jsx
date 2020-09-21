import React, { useState } from "react";
import { Button, Grid } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import EventForm from "../event-form";
import EventList from "../event-list/event-list";
import { v4 } from "uuid";
import { createEvent, deleteEvent, updateEvent } from "../event.action";

function EventDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = useSelector((state) => state.events);
  const dispatch = useDispatch();

  const handleCreateEvent = (newEvent) => {
    newEvent.id = v4();
    newEvent.PhotoURL = "https://randomuser.me/api/portraits/men/20.jpg";
    dispatch(createEvent(newEvent));
    setSelectedEvent(null);
    setIsOpen(false);
  };

  const handleDeleteEvent = (eventId) => {
    dispatch(deleteEvent(eventId));
  };

  const handleOpenEvent = (eventOpen) => {
    setSelectedEvent(eventOpen);
    setIsOpen(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
    setSelectedEvent(null);
  };

  const handleUpdateEvent = (updatedEvent) => {
    dispatch(updateEvent(updatedEvent));
    setIsOpen(false);
    setSelectedEvent(null);
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList
          events={events}
          onEventOpen={handleOpenEvent}
          handleDeleteEvent={handleDeleteEvent}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        <Button
          positive
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Create Event
        </Button>
        {isOpen && (
          <EventForm
            selectedEvent={selectedEvent}
            handleCancel={handleCancel}
            handleCreateEvent={handleCreateEvent}
            handleUpdateEvent={handleUpdateEvent}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}

export default EventDashboard;
