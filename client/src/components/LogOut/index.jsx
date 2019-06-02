// @flow
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { compose } from "recompose";

import { logOut } from "../../store/signin/actions";

type Props = {
  logOut: Function,
  history: Object
};

class LogOut extends Component<Props, {}> {
  handleLogOut = () => {
    const { logOut, history } = this.props;

    history.push("/signin");
    logOut();
  };

  render() {
    return (
      <Button variant="contained" color="primary" onClick={this.handleLogOut}>
        Log out
      </Button>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ logOut }, dispatch);

export default compose(
  withRouter,
  connect(
    null,
    mapDispatchToProps
  )
)(LogOut);
