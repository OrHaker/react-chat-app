import React, { Component } from "react";

export default class CreateMessage extends Component {
  constructor(props) {
    super(props);
    this.state = { content: "" };
  }
  contentChanged = (e) => {
    this.setState({
      content: e.target.value,
    });
  };
  addMessageHandler = (e) => {
    e.preventDefault();
    this.props.addMessage(this.state);
    this.setState({ content: "" });
  };
  render() {
    return (
      <div className="create-message">
        <input
          type="text"
          value={this.state.content}
          placeholder="Enter message..."
          onChange={this.contentChanged}
        />
        <input
          type="submit"
          className="submit-btn"
          onClick={this.addMessageHandler}
          value="Send"
        />
      </div>
    );
  }
}
