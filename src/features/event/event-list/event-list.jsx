import React from "react";
import EventListItem from "./event-list-item";

function EventList({ events, handleDeleteEvent }) {
  return (
    <div>
      <h1>Event List</h1>
      {events.map((event, i) => {
        return (
          event && (
            <EventListItem
              key={event.id}
              event={event}
              handleDeleteEvent={handleDeleteEvent}
            />
          )
        );
      })}
    </div>
  );
}

export default EventList;
