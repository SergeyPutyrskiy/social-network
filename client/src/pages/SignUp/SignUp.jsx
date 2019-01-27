// @flow
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import SignUpForm from "./SignUpForm";
import { signUpStart } from "../../middleware/signup/actions";

type Props = {
  signUpStart: Function
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

  handleSubmit = () => {
    const { signUpStart } = this.props;
    signUpStart(this.state);
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

const mapDispatchToProps = dispatch =>
  bindActionCreators({ signUpStart }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(SignUp);
