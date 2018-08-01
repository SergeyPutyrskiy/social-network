import React from 'react';

class Signup extends React.PureComponent {
  render() {
    return (
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
      </div>
    );
  }
}

export default Signup;
