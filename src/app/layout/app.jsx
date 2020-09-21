import React from "react";
import { Container } from "semantic-ui-react";
import { Route, Switch } from "react-router-dom";
import EventDashboard from "../../features/event/event-dashboard";
import NavBar from "../../features/nav/nav-bar";
import EventDetail from "../../features/event/event-detail";
import PeopleDashboard from "../../features/user/people-dashboard";
import UserDetail from "../../features/user/user-detail";
import SettingDashboard from "../../features/user/settings/setting-dashboard";
import EventForm from "../../features/event/event-form";
import Home from "../../features/home";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
      <Route
        path="/(.+)"
        render={() => (
          <div>
            <NavBar />
            <Container style={{ marginTop: "5rem" }}>
              <Switch>
                <Route path="/events" component={EventDashboard} />
                <Route path="/events/:id" component={EventDetail} />
                <Route path="/people" component={PeopleDashboard} />
                <Route path="/profile/:id" component={UserDetail} />
                <Route path="/settings" component={SettingDashboard} />
                <Route path="/create-event" component={EventForm} />
              </Switch>
            </Container>
          </div>
        )}
      />
    </div>
  );
}

export default App;
