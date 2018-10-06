import React from 'react';
import axios from 'axios';
import SignUpForm from '../../components/SignUpForm';

class SignUp extends React.PureComponent {
  state = {
    userName: 'serg',
    firstName: 'Sergey',
    lastName: 'Putyrskiy',
    email: 'serg@mail.com',
    password: '1234',
  };

  handleSubmit = () => {
    console.log(this.state);
    // axios.post('http://localhost:3000/signup', this.state);
  }

  render() {
    return (
      <React.Fragment>
        <SignUpForm formData={this.state} />
      </React.Fragment>
    );
  }
}

export default SignUp;
