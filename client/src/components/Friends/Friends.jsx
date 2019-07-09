// @flow
import React from "react";
import { Image, List, Button } from "semantic-ui-react";

import defaultAvatar1 from "../../images/default_avatar_1.png";

type Friends = {
  firstName: string,
  lastName: string,
  image: string
};

type Props = {
  friends: Friends[]
};

const FriendsList = ({ friends, ...rest }: Props) =>
  friends && (
    <List selection size="medium" verticalAlign="middle" {...rest}>
      {friends.map(friend => (
        <List.Item>
          <List.Content floated="right">
            <Button>Add</Button>
          </List.Content>

          <List.Content floated="left">
            <Image avatar src={friend.image || defaultAvatar1} />
            {`${friend.firstName} ${friend.lastName}`}
          </List.Content>
        </List.Item>
      ))}
    </List>
  );

export default FriendsList;
