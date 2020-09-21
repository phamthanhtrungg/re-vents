import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";

function NavBar() {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header as={Link} to="/">
          <img
            src={process.env.PUBLIC_URL + "/assets/logo.png"}
            alt="Logo"
            style={{ marginRight: "0.5rem" }}
          />
          Re-vents
        </Menu.Item>
        <Menu.Item as={NavLink} to="/events" name="Events" />
        <Menu.Item as={NavLink} to="/people" name="People" />
        <Menu.Item>
          <Button
            floated="right"
            as={Link}
            to="/create-event"
            positive
            inverted
            content="Create Event"
          />
        </Menu.Item>
        <Menu.Item position="right">
          <Button basic inverted content="Login" />
          <Button
            basic
            inverted
            content="SignOut"
            style={{ marginLeft: "1rem" }}
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
}

export default NavBar;
