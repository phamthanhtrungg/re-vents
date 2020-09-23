import React from "react";
import { Segment, Header } from "semantic-ui-react";

function EventActivity() {
  return (
    <div>
      <Header attached="top" content="Recent Activities" />
      <Segment attached="">
        <p>Recent activities</p>
      </Segment>
    </div>
  );
}

export default EventActivity;
