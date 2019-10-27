// @flow
import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect, Router } from "react-router-dom";
import { connect } from "react-redux";
import history from "./services/history";

import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Profile from "./pages/Profile/Profile";
import Friends from "./pages/Friends/Friends";
import Messages from "./pages/Messages/Messages";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import friendsApi from "./api/friends";

import "./App.css";

type Props = {
  isAuthenticated: boolean,
  user: Object
};

const App = ({ isAuthenticated, user }: Props) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user.data) {
        const response = await friendsApi.getFriends(user.data.user.id);

        setFriends(response.data.friends);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Redirect
            exact
            path="/"
            to={user.data ? `/profile/${user.data.user.id}` : "/signin"}
          />
          <PrivateRoute
            path="/profile/:id"
            component={Profile}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            path="/friends"
            component={Friends}
            isAuthenticated={isAuthenticated}
          />
          <Redirect
            exact
            path="/messages"
            to={friends.length ? `/messages/${friends[0].id}` : "/messages"}
          />
          <PrivateRoute
            path="/messages/:userId"
            component={Messages}
            isAuthenticated={isAuthenticated}
          />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </Router>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  user: state.user
});

export default connect(mapStateToProps)(App);
