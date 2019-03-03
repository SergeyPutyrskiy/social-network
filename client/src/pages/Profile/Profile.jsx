// @flow
import React, { Fragment, Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Menu, Button } from "semantic-ui-react";

import { getProfileStart } from "../../middleware/profile/actions";
import { logOut } from "../../store/signin/actions";
import UserInfo from "./UserInfo";

type Props = {
  logOut: Function,
  getProfileStart: Function,
  history: Object,
  profile: Object
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
    const { profile } = this.props;

    return (
      <Fragment>
        <Button variant="contained" color="primary" onClick={this.handleLogOut}>
          Log out
        </Button>
        <UserInfo profile={profile} />
        <Menu vertical>
          <Menu.Item link>
            <NavLink to="/messages">Messages</NavLink>
          </Menu.Item>
        </Menu>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ logOut, getProfileStart }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
