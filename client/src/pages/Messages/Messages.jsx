// @flow
import React, { Fragment, Component } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Button } from "semantic-ui-react";
import { socket, subscribeToSocket } from "../../api/socket";

type Props = {};

class Messages extends Component<Props, {}> {
  state = {
    messages: [],
    value: ""
  };

  componentDidMount() {
    const { messages } = this.state;

    subscribeToSocket(data => {
      this.setState({
        messages: [...messages, data.data]
      });
    });
  }

  handleSendMessage = () => {
    const { value } = this.state;
    socket.emit("chat", value);
  };

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
