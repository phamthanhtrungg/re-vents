import React from "react";
import { Button, Icon, Item, List, Segment } from "semantic-ui-react";
import EventListAttendee from "./event-list-attendee";
import moment from "moment";

function EventListItem({ event, onEventOpen, handleDeleteEvent }) {
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
            <Item.Image size="tiny" circular src={hostPhotoURL} />
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
          <Icon name="clock" /> {moment(date).fromNow()} |
          <Icon name="marker" /> {venue}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {attendees &&
            attendees.map((attendee) => (
              <EventListAttendee key={attendee.id} {...attendee} />
            ))}
        </List>
      </Segment>
      <Segment clearing>
        <span>{description}</span>
        <Button
          as="a"
          color="red"
          floated="right"
          onClick={() => handleDeleteEvent(event.id)}
        >
          Delete
        </Button>
        <Button
          as="a"
          color="teal"
          floated="right"
          onClick={() => onEventOpen(event)}
        >
          View
        </Button>
      </Segment>
    </Segment.Group>
  );
}

export default EventListItem;
