import React from "react";
import SignInForm from "../../components/SignInForm";

class SignIn extends React.PureComponent {
  state = {
    email: "serg@mail.com",
    password: "1234"
  };

  handleSubmit = () => {
    console.log(this.state);
  };

  render() {
    return (
      <React.Fragment>
        <SignInForm formData={this.state} />
      </React.Fragment>
    );
  }
}

export default SignIn;
