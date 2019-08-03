// @flow
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Button, Label, Grid, Search } from "semantic-ui-react";
import { compose } from "recompose";
import debounce from "lodash/debounce";

import withUserProfile from "../../hocs/withUserProfile";
import withLoader from "../../hocs/withLoader";
import withSearch from "../../hocs/withSearch";
import { socket, subscribeToSocket } from "../../api/socket";

import withAxios from "../../hocs/withAxios";
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
  searchValue: Object
};

type State = {
  value: string,
  messages: ?Array<Message>
};

class Messages extends Component<Props, State> {
  state = {
    messages: [],
    value: ""
  };

  componentDidMount() {
    subscribeToSocket(({ data }) => this.saveMessage(data));
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
    const { messages, value } = this.state;
    const {
      friendsRequest,
      searchLoading,
      handleResultSelect,
      handleSearchChange,
      searchResults,
      searchValue
    } = this.props;

    return (
      <Grid>
        <Grid.Column width={5}>
          <Menu vertical size="lage">
            <Menu.Item link>
              <NavLink to="/profile">Profile</NavLink>
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

          <FriendsList
            friends={friendsRequest.data && friendsRequest.data.friends}
          />
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

export default compose(
  withUserProfile,
  withAxios(props => ({
    friendsRequest: props.profile.data
      ? { url: "/friends", params: { userId: props.profile.data.id } }
      : {}
  })),
  withLoader(props => props.profile.inProgress),
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
