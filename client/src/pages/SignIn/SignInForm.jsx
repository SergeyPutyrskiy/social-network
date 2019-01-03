// @flow
import React from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

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
  <form className="root" noValidate autoComplete="off">
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      className="full-page-wrapper"
    >
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
        Sign In
      </Button>
      Or
      <Divider variant="middle" />
      <Link to="/signup">Sign Up</Link>
    </Grid>
  </form>
);

export default SignInForm;
