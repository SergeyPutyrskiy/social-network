// @flow
import React, { Fragment, Component } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Button } from "semantic-ui-react";
import { socket, subscribeToSocket } from "../../api/socket";

type Props = {};

type State = {
  value: string,
  messages: Array<string>
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

    socket.emit("chat", value);
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
          {messages.map(message => (
            <p>{message}</p>
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

export default Messages;
