import React from "react";

const SignInForm = ({ email, password }) => (
  <div>
    <label htmlFor="email">Email:</label>
    <input type="email" name="" id="email" />
    <label htmlFor="password">Password:</label>
    <input type="password" name="" id="password" />
    <button onClick={() => this.props.submitForm}>Sign Up</button>
  </div>
);

export default SignInForm;
