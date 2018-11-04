// @flow
import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

type Props = {
  formData: {
    email: number,
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
    <Grid container direction="row" justify="center" alignItems="center">
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
    </Grid>
  </form>
);

export default SignInForm;
