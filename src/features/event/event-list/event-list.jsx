import React from "react";
import EventListItem from "./event-list-item";

function EventList({ events }) {
  return (
    <div>
      <h1>Event List</h1>
      {events.map((event) => (
        <EventListItem key={event.id} {...event} />
      ))}
    </div>
  );
}

export default EventList;
