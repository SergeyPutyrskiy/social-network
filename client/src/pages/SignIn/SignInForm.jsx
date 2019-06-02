// @flow
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "semantic-ui-react";

import "./SignIn.css";

type Props = {
  formData: {
    email: string,
    password: string
  },
  handleSubmit: Function,
  handleInputChange: Function
};

const SignInForm = ({
  formData: { email, password },
  handleSubmit,
  handleInputChange
}: Props) => (
  <Fragment>
    <Input
      id="email"
      label="Email"
      type="email"
      name="email"
      value={email}
      onChange={handleInputChange}
    />
    <Input
      type="password"
      name="password"
      id="password"
      value={password}
      onChange={handleInputChange}
      label="Password"
    />
    <Button variant="contained" color="primary" onClick={handleSubmit}>
      Sign In
    </Button>
    Or
    <Link to="/signup">Sign Up</Link>
  </Fragment>
);

export default SignInForm;
