// @flow
import React from "react";
import SignUpForm from "./SignUpForm";

type Props = {};

type State = {
  userName: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string
};

class SignUp extends React.PureComponent<Props, State> {
  state = {
    userName: "serg",
    firstName: "Sergey",
    lastName: "Putyrskiy",
    email: "serg@mail.com",
    password: "1234"
  };

  handleInputChange = (e: Object) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = () => {
    console.log(this.state);
    // axios.post('http://localhost:3000/signup', this.state);
  };

  render() {
    return (
      <React.Fragment>
        <SignUpForm
          formData={this.state}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit}
        />
      </React.Fragment>
    );
  }
}

export default SignUp;
