import React from "react";
import { Link } from "react-router-dom";
import {
  Segment,
  Container,
  Header,
  Image,
  Button,
  Icon,
} from "semantic-ui-react";

function Home() {
  return (
    <Segment inverted textAlign="center" vertical className="homepage">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src={process.env.PUBLIC_URL + "/assets/logo.png"}
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Re-vents
        </Header>
        <Button size="huge" inverted as={Link} to="/events">
          Get started
          <Icon name="right arrow" inverted />
        </Button>
      </Container>
    </Segment>
  );
}

export default Home;
