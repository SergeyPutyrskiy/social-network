// @flow
import React from "react";
import { Image, List } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

import defaultAvatar1 from "../../images/default_avatar_1.png";

type Friends = {
  firstName: string,
  lastName: string,
  image: string
};

type Props = {
  friends: Friends[],
  history: Object
};

const FriendsList = ({ friends, history, navigationPath }: Props) =>
  friends && (
    <List selection size="medium" verticalAlign="middle">
      {friends.map(friend => (
        <List.Item
          onClick={() => history.push(`/${navigationPath}/${friend.id}`)}
        >
          <List.Content floated="left">
            <Image avatar src={friend.image || defaultAvatar1} />
            {`${friend.firstName} ${friend.lastName}`}
          </List.Content>
        </List.Item>
      ))}
    </List>
  );

export default withRouter(FriendsList);
