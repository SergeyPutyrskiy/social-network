// @flow
import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

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
  <form className="root" noValidate autoComplete="off">
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      className="full-page-wrapper"
    >
      <TextField
        id="userName"
        label="UserName"
        type="text"
        name="userName"
        autoComplete="userName"
        margin="normal"
        variant="outlined"
        value={userName}
        onChange={handleInputChange}
      />
      <TextField
        id="firstName"
        label="FirstName"
        type="text"
        name="firstName"
        autoComplete="firstName"
        margin="normal"
        variant="outlined"
        value={firstName}
        onChange={handleInputChange}
      />
      <TextField
        id="lastName"
        label="LastName"
        type="text"
        name="lastName"
        autoComplete="lastName"
        margin="normal"
        variant="outlined"
        value={lastName}
        onChange={handleInputChange}
      />
      <TextField
        id="email"
        label="Email"
        type="email"
        name="email"
        autoComplete="email"
        margin="normal"
        variant="outlined"
        value={email}
        onChange={handleInputChange}
      />
      <TextField
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={handleInputChange}
        label="Password"
        autoComplete="current-password"
        margin="normal"
        variant="outlined"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Sign Up
      </Button>
    </Grid>
  </form>
);

export default SignUpForm;
