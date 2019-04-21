import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Login from "./pages/login";
import Admin from "./Admin";
import Home from "./pages/home";
import NoMatch from "./pages/no_match";
import Buttons from "./pages/ui/buttons";
import Modals from "./pages/ui/modals";
import Loading from "./pages/ui/loading";
import Notice from "./pages/ui/notice";
import Messages from "./pages/ui/messages";
import Tabs from "./pages/ui/tabs";
import Gallery from "./pages/ui/gallery";
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
                  <Route path="/admin/ui/loading" component={Loading} />
                  <Route path="/admin/ui/notice" component={Notice} />
                  <Route path="/admin/ui/messages" component={Messages} />
                  <Route path="/admin/ui/tabs" component={Tabs} />
                  <Route path="/admin/ui/gallery" component={Gallery} />
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
