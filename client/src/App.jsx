import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import history from "./services/history";

import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Profile from "./pages/Profile/Profile";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import "./App.css";

const App = () => (
  <div className="App">
    <Router history={history}>
      <Switch>
        <Redirect exact path="/" to="/profile" />
        <PrivateRoute path="/profile" component={Profile} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </Router>
  </div>
);

export default App;
