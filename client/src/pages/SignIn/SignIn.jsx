// @flow
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import SignInForm from "./SignInForm";
import userApi from "../../api/user";
import { signInCompleted } from "../../store/signin/actions";
import { BEARER } from "../../constants/common";

type Props = {
  signInCompleted: Function,
  history: Object
};

type State = {
  email: string,
  password: string
};

class SignIn extends React.Component<Props, State> {
  state = {
    email: "serg@mail.com",
    password: "1234"
  };

  handleSubmit = async () => {
    const { history, signInCompleted } = this.props;
    const response = await userApi.signIn(this.state);
    const dataWithBearer = {
      ...response.data,
      accessToken: `${BEARER} ${response.data.accessToken}`
    };

    history.push(`/profile/${response.data.user.id}`);

    signInCompleted(dataWithBearer);
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
  bindActionCreators({ signInCompleted }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
