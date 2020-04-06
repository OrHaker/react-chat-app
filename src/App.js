import React from "react";
import CreateMessage from "./Components/CreateMessage";
import Messages from "./Components/Messages";
import Login from "./Components/Login";
import { Switch, Route, withRouter } from "react-router-dom";

import socketIOClient from "socket.io-client";

var socket = null;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      messages: [],
    };
  }

  //יצירת שם משתמש
  setUserNameAndConnect = (userName) => {
    //איתחול הסוקט
    if (socket === null) {
      socket = socketIOClient("http://localhost:4001/", {
        query: `user=${userName}`,
      });
    }

    this.setState({
      userName,
    });

    //יצירת הודעה
    socket.on("CREATE_MESSAGE", (message) => {
      this.setState({
        messages: [...this.state.messages, message],
      });
    });

    //יצירת שם משתמש
    socket.on("SET_USERNAME", (userName) => {
      this.setState({
        userName,
      });
    });
  };

  //הוספת תגובה
  addMessage = (message) => {
    //check if user logged in to the chat and created socket
    if (socket) {
      message.user = this.state.userName;
      socket.emit("SEND_MESSAGE", message);
    } else
      this.props.history.push({
        pathname: "/",
      });
  };
  render() {
    return (
      <div className="chat">
        <Switch>
          <Route exact path="/">
            <Login setUserNameAndConnect={this.setUserNameAndConnect} />
          </Route>
          <Route exact path="/chat">
            <Messages
              messages={this.state.messages}
              userName={this.state.userName}
            />
            <CreateMessage addMessage={this.addMessage} />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
