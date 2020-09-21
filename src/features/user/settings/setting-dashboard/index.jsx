import React from "react";
import { Grid } from "semantic-ui-react";
import { Switch, Route, Redirect } from "react-router-dom";
import SettingNav from "../setting-nav";
import Basic from "../basic";
import About from "../about";
import Photo from "../photo";
import Account from "../account";

function SettingDashboard() {
  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch>
          <Redirect exact from="/settings" to="/settings/basic" />
          <Route path="/settings/basic" component={Basic} />
          <Route path="/settings/about" component={About} />
          <Route path="/settings/photo" component={Photo} />
          <Route path="/settings/account" component={Account} />
        </Switch>
      </Grid.Column>
      <Grid.Column width={4}>
        <SettingNav />
      </Grid.Column>
    </Grid>
  );
}

export default SettingDashboard;
