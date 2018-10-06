import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const App = () => (
  <div className="App">
    <Header />

    <Router>
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/signiup" component={SignUp} />
      </Switch>
    </Router>
  </div>
);

export default App;
