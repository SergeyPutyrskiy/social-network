import React from "react";

const SignInForm = ({ formData, submitForm, handleInputChange }: Props) => (
  <div>
    <label htmlFor="email">
      Email:
      <input
        type="email"
        name="email"
        id="email"
        value={formData.email}
        onChange={handleInputChange}
      />
    </label>
    <label htmlFor="password">
      Password:
      <input
        type="password"
        name="password"
        id="password"
        value={formData.password}
        onChange={handleInputChange}
      />
    </label>
    <button type="button" onClick={submitForm}>
      Sign Up
    </button>
  </div>
);

export default SignInForm;
