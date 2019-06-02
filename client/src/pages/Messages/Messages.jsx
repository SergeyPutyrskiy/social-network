// @flow
import React, { Fragment, Component } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Button, Label } from "semantic-ui-react";
import { compose } from "recompose";

import withUserProfile from "../../hocs/withUserProfile";
import withLoader from "../../hocs/withLoader";
import { socket, subscribeToSocket } from "../../api/socket";

type Profile = {
  data: {
    id: number,
    userName: string
  }
};

type Message = {
  message: string,
  userName: string
};

type Props = { profile: Profile };

type State = {
  value: string,
  messages: Array<Message> | []
};

class Messages extends Component<Props, State> {
  state = {
    messages: [],
    value: ""
  };

  componentDidMount() {
    subscribeToSocket(({ data }) => this.saveMessage(data));
  }

  saveMessage = (data: string) => {
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

    return (
      <Fragment>
        Messages Page
        <Menu vertical>
          <Menu.Item link>
            <NavLink to="/profile">Profile</NavLink>
          </Menu.Item>
        </Menu>
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
      </Fragment>
    );
  }
}

export default compose(
  withUserProfile,
  withLoader(props => props.profile.inProgress)
)(Messages);
