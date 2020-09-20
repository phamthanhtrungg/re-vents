import React from "react";
import { Container } from "semantic-ui-react";
import EventDashboard from "../../features/event/event-dashboard";
import NavBar from "../../features/nav/nav-bar";

function App() {
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "5rem" }}>
        <EventDashboard />
      </Container>
    </>
  );
}

export default App;
