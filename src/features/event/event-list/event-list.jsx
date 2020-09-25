import React from "react";
import InfiniteScroll from "react-infinite-scroller";

import EventListItem from "./event-list-item";

function EventList({
  events,
  handleDeleteEvent,
  getMoreEvents,
  loading,
  moreEvents,
}) {
  return (
    <div>
      <h1>Event List</h1>
      <div>
        {events.length !== 0 && (
          <InfiniteScroll
            pageStart={0}
            loadMore={getMoreEvents}
            hasMore={!loading && moreEvents}
            initialLoad={false}
          >
            {events.map((event, i) => {
              return (
                <EventListItem
                  key={event.id}
                  event={event}
                  handleDeleteEvent={handleDeleteEvent}
                />
              );
            })}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
}

export default EventList;
