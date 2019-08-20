// @flow
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Button, Label, Grid, Search } from "semantic-ui-react";
import { compose } from "recompose";
import debounce from "lodash/debounce";
import { connect } from "react-redux";

import withSearch from "../../hocs/withSearch";
import { socket, subscribeToSocket } from "../../api/socket";

import friendsApi from "../../api/friends";
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
  friendsRequest: any,
  searchLoading: boolean,
  handleResultSelect: Function,
  handleSearchChange: Function,
  searchResults: Function,
  searchValue: Object,
  userId: number
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
    const { userId } = this.props;
    const res = await friendsApi.getFriends(userId);

    subscribeToSocket(({ data }) => this.saveMessage(data));

    this.setState({
      friends: res.data.friends
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
      profile: {
        data: { id, userName }
      }
    } = this.props;

    socket.emit(process.env.REACT_APP_CHAT_CHANNEL, {
      id,
      userName,
      message: value
    });

    this.clearValue();
  };

  clearValue = () =>
    this.setState({
      value: ""
    });

  render() {
    const { messages, value, friends } = this.state;
    const {
      searchLoading,
      handleResultSelect,
      handleSearchChange,
      searchResults,
      searchValue,
      userId
    } = this.props;

    return (
      <Grid>
        <Grid.Column width={5}>
          <Menu vertical size="lage">
            <Menu.Item link>
              <NavLink to={`/profile/${userId}`}>Profile</NavLink>
            </Menu.Item>
          </Menu>

          <Search
            loading={searchLoading}
            onResultSelect={handleResultSelect}
            onSearchChange={debounce(handleSearchChange, 500, {
              leading: true
            })}
            results={searchResults}
            value={searchValue && searchValue.title}
            {...this.props}
          />

          <FriendsList friends={friends.length && friends} />
        </Grid.Column>
        <Grid.Column width={11}>
          <p>
            {messages.map(({ userName, message }) => (
              <div>
                <Label as="a" basic>
                  {userName}
                </Label>
                {` ${message}`}
              </div>
            ))}
          </p>
          <input
            type="text"
            value={value}
            onChange={({ target: { value } }) => this.setState({ value })}
          />
          <Button onClick={this.handleSendMessage}>Send message</Button>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.user.data.user.id
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
