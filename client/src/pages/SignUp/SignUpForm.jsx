// @flow
import React, { Fragment } from "react";
import { Button, Input } from "semantic-ui-react";

import "./SignUp.css";

type Props = {
  formData: {
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string
  },
  handleSubmit: Function,
  handleInputChange: Function
};

const SignUpForm = ({
  formData: { userName, firstName, lastName, email, password },
  handleInputChange,
  handleSubmit
}: Props) => (
  <Fragment>
    <Input
      id="userName"
      label="UserName"
      type="text"
      name="userName"
      value={userName}
      onChange={handleInputChange}
    />
    <Input
      id="firstName"
      label="FirstName"
      type="text"
      name="firstName"
      value={firstName}
      onChange={handleInputChange}
    />
    <Input
      id="lastName"
      label="LastName"
      type="text"
      name="lastName"
      value={lastName}
      onChange={handleInputChange}
    />
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
      Sign Up
    </Button>
  </Fragment>
);

export default SignUpForm;
