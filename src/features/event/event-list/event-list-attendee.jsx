import React from "react";
import { List, Image } from "semantic-ui-react";

function EventListAttendee() {
  return (
    <List.Item>
      <Image
        as="a"
        size="mini"
        circular
        src="https://randomuser.me/api/portraits/lego/3.jpg"
      />
    </List.Item>
  );
}

export default EventListAttendee;
