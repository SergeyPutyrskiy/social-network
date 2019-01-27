// @flow
import React from "react";
import { Route, Switch, Redirect, Router } from "react-router-dom";
import { connect } from "react-redux";
import history from "./services/history";

import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Profile from "./pages/Profile/Profile";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import "./App.css";

type Props = {
  isAuthenticated: boolean
};

const App = ({ isAuthenticated }: Props) => (
  <div className="App">
    <Router history={history}>
      <Switch>
        <Redirect exact path="/" to="/profile" />
        <PrivateRoute
          path="/profile"
          component={Profile}
          isAuthenticated={isAuthenticated}
        />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </Router>
  </div>
);

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps)(App);
