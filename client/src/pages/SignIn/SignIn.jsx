// @flow
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import SignInForm from "./SignInForm";
import { signInStart } from "../../middleware/signin/actions";

type Props = {
  signInStart: Function
};

type State = {
  email: string,
  password: string
};

class SignIn extends React.PureComponent<Props, State> {
  state = {
    email: "serg@mail.com",
    password: "1234"
  };

  handleSubmit = () => {
    const { signInStart } = this.props;
    signInStart(this.state);
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

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ signInStart }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
