// @flow
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button, Menu } from "semantic-ui-react";

import UserInfo from "./UserInfo";
import LogOut from "../../components/LogOut";
import userApi from "../../api/user";
import friendsApi from "../../api/friends";

type Props = {
  accessToken: string,
  match: Object,
  userId: number
};

const Profile = (props: Props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await userApi.getUser(
        props.accessToken,
        props.match.params.id
      );

      setUser(response.data.user);
    };

    fetchData();
  }, []);

  const addFriend = () => {
    friendsApi.addFriend(props.userId, Number(props.match.params.id));
  };

  return (
    <Fragment>
      <LogOut />
      {user && (
        <Fragment>
          <UserInfo profile={user} />
          <Menu vertical>
            <Menu.Item link>
              <NavLink to="/friends">Friends</NavLink>
            </Menu.Item>
            <Menu.Item link>
              <NavLink to="/messages">Messages</NavLink>
            </Menu.Item>
          </Menu>
          <Button
            content="Add"
            icon="add user"
            labelPosition="rigth"
            onClick={addFriend}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  accessToken: state.user.data.accessToken,
  userId: state.user.data.user.id
});

export default connect(mapStateToProps)(Profile);
