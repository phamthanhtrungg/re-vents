import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";
import SignOutMenu from "../../menu/sign-out";
import SignInMenu from "../../menu/sign-in";
import { useSelector } from "react-redux";

function NavBar() {
  const { authenticated } = useSelector((state) => state.auth);
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
        {!authenticated ? <SignInMenu /> : <SignOutMenu />}
      </Container>
    </Menu>
  );
}

export default NavBar;
