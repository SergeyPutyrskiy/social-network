// @flow
import React from "react";

import SignUpForm from "./SignUpForm";
import userApi from "../../api/user";

type Props = {
  history: Object
};

type State = {
  userName: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string
};

class SignUp extends React.Component<Props, State> {
  state = {
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  };

  handleInputChange = (e: Object) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = async () => {
    const { history } = this.props;

    await userApi.signUp(this.state);
    history.push("/signin");
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
