import React from 'react';
import axios from 'axios';

class Signup extends React.PureComponent {
  state = {
    userName: 'serg',
    firstName: 'Sergey',
    lastName: 'Putyrskiy',
    email: 'serg@mail.com',
    password: '1234',
  };

  handleSubmit = () => {
    console.log(this.state);
    axios.post('http://localhost:3000/signup', this.state);
  }

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
        <button onClick={this.handleSubmit}>Sign Up</button>
      </div>
    );
  }
}

export default Signup;
