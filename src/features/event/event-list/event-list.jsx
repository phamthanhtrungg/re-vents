import React from "react";
import EventListItem from "./event-list-item";

function EventList({ events, handleDeleteEvent }) {
  return (
    <div>
      <h1>Event List</h1>
      {events.length &&
        events.map((event, i) => {
          return (
            event && (
              <EventListItem
                key={event.id + i}
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
