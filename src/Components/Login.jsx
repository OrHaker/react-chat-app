import React from "react";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userName: "" };
  }
  //update user name
  userNameChanged = (e) => {
    this.setState({ userName: e.target.value });
  };

  setUserName = () => {
    this.props.setUserNameAndConnect(this.state.userName);
    this.setState({ userName: "" });
    this.props.history.push({
      pathname: "/chat/",
    });
  };

  render() {
    return (
      <div className="username">
        <h1>Login</h1>
        <h5>After login, you will automatically be taken to chat</h5>
        <input
          type="text"
          value={this.state.userName}
          placeholder="Enter username..."
          onChange={this.userNameChanged}
          style={{ margin: 10 }}
        />
        <input
          type="submit"
          className="submit-btn"
          onClick={this.setUserName}
          value="Login"
          style={{ margin: 10 }}
        />
      </div>
    );
  }
}
export default withRouter(Login);
