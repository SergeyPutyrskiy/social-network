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
  Divider,
  Input
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

    socket.emit("subscribeUser", { userId });

    this.setState({
      friends,
      messages
    });
  }

  async componentDidUpdate(prevProps) {
    const { userId, match } = this.props;

    if (prevProps.match.params.userId !== match.params.userId) {
      const responseMessages = await messagesApi.getMessages(
        userId,
        match.params.userId
      );
      const { messages } = responseMessages.data;

      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        messages
      });
    }
  }

  componentWillUnmount() {
    const { userId } = this.props;

    socket.emit("unsubscribeUser", { userId });
  }

  get friend() {
    const { match } = this.props;
    const { friends } = this.state;
    const { userId } = match.params;

    return friends.find(({ id }) => id === +userId);
  }

  clearValue = () =>
    this.setState({
      value: ""
    });

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

    if (value.trim()) {
      socket.emit(process.env.REACT_APP_CHAT_CHANNEL, {
        userName,
        message: value,
        receiver: {
          id: +match.params.userId
        },
        sender: {
          id
        }
      });

      this.saveMessage({
        userName,
        message: value,
        receiver: {
          id: +match.params.userId
        },
        sender: {
          id
        }
      });

      this.clearValue();
    }
  };

  render() {
    const { messages, value, friends } = this.state;
    const { userId } = this.props;

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
              {this.friend ? (
                <div>
                  <Image
                    verticalAlign="middle"
                    avatar
                    src={this.friend.image || defaultAvatar1}
                  />
                  {this.friend.firstName}
                  &nbsp;
                  {this.friend.lastName}
                </div>
              ) : null}
            </Header>
            <Divider />

            <List className="messages-list" relaxed="very">
              {messages.map(({ sender, message, createdAt }, i) => (
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
                      floated={sender.id === userId ? "right" : "left"}
                      size="small"
                      inverted={sender.id === userId}
                      color={sender.id === userId ? "blue" : "white"}
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
            <Input
              size="large"
              value={value}
              onChange={({ target: { value } }) => this.setState({ value })}
            />
            <Button
              size="large"
              disabled={!value.trim()}
              onClick={this.handleSendMessage}
            >
              Send message
            </Button>
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
