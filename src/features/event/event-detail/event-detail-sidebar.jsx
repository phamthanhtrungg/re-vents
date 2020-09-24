import React, { Fragment } from "react";
import { Segment, Label, Item } from "semantic-ui-react";

function EventDetailSideBar({ attendees }) {
  return (
    <Fragment>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        {attendees && Object.keys(attendees).length}{" "}
        {attendees && Object.keys(attendees).length === 1 ? "Person" : "People"}{" "}
        going
      </Segment>
      <Segment attached>
        <Item.Group divided>
          {attendees &&
            Object.keys(attendees).map((attendeeKey) => (
              <Item key={attendeeKey} style={{ position: "relative" }}>
                <Label
                  style={{ position: "absolute" }}
                  color="orange"
                  ribbon="right"
                >
                  Host
                </Label>
                <Item.Image
                  size="tiny"
                  src={attendees[attendeeKey].photoURL}
                  alt=""
                />
                <Item.Content verticalAlign="middle">
                  <Item.Header as="h3">
                    {attendees[attendeeKey].name}
                  </Item.Header>
                </Item.Content>
              </Item>
            ))}
        </Item.Group>
      </Segment>
    </Fragment>
  );
}

export default EventDetailSideBar;
