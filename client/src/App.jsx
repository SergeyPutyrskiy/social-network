// @flow
import React from "react";
import { Route, Switch, Redirect, Router } from "react-router-dom";
import { connect } from "react-redux";
import history from "./services/history";

import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
// import MyProfile from "./pages/Profile/MyProfile";
import Profile from "./pages/Profile/Profile";
import Messages from "./pages/Messages/Messages";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import "./App.css";

type Props = {
  isAuthenticated: boolean,
  user: Object
};

const App = ({ isAuthenticated, user }: Props) => (
  <div className="App">
    <Router history={history}>
      <Switch>
        <Redirect
          exact
          path="/"
          to={user.data ? `/profile/${user.data.user.id}` : "/profile"}
        />
        {/* <PrivateRoute
          exact
          path="/profile"
          component={MyProfile}
          isAuthenticated={isAuthenticated}
        /> */}
        <PrivateRoute
          path="/profile/:id"
          component={Profile}
          isAuthenticated={isAuthenticated}
        />
        <PrivateRoute
          path="/messages"
          component={Messages}
          isAuthenticated={isAuthenticated}
        />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </Router>
  </div>
);

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  user: state.user
});

export default connect(mapStateToProps)(App);
