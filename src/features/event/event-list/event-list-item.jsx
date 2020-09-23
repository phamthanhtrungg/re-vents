import React from "react";
import { Button, Icon, Item, List, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import EventListAttendee from "./event-list-attendee";
import moment from "moment";

function EventListItem({ event, handleDeleteEvent }) {
  const {
    title,
    date,
    description,
    venue,
    hostedBy,
    hostPhotoURL,
    attendees,
  } = event;
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src={hostPhotoURL} alt="" />
            <Item.Content>
              <Item.Header as="a">{title}</Item.Header>
              <Item.Description>
                Hosted by <a href="/">{hostedBy}</a>
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {moment(date.toDate()).fromNow()} |
          <Icon name="marker" /> {venue}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {attendees &&
            Object.values(attendees).map((attendee, id) => (
              <EventListAttendee key={attendee.name + id} {...attendee} />
            ))}
        </List>
      </Segment>
      <Segment clearing>
        <span>{description}</span>
        <Button
          color="red"
          floated="right"
          onClick={() => handleDeleteEvent(event.id)}
        >
          Delete
        </Button>
        <Button
          as={Link}
          to={`/events/${event.id}`}
          color="teal"
          floated="right"
        >
          View
        </Button>
      </Segment>
    </Segment.Group>
  );
}

export default EventListItem;
