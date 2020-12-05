import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { sharedHistory, MicroappLoader, routes } from "./core";
import { AppFrame } from "./pods/app-frame";
import { Dashboard } from "./pods/dashboard";

export const AppRouter: React.FC = () => {
  return (
    <Router history={sharedHistory}>
      <AppFrame>
        <Switch>
          <Route exact path={routes.home}>
            <Dashboard />
          </Route>
          <Route path={routes.clock}>
            <MicroappLoader microapp="clock" />
          </Route>
          <Route path={routes.quote}>
            <MicroappLoader microapp="quote" />
          </Route>
        </Switch>
      </AppFrame>
    </Router>
  );
};
