import React from 'react';

const SignUpForm = ({ userName, firstName, lastName, email, password }) => (
    <div>
      <label htmlFor="userName">
        User name:
      </label>
      <input type="text" name="" id="userName" />
      <label htmlFor="firstName">
        First name:
      </label>
      <input type="text" name="" id="firstName" />
      <label htmlFor="lastName">
        Last name:
      </label>
      <input type="text" name="" id="lastName" />
      <label htmlFor="email">
        Email:
      </label>
      <input type="email" name="" id="email" />
      <label htmlFor="password">
        Password:
      </label>
      <input type="password" name="" id="password" />
      <button onClick={() => this.props.submitForm}>Sign Up</button>
    </div>
  );

export default SignUpForm;
