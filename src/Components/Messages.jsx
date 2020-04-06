import React, { Component } from "react";

export default class Messages extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="messages">
        {this.props.messages.map((message, index) => {
          return (
            <div
              className={`message ${
                this.props.userName === message.user ? "message--me" : ""
              }`}
              key={index}
            >
              <div className="message-user">{message.user}</div>
              <div className="message-content">{message.content}</div>
            </div>
          );
        })}
      </div>
    );
  }
}
