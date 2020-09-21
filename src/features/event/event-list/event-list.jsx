import React from "react";
import EventListItem from "./event-list-item";

function EventList({ events, onEventOpen, handleDeleteEvent }) {
  return (
    <div>
      <h1>Event List</h1>
      {events.map((event) => (
        <EventListItem
          key={event.id}
          event={event}
          onEventOpen={onEventOpen}
          handleDeleteEvent={handleDeleteEvent}
        />
      ))}
    </div>
  );
}

export default EventList;
