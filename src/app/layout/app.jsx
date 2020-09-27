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
import ModalManager from "../../features/modal/modal-manager";
import AuthIsLoaded from "../utils/auth-loaded";
import { userIsAuthenticated } from "../../features/auth/auth-wrapper";
import NotFound from "./not-found";

function App() {
  return (
    <AuthIsLoaded>
      <div>
        <ModalManager />
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
                  <Route path="/events" exact component={EventDashboard} />
                  <Route path="/events/:id" component={EventDetail} />
                  <Route
                    path="/manage/:id"
                    component={userIsAuthenticated(EventForm)}
                  />
                  <Route
                    path="/people"
                    component={userIsAuthenticated(PeopleDashboard)}
                  />
                  <Route
                    path="/profile/:id"
                    component={userIsAuthenticated(UserDetail)}
                  />
                  <Route
                    path="/settings"
                    component={userIsAuthenticated(SettingDashboard)}
                  />
                  <Route
                    path="/create-event"
                    component={userIsAuthenticated(EventForm)}
                  />
                  <Route path="/error" component={NotFound} />
                </Switch>
              </Container>
            </div>
          )}
        />
      </div>
    </AuthIsLoaded>
  );
}

export default App;
