import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Login from "./pages/login";
import Admin from "./Admin";
import Home from "./pages/home";
import NoMatch from "./pages/no_match";
import Buttons from "./pages/ui/buttons";
import Modals from "./pages/ui/modals";
export default class router extends Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Route path="/login" component={Login} />
          <Route
            path="/admin"
            render={() => (
              <Admin>
                <Switch>
                  <Route path="/admin/home" component={Home} />
                  <Route path="/admin/ui/buttons" component={Buttons} />
                  <Route path="/admin/ui/modals" component={Modals} />
                  <Route path="*" component={NoMatch} />
                </Switch>
              </Admin>
            )}
          />
        </App>
      </HashRouter>
    );
  }
}
