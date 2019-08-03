// @flow
import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

import UserInfo from "./UserInfo";
import LogOut from "../../components/LogOut";
import withUserProfile from "../../hocs/withUserProfile";

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

export default withUserProfile(MyProfile);
