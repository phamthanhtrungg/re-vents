import React, { useState } from "react";
import { Button, Grid } from "semantic-ui-react";
import EventForm from "../event-form";
import EventList from "../event-list/event-list";
import { v4 } from "uuid";

const events = [
  {
    id: "1",
    title: "Trip to Tower of London",
    date: "2018-03-27",
    category: "culture",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "London, UK",
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: "Bob",
    hostPhotoURL: "https://randomuser.me/api/portraits/men/20.jpg",
    attendees: [
      {
        id: "a",
        name: "Bob",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg",
      },
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg",
      },
    ],
  },
  {
    id: "2",
    title: "Trip to Punch and Judy Pub",
    date: "2018-03-28",
    category: "drinks",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "London, UK",
    venue: "Punch & Judy, Henrietta Street, London, UK",
    hostedBy: "Tom",
    hostPhotoURL: "https://randomuser.me/api/portraits/men/22.jpg",
    attendees: [
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg",
      },
      {
        id: "a",
        name: "Bob",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg",
      },
    ],
  },
];

function EventDashboard() {
  const [localEvents, setLocalEvents] = useState(events);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleCreateEvent = (newEvent) => {
    newEvent.id = v4();
    newEvent.PhotoURL = "https://randomuser.me/api/portraits/men/20.jpg";
    const updatedEvents = [...localEvents, newEvent];
    setSelectedEvent(null);
    setLocalEvents(updatedEvents);
    setIsOpen(false);
  };

  const handleDeleteEvent = (eventId) => {
    setLocalEvents(localEvents.filter((event) => event.id !== eventId));
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
    setLocalEvents(
      localEvents.map((event) => {
        if (event.id === updatedEvent.id) {
          return Object.assign(event, updatedEvent);
        }
        return event;
      })
    );
    setIsOpen(false);
    setSelectedEvent(null);
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList
          events={localEvents}
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
