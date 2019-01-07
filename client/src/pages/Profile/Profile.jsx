// @flow
import React, { Fragment, PureComponent } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";

import { getUserStart } from "../../middleware/user/actions";
import { logOutStart } from "../../middleware/logOut/actions";

type Props = {
  logOutStart: Function,
  getUserStart: Function
};

class Profile extends PureComponent<Props, {}> {
  componentDidMount() {
    const { getUserStart } = this.props;
    getUserStart();
  }

  handleLogOut = () => {
    const { logOutStart } = this.props;
    logOutStart();
  };

  render() {
    return (
      <Fragment>
        <Button variant="contained" color="primary" onClick={this.handleLogOut}>
          Log out
        </Button>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ logOutStart, getUserStart }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Profile);
