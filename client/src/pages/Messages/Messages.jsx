// @flow
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {
  Menu,
  Button,
  Grid,
  Header,
  List,
  Image,
  Segment,
  Divider
} from "semantic-ui-react";
import { compose } from "recompose";
import { connect } from "react-redux";
import moment from "moment";

import withSearch from "../../hocs/withSearch";
import { socket, subscribeToSocket } from "../../api/socket";

import defaultAvatar1 from "../../images/default_avatar_1.png";

import friendsApi from "../../api/friends";
import messagesApi from "../../api/messages";
import FriendsList from "../../components/Friends/Friends";

type Profile = {
  data: {
    id: number,
    userName: string
  }
};

type Message = {
  id: number,
  message: string,
  userName: string
};

type Props = {
  profile: Profile,
  userId: number,
  user: Object,
  match: Object
};

type State = {
  value: string,
  messages: ?Array<Message>,
  friends: Object[]
};

class Messages extends Component<Props, State> {
  state = {
    messages: [],
    value: "",
    friends: []
  };

  async componentDidMount() {
    const { userId, match } = this.props;
    const responseMessages = await messagesApi.getMessages(
      userId,
      match.params.userId
    );
    const responseFriends = await friendsApi.getFriends(userId);
    const { friends } = responseFriends.data;
    const { messages } = responseMessages.data;

    subscribeToSocket(({ data }) => this.saveMessage(data));

    socket.emit("registerUser", { userId });

    this.setState({
      friends,
      messages
    });
  }

  saveMessage = (data: Array<Message>) => {
    const { messages } = this.state;

    this.setState({
      messages: [...messages, data]
    });
  };

  handleSendMessage = () => {
    const { value } = this.state;
    const {
      user: { id, userName },
      match
    } = this.props;

    socket.emit(process.env.REACT_APP_CHAT_CHANNEL, {
      id,
      userName,
      message: value,
      receiverId: match.params.userId
    });

    this.clearValue();
  };

  clearValue = () =>
    this.setState({
      value: ""
    });

  render() {
    const { messages, value, friends } = this.state;
    const { userId } = this.props;
    const message = messages.length
      ? messages.find(message => message.user.id !== userId)
      : null;

    return (
      <Grid>
        <Grid.Column width={5}>
          <Menu vertical size="lage">
            <Menu.Item link>
              <NavLink to={`/profile/${userId}`}>Profile</NavLink>
            </Menu.Item>
          </Menu>

          <FriendsList
            friends={!!friends.length && friends}
            navigationPath="messages"
          />
        </Grid.Column>
        <Grid.Column width={7}>
          <Segment padded>
            <Header>
              {message ? (
                <div>
                  <Image
                    verticalAlign="middle"
                    avatar
                    src={message.user.image || defaultAvatar1}
                  />
                  {message.user.firstName}
                  &nbsp;
                  {message.user.lastName}
                </div>
              ) : null}
            </Header>
            <Divider />

            <List className="messages-list" relaxed="very">
              {messages.map(({ user, message, createdAt }, i) => (
                <React.Fragment>
                  {i === 0 && (
                    <Header size="tiny">
                      {moment(createdAt).format("DD/MM/YYYY")}
                    </Header>
                  )}
                  {i > 0 &&
                    moment(createdAt, "YYYY-MM-DD").isAfter(
                      messages[i - 1].createdAt,
                      "YYYY-MM-DD"
                    ) && (
                      <Header size="tiny">
                        {moment(createdAt).format("DD/MM/YYYY")}
                      </Header>
                    )}
                  <List.Item>
                    <Segment
                      compact
                      floated={user.id === userId ? "right" : "left"}
                      size="small"
                      inverted={user.id === userId}
                      color={user.id === userId ? "blue" : "white"}
                    >
                      <Header size="tiny" textAlign="left">
                        {message}
                      </Header>
                      <p className="date-message">
                        {moment(createdAt).format("LTS")}
                      </p>
                    </Segment>
                  </List.Item>
                </React.Fragment>
              ))}
            </List>
            <Divider />
            <input
              type="text"
              value={value}
              onChange={({ target: { value } }) => this.setState({ value })}
            />
            <Button onClick={this.handleSendMessage}>Send message</Button>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.user.data.user.id,
  user: state.user.data.user
});

export default compose(
  connect(mapStateToProps),
  withSearch(
    data =>
      data.map(item => ({
        id: item.id,
        title: `${item.firstName} ${item.lastName}`,
        description: item.userName
      })),
    "/users"
  )
)(Messages);
