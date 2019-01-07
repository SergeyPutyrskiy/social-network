// @flow
import React, { Fragment, PureComponent } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";

import { logOutStart } from "../../middleware/logOut/actions";

type Props = {
  logOutStart: Function
};

class Profile extends PureComponent<Props, {}> {
  handleSubmit = () => {
    const { logOutStart } = this.props;
    logOutStart();
  };

  render() {
    return (
      <Fragment>
        <Button variant="contained" color="primary" onClick={this.handleSubmit}>
          Log out
        </Button>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ logOutStart }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Profile);
