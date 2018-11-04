// @flow
import React from "react";
import SignInForm from "./SignInForm";

class SignIn extends React.PureComponent {
  state = {
    email: "serg@mail.com",
    password: "1234"
  };

  handleSubmit = () => {
    console.log(this.state);
  };

  handleInputChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <React.Fragment>
        <SignInForm
          formData={this.state}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit}
        />
      </React.Fragment>
    );
  }
}

export default SignIn;
