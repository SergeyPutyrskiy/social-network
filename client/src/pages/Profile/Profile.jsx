// @flow
import React, { Fragment, Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";

import { getProfileStart } from "../../middleware/profile/actions";
import { logOut } from "../../store/signin/actions";

type Props = {
  logOut: Function,
  getProfileStart: Function,
  history: Object
};

class Profile extends Component<Props, {}> {
  componentDidMount() {
    const { getProfileStart } = this.props;
    getProfileStart();
  }

  handleLogOut = () => {
    const { logOut, history } = this.props;

    history.push("/signin");
    logOut();
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
  bindActionCreators({ logOut, getProfileStart }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Profile);
