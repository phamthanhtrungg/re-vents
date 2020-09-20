import React from "react";
import { Button, Icon, Item, List, Segment } from "semantic-ui-react";
import EventListAttendee from "./event-list-attendee";

function EventListItem() {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              size="tiny"
              circular
              src="https://randomuser.me/api/portraits/lego/3.jpg"
            />
            <Item.Content>
              <Item.Header as="a">Event Title</Item.Header>
              <Item.Description>
                Hosted by <a href="/">hosted by</a>
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> date |
          <Icon name="marker" /> time
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          <EventListAttendee />
          <EventListAttendee />
          <EventListAttendee />
        </List>
      </Segment>
      <Segment clearing>
        <span>Description will go here</span>
        <Button as="a" href="#" color="teal" floated="right">
          View
        </Button>
      </Segment>
    </Segment.Group>
  );
}

export default EventListItem;
