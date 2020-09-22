import React from "react";
import { Link } from "react-router-dom";
import { Menu, Image, Dropdown } from "semantic-ui-react";

function SignInMenu() {
  return (
    <Menu.Item position="right">
      <Image
        avatar
        spaced="right"
        src={process.env.PUBLIC_URL + "/assets/user.png"}
        alt=""
      />
      <Dropdown pointing="top left" text="Username">
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to="/create-event"
            text="Create Event"
            icon="plus"
          />
          <Dropdown.Item text="My Events" icon="calendar" />
          <Dropdown.Item text="My Network" icon="users" />
          <Dropdown.Item text="My Profile" icon="user" />
          <Dropdown.Item
            as={Link}
            to="/settings"
            text="Settings"
            icon="settings"
          />
          <Dropdown.Item text="Sign Out" icon="power" />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
}

export default SignInMenu;
