// @flow
import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { connect } from "react-redux";

import UserInfo from "./UserInfo";
import LogOut from "../../components/LogOut";

type Props = {
  profile: Object
};

const MyProfile = ({ profile }: Props) => (
  <Fragment>
    <LogOut />
    <UserInfo profile={profile.data} />
    <Menu vertical>
      <Menu.Item link>
        <NavLink to="/messages">Messages</NavLink>
      </Menu.Item>
    </Menu>
  </Fragment>
);

const mapStateToProps = state => ({
  userId: state.user.data.user.id
});

export default connect(mapStateToProps)(MyProfile);
